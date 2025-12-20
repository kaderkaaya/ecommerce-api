import Joi from "joi";
export default {
    createProduct: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().optional(),
        slug: Joi.string().optional(),
        categoryId: Joi.number().required(),
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
        productId: Joi.number().required(),
    }),

    getProducts: Joi.object({
        page: Joi.number(),
        limit: Joi.number(),
        categoryId: Joi.number(),
        searchName: Joi.string(),
    }),

    deleteProduct: Joi.object({
        productId: Joi.number().required(),
    }),

    getProductsForUsers: Joi.object({
        page: Joi.number(),
        limit: Joi.number(),
        categoryId: Joi.number(),
        searchName: Joi.string(),
    }),

    addProductVariant: Joi.object({
        productId: Joi.number().required(),
        price: Joi.number(),
        attributes: Joi.object()
            .pattern(Joi.string(),
                Joi.any())
            .optional()
            .allow(null),
    }),

    updateProductVariant: Joi.object({
        variantId: Joi.number().required(),
        productId: Joi.number(),
        price: Joi.number(),
        attributes: Joi.object()
            .pattern(Joi.string(),
                Joi.any())
            .optional()
            .allow(null),
    }),

    updateProductVariantStatus: Joi.object({
        variantId: Joi.number().required(),
        variantStatus: Joi.number(),
    }),

    getProductVariant: Joi.object({
        variantId: Joi.number().required(),
    }),

    addProductStock: Joi.object({
        productVariantId: Joi.number().required(),
        quantity: Joi.number().required(),
        reserved: Joi.number().required(),
        lowStockThreshold: Joi.number().required(),
    }),

    updateProductStock: Joi.object({
        stokcId: Joi.number().required(),
        productVariantId: Joi.number(),
        quantity: Joi.number(),
        reserved: Joi.number(),
        lowStockThreshold: Joi.number(),
    }),

    updateProductStockStatus: Joi.object({
        stokcId: Joi.number().required(),
         status: Joi.number(),
    })
}