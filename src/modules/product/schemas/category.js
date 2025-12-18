import Joi from "joi";
export default {
    createCategory: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().optional(),
        slug: Joi.string().optional(),
        parentId: Joi.number().optional(),
    }),

    updateCategory: Joi.object({
        categoryId: Joi.number().required(),
        name: Joi.string(),
        description: Joi.string(),
        isActive: Joi.boolean(),
        slug: Joi.string(),
        parentId: Joi.boolean(),
    }),

    getCategory: Joi.object({
        categoryId: Joi.number().required(),
    }),

    getCategories: Joi.object({
        page: Joi.number(),
        limit: Joi.number()
    }),

    deleteCategory: Joi.object({
        categoryId: Joi.number().required(),
    }),
}