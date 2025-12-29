import OrderService from '../services/order.js';
import ResponseHelper from '../../../utils/response-handler.js';

class OrderController {
    static async createOrder(req, res) {
        try {
            const { userId, cartId, address, guestId } = req.body;
            const order = await OrderService.createOrder({ userId, cartId, address, guestId });
            return ResponseHelper.success({ res, statusCode: 201, message: 'YES', data: { order } });

        } catch (error) {
            console.log('error', error);

            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }
    mockPay
}
export default OrderController;