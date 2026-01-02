import { beforeEach, describe, expect, jest, test } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn()
    }
}));


jest.unstable_mockModule('../../models/cart/cart.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

jest.unstable_mockModule('../../models/cart/cart-item.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

const { default: CartModel } = await import(
    '../../models/cart/cart.js'
);

const { default: CartItemsModel } = await import(
    '../../models/cart/cart-item.js'
);

const { default: CartService } = await import(
    '../../modules/cart/services/cart.js'
)

describe('create-cart', () => {
    const mockCart = {
        id: 1,
        userId: 1,
        status: 1

    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should create cart', async () => {
        CartModel.create.mockResolvedValue(mockCart);
        const cart = await CartService.createCart(mockCart);
        expect(cart).toEqual(mockCart)
        expect(CartModel.create).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if create cart fails', async () => {
        CartModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            CartService.createCart(mockCart)
        ).rejects.toThrow('Db error')
    })
});

describe('add-items-to-the-cart', () => {

    test('should add product to cart if not exists', async () => {
        // cartItem yok
        // stok yeterli
    });

    test('should increase quantity if product exists and stock is enough', async () => {
        // cartItem var
        // stock >= currentQty + 1
    });

    test('should throw error if stock is insufficient', async () => {
        // cartItem var
        // stock < currentQty + 1
    });

});
