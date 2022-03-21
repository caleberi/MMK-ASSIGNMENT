import {NextFunction, Request, Response} from "express";
import {CreateSuccessResponse, payloadCheck} from "@shared/utils";
import {SMSSchema} from "@validators/smsSchema";
import cache from "@cache/redis";
import {isNil} from "lodash";
import {FoundInCacheError, PhoneNotFoundError} from "@shared/errors";
import dataSource from "@db/index";
import {Phone} from "@entity/phone";
import {StatusCodes} from "http-status-codes";

export const checkOutBoundSMS = async function(req: Request,res: Response,next:NextFunction){
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const {id} = res.locals.account;
        const {from,to} = req.params;
        const {text} = req.body;
        payloadCheck(from,to,text);
        const {error,value} = SMSSchema.validate({from,to,text});
        if (error){
            return next(error);
        }
        const isToPresentInCache :string | null= await cache.get(`<${from}>:<${to}>`);
        if(!isNil(isToPresentInCache)){
            throw new FoundInCacheError(`sms from <${from}> to <${to}> blocked by STOP request`);
        }
        const phoneNumber = await dataSource.getRepository(Phone)
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            .query(`SELECT * FROM phone_number WHERE number='${from}' AND account_id=${id}`);
        if(isNil(phoneNumber))
            throw new PhoneNotFoundError("<from> parameter not found");
        return res.status(StatusCodes.OK)
            .json(CreateSuccessResponse({
                data:{
                    message:"outbound sms ok",
                    error:""
                }
            }));
    } catch (err:any) {
        next(err)
    }
}