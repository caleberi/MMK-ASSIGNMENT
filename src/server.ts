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
import swaggerUI from "swagger-ui-express";
import   fs from "fs";
import { join } from 'path';
const app = express();


const swaggerDocument = JSON.parse(fs.readFileSync(join(__dirname,"../swagger.json"),"utf8"))

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};


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

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));
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
