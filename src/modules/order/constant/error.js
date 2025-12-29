
export default {
    CART_ERROR: {
        statusCode: 801,
        message: 'Your cart is empty'
    },
    STOCK_ERROR: {
        statusCode: 802,
        message: 'The product in your cart is out of stock.'
    },
    PRODUCT_ERROR: {
        statusCode: 803,
        message: 'Product not found'
    },
    STOCK_CONFLICT: {
        statusCode: 804,
        message: 'Stock release failed',
    },
    QUANTITY_ERROR: {
        statusCode: 805,
        message: 'The amount cannot be less than zero.',
    },
    ORDER_ERROR: {
        statusCode: 806,
        message: 'Order Error',
    },
    FAILED: {
        statusCode: 807,
        message: 'An unknown error occurred',
    },
    IDEMPOTENCY_PAID: {
        statusCode: 808,
        message: 'payment received',
    },
    IDEMPOTENCY_CANCELED: {
        statusCode: 809,
        message: 'payment canceled.',
    }
}