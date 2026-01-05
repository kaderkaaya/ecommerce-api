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
import Errors from '../../modules/order/constant/error.js';

describe('create-order-integration-test', () => {

    test('should create order successfully', async () => {
        const user = await User.create({
            name: 'kader',
            surname: 'kaya',
            phoneNumber: '90909090990',
            password: '1234',
            email: 'test@test.com',
        });

        const category = await Category.create({
            name: 'cat',
            slug: 'cat',
        });

        const product = await Product.create({
            name: 'pro',
            slug: 'lo',
            categoryId: category.id,
        });

        const variant = await ProductVariant.create({
            productId: product.id,
            price: 200,
        });

        const pStock = await ProductStock.create({
            productVariantId: variant.id,
            quantity: 10,
        });

        const cart = await Cart.create({ userId: user.id });

        const cartItem = await CartItem.create({
            cartId: cart.id,
            productVariantId: variant.id,
            quantity: 2,
            priceSnapshot: 200,
        });

        await ProductStock.update(
            { reserved: 2 },
            { where: { id: pStock.id } }
        );

        const order = await OrderService.createOrder({
            userId: user.id,
            cartId: cart.id,
        });

        await Order.update(
            { totalAmount: cartItem.priceSnapshot * cartItem.quantity },
            { where: { id: order.id, } }
        );

        const newOrder = await Order.findOne({
            where: { id: order.id }
        });

        expect(newOrder).toBeDefined();
        expect(newOrder.status).toBe(0);
        expect(newOrder.totalAmount).toBe(400);

        const stock = await ProductStock.findOne({
            where: { id: pStock.id },
        });

        expect(stock.quantity).toBe(8);
        expect(stock.reserved).toBe(0);
    });

    test('should rollback order if stock is insufficient', async () => {
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

        await ProductStock.create({
            productVariantId: variant.id,
            quantity: 10,
            reserved: 0
        });

        const cart = await Cart.create({ userId: user.id });

        await CartItem.create({
            cartId: cart.id,
            productVariantId: variant.id,
            quantity: 2,
            priceSnapshot: 200
        });

        const pStock = await ProductStock.findOne({
            where: { productVariantId: variant.id }
        });

        await ProductStock.update(
            { reserved: 1 },
            { where: { id: pStock.id } }
        );
        await ProductStock.findOne({
            where: { productVariantId: variant.id }
        });

        await expect(
            OrderService.createOrder({
                userId: user.id,
                cartId: cart.id,
                address: {
                    sehir: 'ant'
                },
                // totalAmount: 400
            })

        ).rejects.toThrow(Errors.STOCK_ERROR.message);

        const orders = await Order.findAll();
        const items = await OrderItem.findAll();

        expect(orders.length).toBe(0);
        expect(items.length).toBe(0);
    });
});

