import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import apiRouter from '@routes/api';
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';
import "reflect-metadata";
import { CreateFailResponse } from '@shared/utils';

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

function ping(_: Request, res: Response){
    res.json({"message":"Pinged!!!"});
}

app.get('/ping', ping);

app.use('/',apiRouter());


app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
    return res.status(status).json(CreateFailResponse({
        data:{
            status:status,
            error: err.message,
        }
    }));
});


export default app;
