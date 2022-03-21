import {NextFunction, Request, Response} from "express";
import {CreateSuccessResponse, matchGivenWordArray, payloadCheck} from "@shared/utils";
import {SMSSchema} from "@validators/smsSchema";
import dataSource from "@db/index";
import {Phone} from "@entity/phone.entity";
import logger from "jet-logger";
import {isNil} from "lodash";
import {ParamMissingError, PhoneNotFoundError, UnknownError} from "@shared/errors";
import cache from "@cache/redis";
import {StatusCodes} from "http-status-codes";

export const checkInBoundSMS = async function(req: Request,res: Response,next:NextFunction){
    try {
        const {from} = req.params;
        const {to,text} = req.body;
        payloadCheck(from,to,text);
        const {error,value} = SMSSchema.validate({from,to,text});
        if (error){
            return next(error);
        }
        const phoneNumber = await dataSource.getRepository(Phone).findOneBy({number:to});
        logger.info(`Found PhoneNumber:{${JSON.stringify(phoneNumber)}} .`)
        if(isNil(phoneNumber)){
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new PhoneNotFoundError(`to parameter with phone number: {${value.to}} not found”`)
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const textContainsSTOP : boolean =  matchGivenWordArray(text,
                                ["STOP", "STOP\n", "STOP\r","STOP\r\n"])
        if(textContainsSTOP){
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            await cache.setEx(`<${from}>:<${to}>`,14400,`<${to}>:<${from}>`)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,max-len
            logger.info(`Cached entry <from:${from},to:${to}> since text contains [STOP]  for 4hrs.`)
        }
        return res.status(StatusCodes.OK)
            .json(CreateSuccessResponse({data:{"message": "inbound sms ok","error": ""}}));
    } catch (err:any) {
        if(!(err instanceof PhoneNotFoundError))
            return next(err);
        if(!(err instanceof ParamMissingError))
            return next(err);
        next(new UnknownError())
    }
}