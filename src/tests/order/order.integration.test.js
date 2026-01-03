import '../order/setup.js';

import OrderService from '../../modules/order/services/order.js';
import User from '../../models/user/user.js';
import ProductVariant from '../../models/product/product-variant.js';
import ProductStock from '../../models/product/product-stock.js';
import Cart from '../../models/cart/cart.js';
import CartItem from '../../models/cart/cart-item.js';
import Order from '../../models/order/order.js';
import OrderItem from '../../models/order/order-item.js';

describe('ORDER INTEGRATION', () => {

    test('should create order successfully', async () => {
        const user = await User.create({
            email: 'test@test.com',
            password: '123456'
        });

        const variant = await ProductVariant.create({
            price: 100
        });

        await ProductStock.create({
            productVariantId: variant.id,
            stock: 10,
            reserved: 0
        });

        const cart = await Cart.create({ userId: user.id });

        await CartItem.create({
            cartId: cart.id,
            productVariantId: variant.id,
            quantity: 2,
            priceSnapshot: 100
        });

        const order = await OrderService.createOrder({
            userId: user.id,
            cartId: cart.id
        });

        expect(order).toBeDefined();
        expect(order.status).toBe(0);
        expect(order.totalPrice).toBe(200);

        const stock = await ProductStock.findOne({
            where: { productVariantId: variant.id }
        });

        expect(stock.reserved).toBe(2);
    });

    test('should rollback order if stock is insufficient', async () => {
        const user = await User.create({
            email: 'fail@test.com',
            password: '123456'
        });

        const variant = await ProductVariant.create({
            price: 100
        });

        await ProductStock.create({
            productVariantId: variant.id,
            stock: 1,
            reserved: 0
        });

        const cart = await Cart.create({ userId: user.id });

        await CartItem.create({
            cartId: cart.id,
            productVariantId: variant.id,
            quantity: 2,
            priceSnapshot: 100
        });

        await expect(
            OrderService.createOrder({
                userId: user.id,
                cartId: cart.id
            })
        ).rejects.toThrow('Insufficient stock');

        const orders = await Order.findAll();
        const items = await OrderItem.findAll();

        expect(orders.length).toBe(0);
        expect(items.length).toBe(0);
    });
});

