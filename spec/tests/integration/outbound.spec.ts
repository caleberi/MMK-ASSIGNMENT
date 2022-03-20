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
    const outboundPath = `${basePath}/sms/`;

     const { BAD_REQUEST, FORBIDDEN,OK, METHOD_NOT_ALLOWED } = HttpStatusCodes;
    let agent: SuperTest<Test>; 

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });

    describe(`"METHOD:${outboundPath}"`, () => {

        

        it(`[GET CALL]: should return JSON object containing an error message and 
        a status code of "${METHOD_NOT_ALLOWED}"`, (done) => {
            // Call API
            agent.get(outboundPath+"94023981202")
                .end((err: Error, res: Response) => {
                    expect(res.status).toBe(METHOD_NOT_ALLOWED);
                    done();
                });
        });

        it(`[POST CALL] should return a JSON object containing a message and `, (done) => {
            // Call API
            agent.post(outboundPath+"4924195509198").set('Authorization',authorization ).type('form').send({
                    "to":"441224459508",
                    "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit voluptatum laborum"
                })
                .end((err: Error, res: Response) => {
                    pErr(err);
                    console.log(res.body)
                    expect(res.status).toBe(OK);
                    expect(res.body.message).toBe("inbound sms ok");
                    done();
                });
        });

        it(`[POST CALL] should return a JSON object with an error message of "<from> is missing," and a status
            code of "${BAD_REQUEST}" if the <from> param was missing.`, (done) => {
            // Call API
            agent.post(outboundPath).set('Authorization',authorization ).type('form').send({
                "to":"441224459508",
                "text":" STOP Lorem ipsum dolor sit amet consectetur adipisicing elit voluptatum laborum"
            })
            .end((err: Error, res: Response) => {
                pErr(err);
                expect(res.status).toBe(BAD_REQUEST);
                expect(res.body.error).toBe("<from> is missing,");
                done();
            });
        });

        it(`[POST CALL] should return a JSON object with an error message of "<text> is missing," and a status
            code of "${BAD_REQUEST}" if the <text>  was missing.`, (done) => {
            // Call API
            agent.post(outboundPath+"441224459508").type('form').send({
                "to":"441224459508"
            })
            .end((err: Error, res: Response) => {
                pErr(err);
                expect(res.status).toBe(FORBIDDEN);
                expect(res.body.error).toBe("You are not authorized !!!");
                done();
            });
        });

    });
});