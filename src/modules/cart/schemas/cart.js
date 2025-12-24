import Joi from "joi";

export default {

    createCart: Joi.object({
        userId: Joi.number().optional(),
    }),

    addCartItems: Joi.object({
        cartId : Joi.number().required(),
        productVariantId:Joi.number().required(),
        quantity :Joi.number().required(),
    }),
}