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
        categoryId: 1,
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

describe('update-product', () => {
    const mockProduct = {
        userId: 1,
        productId: 1,
        categoryId: 1,
        name: "bag",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should update product', async () => {
        ProductModel.update.mockResolvedValue([1]);
        ProductModel.findOne.mockResolvedValue(mockProduct);
        CategoryModel.findOne.mockResolvedValue(mockProduct.categoryId);
        const product = await ProductService.updateProduct(mockProduct);
        expect(product).toEqual(mockProduct)
        expect(ProductModel.update).toHaveBeenCalledTimes(1);
        expect(CategoryModel.findOne).toHaveBeenCalledTimes(1);
        expect(ProductModel.findOne).toHaveBeenCalledTimes(2);

    });

    test('Should throw error if update product fails', async () => {
        ProductModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.updateProduct({
                userId: 1,
                productId: 1,
                categoryId: 1,
                name: "bag",
            })
        ).rejects.toThrow('Db error')
    })
});

describe('get-product', () => {
    const mockProduct = {
        userId: 1,
        id: 1,
        name: "shoes",
        slug: "shoe.com",
        isActive: true,
        categoryId: 1,
        description: "this is a shoe",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should get product', async () => {
        ProductModel.findOne.mockResolvedValue(mockProduct);
        const product = await ProductService.getProduct(mockProduct);
        expect(product).toEqual(mockProduct);
        expect(ProductModel.findOne).toHaveBeenCalledTimes(1);

    });

    test('Should throw error if get product fails', async () => {
        ProductModel.findOne.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.getProduct(mockProduct)
        ).rejects.toThrow('Db error')
    })
});

describe('delete-product', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should delete product', async () => {
        const mockProduct = {
            productId: 1,
            userId: 1,
        };
        ProductModel.update.mockResolvedValue([1]);
        ProductModel.findOne.mockResolvedValue(mockProduct);
        const product = await ProductService.deleteProduct(mockProduct);
        expect(product).toEqual(mockProduct);
        expect(ProductModel.update).toHaveBeenCalledTimes(1);
        expect(ProductModel.findOne).toHaveBeenCalledTimes(2);
    });

    test('Should throw error if delete product fails', async () => {
        ProductModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.deleteProduct({
                productId: 1,
                userId: 1,
            })
        ).rejects.toThrow('Db error')
    })
});

//PRODUCT-VARIANTS
describe('add-product-variant', () => {
    const mockProductVariant = {
        id: 1,
        productId: 1,
        price: 500,
        attributes: {
            color: "black",
            size: "M",
            storage: "256GB"
        },
        variantStatus: 1,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should add product variant', async () => {
        ProductVariantModel.create.mockResolvedValue(mockProductVariant);
        ProductModel.findOne.mockResolvedValue(mockProductVariant.productId);
        const productVariant = await ProductService.addProductVariant(mockProductVariant);
        expect(productVariant).toEqual(mockProductVariant)
        expect(ProductVariantModel.create).toHaveBeenCalledTimes(1);
        expect(ProductModel.findOne).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if add product variant fails', async () => {
        ProductVariantModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.addProductVariant(mockProductVariant)
        ).rejects.toThrow('Db error')
    })
});

describe('update-product-variant', () => {
    const mockProductVariant = {
        userId: 1,
        variantId: 1,
        price: 700,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should update product variant', async () => {
        ProductVariantModel.update.mockResolvedValue([1]);
        ProductVariantModel.findOne.mockResolvedValue(mockProductVariant);
        const productVariant = await ProductService.updateProductVariant(mockProductVariant);
        expect(productVariant).toEqual(mockProductVariant)
        expect(ProductVariantModel.update).toHaveBeenCalledTimes(1);
        expect(ProductVariantModel.findOne).toHaveBeenCalledTimes(2);
    });

    test('Should throw error if update product variant fails', async () => {
        ProductVariantModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.updateProductVariant({
                userId: 1,
                variantId: 1,
                price: 700,
            })
        ).rejects.toThrow('Db error')
    })
});

describe('update-product-variant-status', () => {
    const mockProductVariant = {
        userId: 1,
        variantId: 1,
        variantStatus: 0,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should update product variant status ', async () => {
        ProductVariantModel.update.mockResolvedValue([1]);
        ProductVariantModel.findOne.mockResolvedValue(mockProductVariant);
        const productVariant = await ProductService.updateProductVariantStatus(mockProductVariant);
        expect(productVariant).toEqual(mockProductVariant)
        expect(ProductVariantModel.update).toHaveBeenCalledTimes(1);
        expect(ProductVariantModel.findOne).toHaveBeenCalledTimes(2);
    });

    test('Should throw error if product variant status fails', async () => {
        ProductVariantModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.updateProductVariantStatus({
                userId: 1,
                variantId: 1,
                variantStatus: 0,
            })
        ).rejects.toThrow('Db error')
    })
});


