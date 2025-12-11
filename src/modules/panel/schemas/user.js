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
        page: Joi.number().optional(),
        limit: Joi.number().optional()
    }),

    forgotPassword: Joi.object({
        email: Joi.string().email().required(),
    }),

    updateUser: Joi.object({
        token: Joi.string().required(),
        name: Joi.string(),
        surname: Joi.string(),
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
    }),

    updatePassword: Joi.object({
        token: Joi.string().required(),
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
    }),

    deleteUser: Joi.object({
        token: Joi.string().required(),//for role based access control
        userId: Joi.number().required(),//The id of the user to be deleted
    }),
}