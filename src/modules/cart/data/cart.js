import CartModel from '../../../models/cart/cart.js';
import CartItemSModel from '../../../models/cart/cart-item.js';
class CartData {
    static async createCart({ userId }) {
        return await CartModel.create({
            userId
        })
    }

    static async createCartForGuest({ guestId }) {
        return await CartModel.create({
            guestId
        })
    }

    static async getActiveCart({ userId }) {
        const cart = await CartModel.findOne({
            where: {
                userId,
                status: 0
            }
        })
        return cart;
    }


}
export default CartData;