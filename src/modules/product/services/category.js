import CategoryData from '../data/category.js';
import Errors from '../constant/error.js';
import ErrorHelper from '../../../utils/error-helper.js';

class CategoryService {
    static async createCategory({ userId, name, description, isActive, slug }) {
        const category = await CategoryData.createCategory({ userId, name, description, isActive, slug });
        return category;
    }

    static async updateCategory({ userId, categoryId, name, description, isActive, slug }) {
        const updatedCategory = await CategoryData.updateCategory({ userId, categoryId, name, description, isActive, slug });
        return updatedCategory;
    }

    static async deleteCategory({ userId, categoryId }) {
        const category = await CategoryData.getRoleById({ categoryId });
        if (!category) {
            throw new ErrorHelper()
        }
        const deletedCategory = await CategoryData.deleteCategory({ userId, categoryId });
        return deletedCategory;
    }

    static async getCategories({ page, limit }) {
        const categories = await CategoryData.getCategories({ page, limit });
        return categories;
    }
}

export default CategoryService;