import supertest from 'supertest';
import HttpStatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';

import app from '@server';
import { ParamMissingError } from '@shared/errors';
import { pErr } from '@shared/utils';



describe('inbound-router', () => {

    const user = {
        "auth_id":"20S0KPNOIM",
        "username":"azr1"
    }

    const authorization = "Base "+Buffer.from(`${user.username}:${user.auth_id}`,"utf8").toString("base64");

    const basePath = '/inbound';
    const inboundPath = `${basePath}/sms/`;

    const { BAD_REQUEST, OK, METHOD_NOT_ALLOWED } = HttpStatusCodes;
    let agent: SuperTest<Test>; 

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"METHOD:${inboundPath}"`, () => {

        it(`[GET CALL]: should return JSON object containing an error message and 
        a status code of "${METHOD_NOT_ALLOWED}"`, (done) => {
            // Call API
            agent.get(inboundPath+"4924195509198").set('Authorization',authorization )
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(METHOD_NOT_ALLOWED);
                    done();
                });
        });

        it(`[POST CALL] should return a JSON object containing a message and `, (done) => {
            // Call API
            agent.get(inboundPath+"4924195509198").set('Authorization',authorization ).type('form').send({
                    "to":"441224459508",
                    "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit voluptatum laborum"
                })
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(METHOD_NOT_ALLOWED);
                    done();
                });
        });

        it(`[POST CALL] should return a JSON object with an error message of "${ParamMissingError.Msg}" and a status
            code of "${BAD_REQUEST}" if the <to> param was missing.`, (done) => {
            // Call API
            agent.post(inboundPath+"441224459508").set('Authorization',authorization ).type('form').send({
                "text":" STOP Lorem ipsum dolor sit amet consectetur adipisicing elit voluptatum laborum"
            })
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(ParamMissingError.HttpStatus);
                    console.log(res.body.error);
                    expect(res.body.error).toBe(" <to> is missing,");
                    done();
                });
        });

        it(`[POST CALL] should return a JSON object with an error message of "${ParamMissingError.Msg}" and a status
            code of "${BAD_REQUEST}" if the <text>  was missing.`, (done) => {
            // Call API
            agent.post(inboundPath+"441224459508").set('Authorization',authorization ).type('form').send({
                "to":"441224459508"
            })
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(ParamMissingError.HttpStatus);
                    expect(res.body.error).toBe(" <text> is missing,");
                    done();
                });
        });
    });
});
