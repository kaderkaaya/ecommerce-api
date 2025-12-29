import OrderModel from '../../../models/order/order.js';
import OrderItemsModel from '../../../models/order/order-item.js';
import ORDER_STATUS from '../constant/const.js';

class OrderData {
    static async createOrder({ userId, cartId, address, totalAmount, transaction, guestId }) {
        if (guestId) {
            return await OrderModel.create({
                guestId,
                cartId,
                addressSnapshot: address,
                totalAmount
            }, {
                transaction
            });
        }
        return await OrderModel.create({
            userId,
            cartId,
            addressSnapshot: address,
            totalAmount
        }, {
            transaction
        });

    }

    static async createOrderItems({
        orderId,
        productVariantId,
        quantity,
        priceSnapshot,
        transaction
    }) {
        return await OrderItemsModel.create({
            orderId,
            productVariantId,
            quantity,
            priceSnapshot,
        },
            {
                transaction
            })
    }

    static async addTotalAmount({ orderId, totalAmount, transaction }) {
        return await OrderModel.update(
            { totalAmount },
            {
                where: { id: orderId },
                transaction
            }
        );
    }

    static async getOrderByIdWithLock({
        orderId,
        transaction,
        lock }) {
        return await OrderModel.findOne({
            where: { id: orderId },
            transaction,
            lock
        });

    }

    static async updateOrderStatusSuccess({ orderId, transaction, }) {
        return await OrderModel.update(
            { status: ORDER_STATUS.ORDER_STATUS.PAID },
            {
                where: { id: orderId },
                transaction
            },
        )
    }


    static async updateOrderStatusFail({ orderId, transaction, }) {
        return await OrderModel.update(
            { status: ORDER_STATUS.ORDER_STATUS.CANCELED },
            {
                where: { id: orderId },
                transaction
            },
        )
    }

    static async getOrderItems({ orderId, transaction, lock }) {
        return await OrderItemsModel.findAll({
            where: { orderId },
            transaction,
            lock
        }
        )

    }

    static async addPaymentMethot({ orderId, paymentMethod, transaction }) {
        return await OrderModel.update(
            { paymentMethod },
            {
                where: { id: orderId },
                transaction
            }
        );

    }


}
export default OrderData;