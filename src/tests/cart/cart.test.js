import { describe, test, expect, jest, beforeEach } from '@jest/globals';


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
        literal: jest.fn((value) => value),
        authenticate: jest.fn(),
    },
}));

jest.unstable_mockModule('../../models/cart/cart.js', () => ({
    default: {
        findOne: jest.fn()
    }
}));

jest.unstable_mockModule('../../models/cart/cart-item.js', () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}));

jest.unstable_mockModule('../../models/product/product-variant.js', () => ({
    default: {
        findOne: jest.fn()
    }
}));

jest.unstable_mockModule('../../models/product/product-stock.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));



const { default: CartService } = await import(
    '../../modules/cart/services/cart.js'
);

const { default: CartModel } = await import(
    '../../models/cart/cart.js'
);

const { default: CartItemsModel } = await import(
    '../../models/cart/cart-item.js'
);

const { default: ProductVariantModel } = await import(
    '../../models/product/product-variant.js'
);
const { default: ProductStockModel } = await import(
    '../../models/product/product-stock.js'
);


describe('add-items-to-the-cart', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should add product to cart if not exists', async () => {
        const mockCart = {
            cartId: 1,
            productVariantId: 1,
            quantity: 2,
        }
        CartModel.findOne.mockResolvedValue({ id: 1 });
        CartItemsModel.findOne.mockResolvedValue(null);
        ProductVariantModel.findOne.mockResolvedValue({
            id: 1,
            stock: 10,
            price: 100,
        });

        ProductStockModel.update.mockResolvedValue([1]);
        CartItemsModel.create.mockResolvedValue({ id: 1 });
        const result = await CartService.addCartItems(mockCart);
        expect(ProductStockModel.update).toHaveBeenCalled();
        expect(CartItemsModel.create).toHaveBeenCalled();
        expect(result).toEqual({ success: true });
    });


    test('should increase quantity if product exists and stock is enough', async () => {
        const cartItem = {
            id: 1,
            cartId: 1,
            productVariantId: 1,
            quantity: 2,
            save: jest.fn().mockResolvedValue(true)
        };

        CartModel.findOne.mockResolvedValue({ id: 1 });
        CartItemsModel.findOne.mockResolvedValue(cartItem);
        ProductVariantModel.findOne.mockResolvedValue({
            id: 1,
            stock: 10,
            price: 100
        });

        const result = await CartService.addCartItems({
            cartId: 1,
            productVariantId: 1,
            quantity: 1
        });

        expect(cartItem.save).toHaveBeenCalledWith({
            transaction: expect.any(Object)
        });
        expect(cartItem.quantity).toBe(3);
        expect(result).toEqual({ success: true });
    });
    test('should throw error if stock is insufficient', async () => {
        const cartItem = {
            id: 1,
            cartId: 1,
            productVariantId: 1,
            quantity: 9,
            save: jest.fn()
        };

        CartModel.findOne.mockResolvedValue({ id: 1 });
        CartItemsModel.findOne.mockResolvedValue(cartItem);
        ProductVariantModel.findOne.mockResolvedValue({
            id: 1,
            stock: 2,
            price: 100
        });

        await expect(
            CartService.addCartItems({
                cartId: 1,
                productVariantId: 1,
                quantity: 1
            })
        ).rejects.toThrow('Insufficient stock');
        expect(cartItem.save).not.toHaveBeenCalled();
    });

});