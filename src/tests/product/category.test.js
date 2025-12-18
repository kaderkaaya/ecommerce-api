import { beforeEach, describe, expect, jest, test } from '@jest/globals';

jest.unstable_mockModule('../../config/config.js', () => ({
    default: {
        define: jest.fn()
    }
}));

jest.unstable_mockModule('../../models/product/category.js', () => ({
    default: {
        create: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));
const { default: CategoryService } = await import(
    '../../modules/product/services/category.js'
);

const { default: CategoryModel } = await import(
    '../../models/product/category.js'
);

describe('create-category', () => {
    const mockCategory = {
        id: 1,
        name: "cat1",
        description: "this is a category",
        isActive: true,
        slug: "cat.com"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should create category', async () => {
        CategoryModel.create.mockResolvedValue(mockCategory);
        const result = await CategoryService.createCategory(mockCategory);
        expect(result).toEqual(mockCategory)
        expect(CategoryModel.create).toHaveBeenCalledTimes(1);
    });

    test('Should throw error if create category fails', async () => {
        CategoryModel.create.mockRejectedValue(new Error('Db error'));
        await expect(
            CategoryService.createCategory(mockCategory)
        ).rejects.toThrow('Db error')
    })
});

describe('update-category', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should update category', async () => {
        const mockCategory = {
            categoryId: 1,
            userId: 1,
            name: 'category',
        };
        CategoryModel.update.mockResolvedValue([1]);
        CategoryModel.findOne.mockResolvedValue(mockCategory);
        const result = await CategoryService.updateCategory(mockCategory);
        expect(result).toEqual(mockCategory);
        expect(CategoryModel.update).toHaveBeenCalledTimes(1);
        expect(CategoryModel.findOne).toHaveBeenCalledTimes(2);
    });

    test('Should throw error if delete category fails', async () => {
        CategoryModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            CategoryService.updateCategory({
                userId: 1,
                categoryId: 1,
                name: 'category'
            })
        ).rejects.toThrow('Db error')
    })
});

describe('delete-category', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should delete category', async () => {
        const mockCategory = {
            categoryId: 1,
            userId: 1,
        };
        CategoryModel.update.mockResolvedValue([1]);
        CategoryModel.findOne.mockResolvedValue(mockCategory);
        const result = await CategoryService.deleteCategory(mockCategory);
        expect(result).toEqual(mockCategory);
        expect(CategoryModel.update).toHaveBeenCalledTimes(1);
        expect(CategoryModel.findOne).toHaveBeenCalledTimes(2);
    });

    test('Should throw error if delete category fails', async () => {
        CategoryModel.update.mockRejectedValue(new Error('Db error'));
        await expect(
            CategoryService.deleteCategory({
                userId: 1,
                categoryId: 1,
            })
        ).rejects.toThrow('Db error')
    })
})