import { ParamMissingError } from "@shared/errors"
import {matchGivenWordArray,payloadCheck} from "@shared/utils"

describe("@shared/utils",function(){
    it(`fn:${matchGivenWordArray.name}spec matches words contain STOP successfully`,function(){
        let testWords = [
            "When text is STOP or STOP\n or STOP\r or STOP\r\n ",
            "If the pair ‘to’, ‘from’ matches any entry in cache (STOP), return an error"
        ]
        let pattern = ["STOP", "STOP\n", "STOP\r","STOP\r\n"]
        testWords.forEach(testWord => {
            expect(matchGivenWordArray(testWord,pattern)).toBeTruthy;
        });
    })

    it(`fn:${matchGivenWordArray.name}spec matches words contain STOP unsuccessfully`,function(){
        let testWords = [
            "The ‘from’ and ‘to’ pair must be stored in cache as a unique entry and should expire after 4 hours",
            "If authentication is failing, return HTTP 403.",
        ]
        let pattern = ["STOP", "STOP\n", "STOP\r","STOP\r\n"]
        testWords.forEach(testWord => {
            expect(matchGivenWordArray(testWord,pattern)).toBeFalsy;
        });
    })

    it(`fn:${payloadCheck.name}spec should throw error if any attribute is missing `,function(){
        let payloads = [
            {},
            {
                from:"03831029382",
                to:"1831029382"
            },
            {
                text:"If authentication is failing, return HTTP 403",
                to:"1831029382"
            },
            {
                text:"If authentication is failing, return HTTP 403",
                from:"1831029382"
            }
        ];
        payloads.forEach(payload => {
            let {from,to,text}=payload;
            // ts-ignore
            expect(function(){payloadCheck(from,to,text)}).toThrow();
        });
    })

})
