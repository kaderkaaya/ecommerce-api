import Joi from "joi";
export default {
    createCart: Joi.object({
        userId: Joi.number().optional(),
        
    }),

}