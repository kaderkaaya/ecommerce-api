import CartModel from '../../../models/cart/cart.js';
import CartItemSModel from '../../../models/cart/cart-item.js';
import CART_STATUS from '../constant/const.js';

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

    static async getCartById({ cartId, transaction }) {
        const cart = await CartModel.findOne({
            where: {
                id: cartId,
                status: 0,
            },
            transaction
        })
        return cart;
    }
    static async getCartByIdWithLock({
        cartId,
        transaction,
        lock
    }) {
        const cart = await CartModel.findOne({
            where: {
                id: cartId,
                status: 0,
            },
            transaction,
            lock
        })
        return cart;
    }

    static async getCartItem({ cartId, productVariantId, transaction, lock }) {
        return await CartItemSModel.findOne({
            where: {
                cartId,
                productVariantId
            },
            transaction,
            lock
        })
    }
    static async getCartItems({
        cartId,
        transaction,
        lock
    }) {
        return await CartItemSModel.findAll({
            where: {
                cartId,
            },
            transaction,
            lock
        })
    }
    static async addCartItems({
        cartId,
        productVariantId,
        quantity,
        priceSnapshot,
        transaction
    }) {
        return await CartItemSModel.create({
            cartId,
            productVariantId,
            quantity,
            priceSnapshot,
        }, {
            transaction
        })
    }

    static async removeCartItemss({
        cartItemsId,
        transaction }) {
        return await CartItemSModel.destroy({
            where: {
                id: cartItemsId,
            },
            transaction
        })
    }
    static async updateCartStatus({ cartId, transaction }) {
        return await CartModel.update(
            { status: CART_STATUS.CART_STATUS.ORDERED },
            {
                where: { id: cartId },
                transaction
            },
        )
    }

}
export default CartData;