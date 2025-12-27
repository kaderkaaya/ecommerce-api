import Joi from "joi";
export default {
    createOrder: Joi.object({
        cartId: Joi.number().required(),
        userId: Joi.number().optional(),
        paymentMethod: Joi.string().optional(),
        addressId: Joi.number().optional()
    }),

}