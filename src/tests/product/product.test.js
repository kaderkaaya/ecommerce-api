import { beforeEach, describe, expect, jest, test } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn()
    }
}));

//PRODUCT
jest.unstable_mockModule('../../models/product/product.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

//PRODUCT-IMAGE
jest.unstable_mockModule('../../models/product/product-image.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

//PRODUCT-STOCK
jest.unstable_mockModule('../../models/product/product-stock.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

//PRODUCT-VARIANT
jest.unstable_mockModule('../../models/product/product-variant.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

//CATEGORY
jest.unstable_mockModule('../../models/product/category.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));

const { default: CategoryModel } = await import(
    '../../models/product/category.js'
);
const { default: ProductService } = await import(
    '../../modules/product/services/product.js'
);

const { default: ProductModel } = await import(
    '../../models/product/product.js'
);

const { default: ProductImageModel } = await import(
    '../../models/product/product-image.js'
);

const { default: ProductStockModel } = await import(
    '../../models/product/product-stock.js'
);

const { default: ProductVariantModel } = await import(
    '../../models/product/product-variant.js'
);

//PRODUCT
describe('create-product', () => {
    const mockProduct = {
        id: 1,
        name: "shoes",
        slug: "shoe.com",
        isActive: true,
        categoryId:1,
        description: "this is a shoe",
       
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should create product', async () => {
        ProductModel.create.mockResolvedValue(mockProduct);
        CategoryModel.findOne.mockResolvedValue(mockProduct.categoryId);
        const product = await ProductService.createProduct(mockProduct);
        expect(product).toEqual(mockProduct)
        expect(ProductModel.create).toHaveBeenCalledTimes(1);
        expect(CategoryModel.findOne).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if create product fails', async () => {
        ProductModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.createProduct(mockProduct)
        ).rejects.toThrow('Db error')
    })
});

