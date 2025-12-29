import OrderData from '../data/order.js';
import CartData from '../../cart/data/cart.js';
import ProductData from '../../product/data/product.js';
import sequelize from '../../../config/config.js';
import ErrorHelper from '../../../utils/error-helper.js';
import Errors from '../constant/error.js';
import order from '../schemas/order.js';

class OrderService {
    static async createOrder({ userId, cartId, address, guestId }) {
        return await sequelize.transaction(async (t) => {
            const cart = await CartData.getCartByIdWithLock({
                cartId,
                transaction: t,
                lock: t.LOCK.UPDATE
            });
            if (!cart) throw new ErrorHelper(Errors.CART_ERROR.message, Errors.CART_ERROR.statusCode);
            const cartItems = await CartData.getCartItems({
                cartId,
                transaction: t,
                lock: t.LOCK.UPDATE
            });
            let totalAmount = 0;
            let ProductAmount = 0;

            const order = await OrderData.createOrder({ userId, cartId, address, transaction: t, guestId })

            await Promise.all(cartItems.map(async item => {
                ProductAmount = item.dataValues.quantity * item.dataValues.priceSnapshot;
                totalAmount += ProductAmount;
                console.log('ProductAmount', ProductAmount);
                console.log('totalAmount', totalAmount);

                await OrderData.createOrderItems({
                    orderId: order.dataValues.id,
                    productVariantId: item.dataValues.productVariantId,
                    quantity: item.dataValues.quantity,
                    priceSnapshot: item.dataValues.priceSnapshot
                });

                const [updatedRows] = await ProductData.updateProductStockForOrder({
                    quantity: item.dataValues.quantity,
                    productVariantId: item.dataValues.productVariantId,
                    transaction: t,
                });
                if (updatedRows === 0) throw new ErrorHelper(Errors.STOCK_ERROR.message, Errors.STOCK_ERROR.statusCode);

            }));
            console.log('ProductAmount', totalAmount);

            await OrderData.addTotalAmount({ orderId: order.dataValues.id, totalAmount });
            await CartData.updateCartStatus({ cartId })
            return order;
        })

    }
}
export default OrderService;