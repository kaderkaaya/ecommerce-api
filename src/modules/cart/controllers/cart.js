import CartService from '../services/cart.js';
import ResponseHelper from '../../../utils/response-handler.js';
class CartController {

    static async createCart(req, res) {
        try {
            const { userId } = req.body;
            const cart = await CartService.createCart({ userId });
            return ResponseHelper.success({ res, statusCode: 201, message: 'YES', data: { cart } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async addCartItems(req, res) {
        try {
            const userId = req.user.id;
            const { cartId, productVariantId, quantity } = req.body;
            const cartItems = await CartService.addCartItems({ userId, cartId, productVariantId, quantity });
            return ResponseHelper.success({ res, statusCode: 201, message: 'YES', data: { cartItems } });

        } catch (error) {
            console.log('error',error);
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

        static async removeCartItems(req, res) {
        try {
            const userId = req.user.id;
            const { cartId, productVariantId, quantity } = req.body;
            const cartItems = await CartService.removeCartItems({ userId, cartId, productVariantId, quantity });
            return ResponseHelper.success({ res, statusCode: 201, message: 'YES', data: { cartItems } });

        } catch (error) {
            console.log('error',error);
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }
    


}
export default CartController;