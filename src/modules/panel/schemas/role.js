import Joi from "joi";
export default {
    createRole: Joi.object({
        token: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().optional(),
        color: Joi.string().optional(),
        authEndpoints: Joi.array().items(Joi.string()).required(),
    }),

    updateRole: Joi.object({
        token: Joi.string().required(),
        roleId: Joi.number().required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        color: Joi.string().optional(),
        authEndpoints: Joi.array().items(Joi.string()).optional(),
    }),

    deleteRole: Joi.object({
        token: Joi.string().required(),
        roleId: Joi.number().required(),
    }),

    getRoles: Joi.object({
        token: Joi.string().required(),
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
    }),
}