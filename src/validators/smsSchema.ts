import Joi from "joi";


export const SMSSchema = Joi.object({
    from:Joi.string()
        .trim()
        .min(6)
        .max(16)
        .required()
        .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        .message(
            //@ts-ignore
            {   "string.pattern.base":"Invalid <from> phoneNumber",
                "string.min":"minimum 6 character required",
                "string.max":"maximum 16 characters allowed"
        }),
    to:Joi.string()
        .trim()
        .min(6)
        .max(16)
        .required()
        .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        .message
        (//@ts-ignore
            {   "string.pattern.base":"Invalid <to> phoneNumber",
                "string.min":"minimum 6 character required",
                "string.max":"maximum 16 characters allowed"
            }
        ),
    text:Joi.string()
        .trim()
        .min(1)
        .max(120)
        .message(
            //@ts-ignore
            {
                "string.min":"minimum 6 character required",
                "string.max":"maximum 16 characters allowed"
            }
        )
})