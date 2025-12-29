import OrderModel from '../../../models/order/order.js';
import OrderItemsModel from '../../../models/order/order-item.js';

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
    }) {
        return await OrderItemsModel.create({
            orderId,
            productVariantId,
            quantity,
            priceSnapshot,
        })
    }

    static async addTotalAmount({ orderId, totalAmount }) {
        return await OrderModel.update(
            { totalAmount },
            { where: { id: orderId } }
        );

    }
}
export default OrderData;