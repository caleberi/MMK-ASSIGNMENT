import { NextFunction ,Request,Response} from "express";
import {isNil} from "lodash";
import { MethodNotSupportedError, UnauthorizedError} from "@shared/errors";
import {Account} from "@entity/account.entity";
import { StatusCodes } from "http-status-codes";
import ms from "ms";

import RateLimiter from 'async-ratelimiter';
import { getClientIp } from 'request-ip';
import Redis from 'ioredis';
import dataSource from "@db/index";
import  logger from "jet-logger";
import { CreateFailResponse } from "./utils";
import { Buffer  } from "buffer";

const rateLimiter = new RateLimiter({
    db: new Redis(process.env.REDIS_URL),
    max:50,
    duration:ms("24 hrs"),
})


const middlewares = {
    restrictNonPostRequest:function (req:Request,res:Response,next:NextFunction){
        if(["POST","post"].includes(req.method)) return next();
        return next(new MethodNotSupportedError());
    },
    authorize: async function(req:Request,res:Response,next:NextFunction){
            const authPayload: string | undefined = req.headers.authorization ;
            if(!isNil(authPayload)) {
                // eslint-disable-next-line max-len
                const originalAuthCredentials:string =  Buffer.from(authPayload.split(" ")[1],"base64").toString("utf8");
                // eslint-disable-next-line max-len
                const parsedAuthPayload:string[]=originalAuthCredentials.split(":");
                const [username, authId] =  parsedAuthPayload;
                // account does  exist in the database [AUTHENTICATED] ?
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                logger.info(`[username, authId] = ${parsedAuthPayload}`)
                const account : Account|null = await dataSource.getRepository(Account)
                    // eslint-disable-next-line max-len
                                                        .findOneBy({username:username,auth_id:authId});
                logger.info(`Found Account:{${JSON.stringify(account)}}...`);
                if(!isNil(account)){
                    // ts-ignore
                    res.locals.account = account;
                    return next();
                }
                throw new UnauthorizedError();
            }else {
                // account does not exist in the database [NOT AUTHENTICATED]
                throw new UnauthorizedError();
            }
    },
    limitRequestBasedOnFromParam:   async function(req:Request,res:Response,next:NextFunction) {
            const {from} = req.params;
            const clientIp = getClientIp(req);
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const limit = await rateLimiter.get({ id: `${clientIp}-${from}`});
            
            if (!res.headersSent) {
                res.set('X-RateLimit-Limit', `${limit.total}`);
                res.set('X-RateLimit-Remaining', `${limit.remaining - 1}`);
                res.set('X-RateLimit-Reset', `${limit.reset}`);
            }
            
            logger.info(`remaining ${limit.remaining - 1}/${limit.total} from:<${from}>`);
            if (limit.remaining) return next();
            
            // not good
            const delta = (limit.reset * 1000) - Date.now() | 0;
            const after = limit.reset - (Date.now() / 1000) | 0;
            res.set('Retry-After', `${after}`);
                return res
                        .status(StatusCodes.TOO_MANY_REQUESTS)
                        .json(CreateFailResponse({
                            data:{
                                // eslint-disable-next-line max-len
                                // eslint-disable-next-line max-len,@typescript-eslint/restrict-template-expressions
                                error:`[Rate limit exceeded] limit reached for <${clientIp}-${from}>, retry in ` + ms(delta, { long: true })
                            }
                        }));
    }
}

export  default  middlewares;
