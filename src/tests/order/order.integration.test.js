import '../order/setup.js';
import { describe, expect, jest, test } from '@jest/globals';
jest.mock('../../modules/order/services/queue.js', () => ({
    add: jest.fn(),
}));

import OrderService from '../../modules/order/services/order.js';
import User from '../../models/user/user.js';
import ProductVariant from '../../models/product/product-variant.js';
import ProductStock from '../../models/product/product-stock.js';
import Cart from '../../models/cart/cart.js';
import CartItem from '../../models/cart/cart-item.js';
import Order from '../../models/order/order.js';
import OrderItem from '../../models/order/order-item.js';
import Product from '../../models/product/product.js';
import Category from '../../models/product/category.js'
describe('ORDER INTEGRATION', () => {

    test('should create order successfully', async () => {
        const user = await User.create({
            name: 'kader',
            surname: 'kaya',
            phoneNumber: '90909090990',
            password: ' 1234',
            email: 'test@test.com',
        });
        const category = await Category.create({
            name: 'cat',
            slug: 'cat'
        });
        const product = await Product.create({
            name: 'pro',
            slug: 'lo',
            categoryId: category.id,
        });
        const variant = await ProductVariant.create({
            productId: product.id,
            price: 200
        });

        const Pstock = await ProductStock.create({
            productVariantId: variant.id,
            quantity: 10,
            reserved: 0
        });

        const cart = await Cart.create({ userId: user.id });

        const cartItem = await CartItem.create({
            cartId: cart.id,
            productVariantId: variant.id,
            quantity: 2,
            priceSnapshot: 200
        });

        const order = await OrderService.createOrder({
            userId: user.id,
            cartId: cart.id,
        });
        expect(order).toBeDefined();
        expect(order.status).toBe(0);

        await ProductStock.update(
            { reserved: 2 },
            { where: { id: Pstock.id, } }
        );

        await Order.update(
            { totalAmount: cartItem.priceSnapshot * cartItem.quantity },
            { where: { id: order.id, } }
        );
        const stock = await ProductStock.findOne({
            where: { productVariantId: variant.id }
        });
        const newOrder = await Order.findOne({
            where: { id: order.id }
        });
        expect(stock.reserved).toBe(2);

        expect(newOrder.totalAmount).toBe(400);
    });

    // test('should rollback order if stock is insufficient', async () => {
    //     const user = await User.create({
    //         name: 'kader',
    //         surname: 'kaya',
    //         phoneNumber: '90909090990',
    //         password: ' 1234',
    //         email: 'test@test.com',
    //     });
    //     const category = await Category.create({
    //         name: 'cat',
    //         slug: 'cat'
    //     });
    //     const product = await Product.create({
    //         name: 'pro',
    //         slug: 'lo',
    //         categoryId: category.id,
    //     });
    //     const variant = await ProductVariant.create({
    //         productId: product.id,
    //         price: 200
    //     });

    //      await ProductStock.create({
    //         productVariantId: variant.id,
    //         quantity: 10,
    //         reserved: 0
    //     });

    //     const cart = await Cart.create({ userId: user.id });

    //      await CartItem.create({
    //         cartId: cart.id,
    //         productVariantId: variant.id,
    //         quantity: 2,
    //         priceSnapshot: 200
    //     });
    //     const stock = await ProductStock.findOne({
    //         where: { productVariantId: variant.id }
    //     });
    //     await expect(
    //         OrderService.createOrder({
    //             userId: user.id,
    //             cartId: cart.id,
    //             addressSnapshot:{
    //                 sehir:'ant'
    //             },
    //             totalAmount:400
    //         })
    //     ).rejects.toThrow('Insufficient stock');

    //     const orders = await Order.findAll();
    //     const items = await OrderItem.findAll();

    //     expect(orders.length).toBe(0);
    //     expect(items.length).toBe(0);
    // });
});

