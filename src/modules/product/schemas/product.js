import Joi from "joi";
export default {
    createProduct: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().optional(),
        slug: Joi.string().optional(),
        categoryId:Joi.number().required(),
    }),

    updateProduct: Joi.object({
        productId: Joi.number().required(),
        name: Joi.string(),
        description: Joi.string(),
        isActive: Joi.boolean(),
        slug: Joi.string(),
        categoryId: Joi.number(), 
    }),

    getProduct: Joi.object({
        ProductId: Joi.number().required(),
    }),

    getProducts: Joi.object({
        page: Joi.number(),
        limit: Joi.number(),
        categoryId: Joi.number(),
        searhName: Joi.string(),
    }),

    deleteProduct: Joi.object({
        productId: Joi.number().required(),
    }),
}