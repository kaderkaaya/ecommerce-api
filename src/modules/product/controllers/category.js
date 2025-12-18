import ResponseHelper from '../../../utils/response-handler.js';
import CategoryService from '../services/category.js';
import messages from '../constant/messages.js';
class CategoryController {
    static async createCategory(req, res) {
        try {
            const userId = req.user.id;
            const { name, description, isActive, slug } = req.body;
            const category = await CategoryService.createCategory({ userId, name, description, isActive, slug });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.CATEGORY_CREATED_SUCCESS, data: { category } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async updateCategory(req, res) {
        try {
            const userId = req.user.id;
            const { categoryId, name, description, isActive, slug } = req.body;
            const category = await CategoryService.updateCategory({ categoryId, userId, name, description, isActive, slug });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.CATEGORY_UPDATE_SUCCESS, data: { category } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async getCategory(req, res) {
        try {
            const userId = req.user.id;
            const { categoryId } = req.query;
            const category = await CategoryService.getCategory({ categoryId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.CATEGORY_FETCH_SUCCESS, data: { category } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async getCategories(req, res) {
        try {
            const userId = req.user.id;
            const { page, limit } = req.query;
            const categories = await CategoryService.getCategories({ userId, page, limit });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.CATEGORY_FETCH_SUCCESS, data: { categories } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async deleteCategory(req, res) {
        try {
            const userId = req.user.id;
            const { categoryId } = req.body;
            const category = await CategoryService.deleteCategory({ userId, categoryId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.CATEGORY_DELETED_SUCCESS, data: { category } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }


}
export default CategoryController;