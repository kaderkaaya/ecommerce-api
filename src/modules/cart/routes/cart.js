import express from "express";
const router = express.Router();
import CartController from '../controllers/cart.js';
import CartSchema from '../schemas/cart.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import AuthenticateForUser from '../../../utils/auth-middleware-user.js';

router.post('/create-cart',
    SchemaHelper.validateSchemaBody(CartSchema.createCart),
    CartController.createCart);

router.post('/add-cart-items',
    AuthenticateForUser,
    SchemaHelper.validateSchemaBody(CartSchema.addCartItems),
    CartController.addCartItems);

router.post('/remove-cart-items',
    AuthenticateForUser,
    SchemaHelper.validateSchemaBody(CartSchema.removeCartItems),
    CartController.removeCartItems);


export default router;