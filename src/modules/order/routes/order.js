import express from "express";
const router = express.Router();
import OrderController from '../controllers/order.js';
import OrderSchema from '../schemas/order.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import AuthenticateForUser from '../../../utils/auth-middleware-user.js';

router.post('/create-order',
    SchemaHelper.validateSchemaBody(OrderSchema.createOrder),
    OrderController.createOrder);

router.post('/mock-pay',
    SchemaHelper.validateSchemaBody(OrderSchema.mockPay),
    OrderController.mockPay);

export default router;