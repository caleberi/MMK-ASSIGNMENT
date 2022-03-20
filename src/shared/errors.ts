import HttpStatusCodes from 'http-status-codes';


export abstract class CustomError extends Error {
    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;
    protected constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}


export class ParamMissingError extends CustomError {

    public static readonly Msg = 'One or more of the required parameters was missing.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg?:string) {
        super(msg ? msg : ParamMissingError.Msg, ParamMissingError.HttpStatus);
    }
}


export class MethodNotSupportedError extends CustomError {

    public static readonly Msg = 'Unsupported Method';
    public static readonly HttpStatus = HttpStatusCodes.METHOD_NOT_ALLOWED;

    constructor(msg?:string) {
        super(msg ? msg : MethodNotSupportedError.Msg, MethodNotSupportedError.HttpStatus);
    }
}



export class AccountNotFoundError extends CustomError {

    // eslint-disable-next-line max-len
    public static readonly Msg = 'A account with the given details does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;

    constructor(msg?:string) {
        super(msg ? msg : AccountNotFoundError.Msg, AccountNotFoundError.HttpStatus);
    }
}

export class UnauthorizedError extends CustomError{
    public static readonly Msg = 'You are not authorized !!!';
    public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;

    constructor(msg?:string) {
        super(msg ? msg : UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
    }
}

export class AuthenticationError extends CustomError{
    public static readonly Msg = 'Invalid authentication!!';
    public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

    constructor(msg?:string) {
        super(msg ? msg : UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
    }
}



export class PhoneNotFoundError extends CustomError {

    public static readonly Msg = 'A phonenumber does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;

    constructor(msg?:string) {
        super(msg ? msg : PhoneNotFoundError.Msg, PhoneNotFoundError.HttpStatus);
    }
}


export class FoundInCacheError extends CustomError {

    public static readonly Msg = 'Seems an existing entry was found ';
    public static readonly HttpStatus = HttpStatusCodes.FORBIDDEN;

    constructor(msg?:string) {
        super(msg ? msg : FoundInCacheError.Msg, FoundInCacheError.HttpStatus);
    }
}

export class UnknownError extends CustomError{
    public static readonly Msg = 'Unknown failure';
    public static readonly HttpStatus = HttpStatusCodes.INTERNAL_SERVER_ERROR;

    constructor(){
        super( FoundInCacheError.Msg, FoundInCacheError.HttpStatus);
    }
}