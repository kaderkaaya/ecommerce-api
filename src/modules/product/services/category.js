import CategoryData from '../data/category.js';
import Errors from '../constant/error.js';
import ErrorHelper from '../../../utils/error-helper.js';

class CategoryService {
    static async createCategory({ name, description, isActive, slug }) {
        const category = await CategoryData.createCategory({ name, description, isActive, slug });
        return category;
    }

    static async updateCategory({ userId, categoryId, name, description, isActive, slug }) {
        const category = await CategoryData.getCategoryById({ categoryId });
        if (!category) throw new ErrorHelper(Errors.CATEGORY_ERROR.message, Errors.CATEGORY_ERROR.statusCode);
        const updatedCategory = await CategoryData.updateCategory({ userId, categoryId, name, description, isActive, slug });
        return updatedCategory;
    }

    static async deleteCategory({ categoryId }) {
        const category = await CategoryData.getCategoryById({ categoryId });
        if (!category) throw new ErrorHelper(Errors.CATEGORY_ERROR.message, Errors.CATEGORY_ERROR.statusCode);
        const deletedCategory = await CategoryData.deleteCategory({ categoryId });
        return deletedCategory;
    }

    static async getCategory({ categoryId }) {
        const category = await CategoryData.getCategoryById({ categoryId });
        return category;
    }

    static async getCategories({ page, limit }) {
        const categories = await CategoryData.getCategories({ page, limit });
        return categories;
    }
    getCategory
}

export default CategoryService;