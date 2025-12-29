import Joi from "joi";
export default {
    createOrder: Joi.object({
        cartId: Joi.number().required(),
        userId: Joi.number().optional(),
        guestId: Joi.string().optional(),
        address: Joi.object({
            city: Joi.string().required(),
            district: Joi.string().required(),
            fullAddress: Joi.string().required(),
            phone: Joi.string().required(),
        }).required()
    }),

    mockPay: Joi.object({
        orderId: Joi.number().required(),
        paymentMethod: Joi.string().optional(),
        result: Joi.string().valid('success', 'fail').required()
    })
}