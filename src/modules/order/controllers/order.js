import OrderService from '../services/order.js';
import ResponseHelper from '../../../utils/response-handler.js';

class OrderController {
    static async createOrder(req, res) {
        try {
            const { userId, cartId, address, guestId } = req.body;
            const order = await OrderService.createOrder({ userId, cartId, address, guestId });
            return ResponseHelper.success({ res, statusCode: 201, message: 'YES', data: { order } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async mockPay(req, res) {
        try {
            const { orderId, paymentMethod, result } = req.body;
            const payment = await OrderService.mockPay({ orderId, paymentMethod, result });
            return ResponseHelper.success({ res, statusCode: 201, message: 'YES', data: { payment } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }
}
export default OrderController;