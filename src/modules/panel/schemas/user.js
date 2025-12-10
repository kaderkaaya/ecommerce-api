import Joi from "joi";
export default {
    createUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string(),
        surname: Joi.string(),
        role: Joi.number(),
        phoneNumber: Joi.string(),
    }),
    login: Joi.object({
        phoneNumber: Joi.string().required(),
        password: Joi.string().required(),
    })
}