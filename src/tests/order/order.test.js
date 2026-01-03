import { beforeEach, describe, expect, jest, test } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn(() => ({
            belongsTo: jest.fn(),
            hasMany: jest.fn(),
            sync: jest.fn(),
        })),
        transaction: jest.fn(async (callback) => {
            const t = {
                LOCK: {
                    UPDATE: 'UPDATE',
                },
                afterCommit: jest.fn(async (fn) => {
                    await fn();
                }),
            };
            return callback(t);
        }),

        authenticate: jest.fn(),
    },
}));


jest.unstable_mockModule('bullmq', () => ({
    Queue: jest.fn().mockImplementation(() => ({
        add: jest.fn(),
        close: jest.fn(),
        on: jest.fn(),
        emit: jest.fn(),
    })),
    Worker: jest.fn().mockImplementation(() => ({
        close: jest.fn(),
        on: jest.fn(),
    })),
}));


jest.unstable_mockModule('../../models/cart/cart.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}));

jest.unstable_mockModule('../../models/cart/cart-item.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}));

jest.unstable_mockModule('../../models/order/order.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

jest.unstable_mockModule('../../models/order/order-item.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

const { default: OrderModel } = await import(
    '../../models/order/order.js'
);

const { default: OrderItemsModel } = await import(
    '../../models/order/order-item.js'
);

const { default: OrderService } = await import(
    '../../modules/order/services/order.js'
)
const { default: CartModel } = await import(
    '../../models/cart/cart.js'
);

const { default: CartItemsModel } = await import(
    '../../models/cart/cart-item.js'
);
describe('create-order', () => {
    const mockOrder = {
        id: 1,
        userId: 1,
        totalAmount: 100,
        paymentMethod: 'credit_card',
        addressSnapshot: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zip: '12345'
        }

    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should create order', async () => {
        OrderModel.create.mockResolvedValue(mockOrder);
        CartModel.findOne.mockResolvedValue({ cartId: 1 });
        CartItemsModel.findAll.mockResolvedValue([]);
        const order = await OrderService.createOrder(mockOrder);
        expect(order).toEqual(mockOrder)
        expect(OrderModel.create).toHaveBeenCalledTimes(1);
        expect(CartModel.findOne).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if create order fails', async () => {
        OrderModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            OrderService.createOrder(mockOrder)
        ).rejects.toThrow('Db error')
    })
});