describe('get-product-variant', () => {
    const mockProductVariant = {
        id: 1,
        productId: 1,
        price: 500,
        attributes: {
            color: "black",
            size: "M",
            storage: "256GB"
        },
        variantStatus: 1,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should get product variant ', async () => {
        ProductVariantModel.findOne.mockResolvedValue(mockProductVariant);
        const productVariant = await ProductService.getProductVariant(mockProductVariant);
        expect(productVariant).toEqual(mockProductVariant);
        expect(ProductVariantModel.findOne).toHaveBeenCalledTimes(1);

    });

    test('Should throw error if get product variant fails', async () => {
        ProductVariantModel.findOne.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.getProductVariant(mockProductVariant)
        ).rejects.toThrow('Db error')
    })
});
//PRODUCT-IMAGE

describe('add-product-image', () => {
    const mockProductImage = {
        id: 1,
        productId: 1,
        variantId: 1,
        url: 'img.jpegkdswkd',
        isPrimary: false,
        order: 2
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should add product image', async () => {
        ProductImageModel.create.mockResolvedValue(mockProductImage);
        ProductModel.findOne.mockResolvedValue(mockProductImage.productId);
        const productImage = await ProductService.addImage(mockProductImage);
        expect(productImage).toEqual(mockProductImage)
        expect(ProductImageModel.create).toHaveBeenCalledTimes(1);
        expect(ProductModel.findOne).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if add product image fails', async () => {
        ProductImageModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.addImage(mockProductImage)
        ).rejects.toThrow('Db error')
    })
});

//PRODUCT-STOCK
describe('add-product-stock', () => {
    const mockProductStock = {
        id: 1,
        productVariantId: 1,
        quantity: 500,
        reserved: 0,
        lowStockThreshold: 5,
        status: 1
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should add product stock', async () => {
        ProductStockModel.create.mockResolvedValue(mockProductStock);
        ProductVariantModel.findOne.mockResolvedValue(mockProductStock.productVariantId);
        const productStock = await ProductService.addProductStock(mockProductStock);
        expect(productStock).toEqual(mockProductStock)
        expect(ProductStockModel.create).toHaveBeenCalledTimes(1);
        expect(ProductVariantModel.findOne).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if add product stock fails', async () => {
        ProductStockModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.addProductStock(mockProductStock)
        ).rejects.toThrow('Db error')
    })
});

describe('update-product-stock', () => {
    const mockProductStock = {
        productStockId: 1,
        quantity: 400,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should update product stock', async () => {
        ProductStockModel.update.mockResolvedValue([1]);
        ProductStockModel.findOne.mockResolvedValue(mockProductStock);
        const productStock = await ProductService.updateProductStock(mockProductStock);
        expect(productStock).toEqual(mockProductStock)
        expect(ProductStockModel.update).toHaveBeenCalledTimes(1);
        expect(ProductStockModel.findOne).toHaveBeenCalledTimes(2);
    });

    test('Should throw error if update product stock fails', async () => {
        ProductStockModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            ProductService.updateProductStock({
                productStockId: 1,
                quantity: 400
            }
            )
        ).rejects.toThrow('Db error')
    })
});

// describe('get-product-stock', () => {
//     const mockProductStock = {
//         id: 1,
//         productId: 1,
//         productVariantId: 1,
//         quantity: 500,
//         reserved: 0,
//         lowStockThreshold: 5,
//         status: 1
//     };

//     beforeEach(() => {
//         jest.clearAllMocks();
//     });

//     test('Should get product stock ', async () => {
//         ProductStockModel.findOne.mockResolvedValue(mockProductStock);
//         const productStock = await ProductService.getProductStockByVariant({ productId: 1 });
//         expect(productStock).toEqual(mockProductStock);
//         expect(ProductStockModel.findOne).toHaveBeenCalledTimes(1);

//     });

//     test('Should throw error if get product stock fails', async () => {
//         ProductStockModel.findOne.mockRejectedValue(new Error('Db error'));
//         await expect(
//             ProductService.getProductStockByVariant({ productId: 1 })
//         ).rejects.toThrow('Db error')
//     })
// });