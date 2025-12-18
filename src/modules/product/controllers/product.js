import ResponseHelper from '../../../utils/response-handler.js';
import ProductService from '../services/product.js';
import messages from '../constant/messages.js';
class ProductController {
    static async createProduct(req, res) {
        try {
            const userId = req.user.id;
            const { name, description, isActive, slug, categoryId } = req.body;
            const product = await ProductService.createProduct({ userId, name, description, isActive, slug, categoryId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_CREATED_SUCCESS, data: { product } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async updateProduct(req, res) {
        try {
            const userId = req.user.id;
            const { productId, name, description, isActive, slug, categoryId } = req.body;
            const product = await ProductService.updateProduct({ productId, userId, name, description, isActive, slug, categoryId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_UPDATE_SUCCESS, data: { product } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async getProduct(req, res) {
        try {
            const userId = req.user.id;
            const { productId } = req.query;
            const product = await ProductService.getProduct({ productId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_FETCH_SUCCESS, data: { product } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async getProducts(req, res) {
        try {
            const userId = req.user.id;
            const { page, limit, categoryId, searchName } = req.query;
            const products = await ProductService.getProducts({ userId, page, limit, categoryId, searchName });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_FETCH_SUCCESS, data: { products } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async deleteProduct(req, res) {
        try {
            const userId = req.user.id;
            const { productId } = req.body;
            const product = await ProductService.deleteProduct({ userId, productId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_DELETED_SUCCESS, data: { product } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }


}
export default ProductController;