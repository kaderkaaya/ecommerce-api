import OrderData from '../data/order.js';
import CartData from '../../cart/data/cart.js';
import ProductData from '../../product/data/product.js';
import sequelize from '../../../config/config.js';
import ErrorHelper from '../../../utils/error-helper.js';
import Errors from '../constant/error.js';
import ORDER_STATUS from '../constant/const.js';

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
                await OrderData.createOrderItems({
                    orderId: order.dataValues.id,
                    productVariantId: item.dataValues.productVariantId,
                    quantity: item.dataValues.quantity,
                    priceSnapshot: item.dataValues.priceSnapshot,
                    transaction: t,
                });

                const [updatedRows] = await ProductData.updateProductStockForOrder({
                    quantity: item.dataValues.quantity,
                    productVariantId: item.dataValues.productVariantId,
                    transaction: t,
                });

                if (updatedRows === 0) throw new ErrorHelper(Errors.STOCK_ERROR.message, Errors.STOCK_ERROR.statusCode);

            }));
            await OrderData.addTotalAmount({ orderId: order.dataValues.id, totalAmount, transaction: t, });
            await CartData.updateCartStatus({ cartId, transaction: t, })
            return order;
        })
    }

    static async mockPay({ orderId, paymentMethod, result }) {
        return await sequelize.transaction(async (t) => {
            const order = await OrderData.getOrderByIdWithLock({
                orderId,
                transaction: t,
                lock: t.LOCK.UPDATE
            });
            if (order.dataValues.status === ORDER_STATUS.ORDER_STATUS.PAID) {
                throw new ErrorHelper(
                    Errors.IDEMPOTENCY_PAID.message,
                    Errors.IDEMPOTENCY_PAID.statusCode,
                    { order }
                )
            }
            if (order.dataValues.status === ORDER_STATUS.ORDER_STATUS.CANCELED) throw new ErrorHelper(Errors.IDEMPOTENCY_CANCELED.message, Errors.IDEMPOTENCY_CANCELED.statusCode)
            if (order.dataValues.status !== ORDER_STATUS.ORDER_STATUS.CREATED) throw new ErrorHelper(Errors.ORDER_ERROR.message, Errors.ORDER_ERROR.statusCode)
            if (result === 'success') {
                await OrderData.updateOrderStatusSuccess({ orderId, transaction: t });
                await OrderData.addPaymentMethot({ orderId, paymentMethod, transaction: t });
            }
            else if (result === 'fail') {
                const orderItems = await OrderData.getOrderItems({ orderId, transaction: t, lock: t.LOCK.UPDATE });
                for (const item of orderItems) {
                    const [updatedRows] = await ProductData.updateProductStockForOrderFail({
                        quantity: item.dataValues.quantity,
                        productVariantId: item.dataValues.productVariantId,
                        transaction: t,
                    });
                    if (updatedRows === 0) throw new ErrorHelper(Errors.STOCK_ERROR.message, Errors.STOCK_ERROR.statusCode);
                }
                await OrderData.updateOrderStatusFail({ orderId, transaction: t });
            }
            else {
                throw new ErrorHelper(Errors.FAILED.message, Errors.FAILED.statusCode)
            }
        })
    }
}
export default OrderService;