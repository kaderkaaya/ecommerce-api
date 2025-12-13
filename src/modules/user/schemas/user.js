import Joi from "joi";
export default {

    createUser: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string(),
        surname: Joi.string(),
        phoneNumber: Joi.string(),
    }),

    login: Joi.object({
        phoneNumber: Joi.string().required(),
        password: Joi.string().required(),
    }),

    getUser: Joi.object({}),
    
    forgotPassword: Joi.object({
        email: Joi.string().email().required(),
    }),

    updateUser: Joi.object({
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
    }),

    updatePassword: Joi.object({
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    }),

    deleteAccount: Joi.object({
    }),
}