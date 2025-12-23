import CartData from '../data/cart.js';
// import Errors from '../constant/error.js';
import ErrorHelper from '../../../utils/error-helper.js';

import { v4 as uuidv4 } from 'uuid';
class CartService {
    static async createCart({ userId }) {
        const activeCart = await CartData.getActiveCart({ userId });
        if (activeCart) {
            throw new ErrorHelper('bu kart zaten mecvut');
        }
        if (!userId) {
            const guestId = uuidv4();
            const cart = await CartData.createCartForGuest({ guestId });
            return cart
        }
        const cart = await CartData.createCart({ userId });
        return cart;
    }

}
export default CartService;