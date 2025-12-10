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
    }),

    getUser: Joi.object({
        token: Joi.string().required(),
    }),
    getUsers: Joi.object({
        token: Joi.string().required(),
        page: Joi.number().min(1).default(1),
        limit: Joi.number().min(1).max(100).default(10),
    }),
}