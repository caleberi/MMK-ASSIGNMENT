import { NextFunction } from 'express';
import logger from 'jet-logger';
import { isNil } from 'lodash';
import { ParamMissingError } from './errors';


/**
 * Print an error object if it's truthy. Useful for testing.
 * 
 * @param err 
 */
export function pErr(err?: Error): void {
    if (!!err) {
        logger.err(err);
    }
};


/**
 * Get a random number between 1 and 1,000,000,000,000
 * 
 * @returns 
 */
export function getRandomInt(): number {
    return Math.floor(Math.random() * 1_000_000_000_000);
}


export const matchGivenWordArray = function(text:string,pattern:string[]){
    let begin = '';
    for (let idx = 0; idx < pattern.length; idx++) {
        if (idx<pattern.length-1)
            begin+= `[${pattern[idx]}]`;
        else
            begin+= `[${pattern[idx]}]|`;
    }
    begin += '/\\w+';
    return new RegExp(begin,"g").test(text);
}

export const CreateSuccessResponse =  function ({data}:{[key:string]:any}){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        status:"Success",
        ...data,
    }
}


export const CreateFailResponse =  function ({data}:{[key:string]:any}){
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
        status:"Failure",
        ...data,
    }
}

export const catchAsync = (fn: (arg0: any, arg1: any, arg2: any) => Promise<any>) => {
    return (req: any, res: any, next: ((reason: any) => PromiseLike<never>) | null | undefined) => {
      fn(req, res, next).catch(next);
    };
  };

export const payloadCheck = function(from:string|any,to:string|any,text:string|any){
    if (isNil(from)||isNil(to)||isNil(text)){
        let msg='';
        if(isNil(from))
            msg+= '<from> is missing,';
        if(isNil(to))
            msg+= ' <to> is missing,'
        if(isNil(text))
            msg+= ' <text> is missing,'
        throw new ParamMissingError(msg);
    }
}