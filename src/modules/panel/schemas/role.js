import Joi from "joi";
export default {
    createRole: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        color: Joi.string().optional(),
        authEndpoints: Joi.array().items(Joi.string()).required(),
    }),

    updateRole: Joi.object({
        roleId: Joi.number().required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        color: Joi.string().optional(),
        authEndpoints: Joi.array().items(Joi.string()).optional(),
    }),

    deleteRole: Joi.object({
        roleId: Joi.number().required(),
    }),

    getRoles: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
    }),
}