import ProductData from '../data/product.js';
import Errors from '../constant/error.js';
import ErrorHelper from '../../../utils/error-helper.js';
import CategoryData from '../data/category.js';

class ProductService {
    static async createProduct({ name, description, isActive, slug, categoryId }) {
        const category = await CategoryData.getCategoryById({ categoryId });
        if (!category) throw new ErrorHelper(Errors.CATEGORY_ERROR.message, Errors.CATEGORY_ERROR.statusCode);
        const product = await ProductData.createProduct({ name, description, isActive, slug, categoryId });
        return product;
    }

    static async updateProduct({ userId, productId, name, description, isActive, slug, categoryId }) {
        const product = await ProductData.getProductById({ productId });
        if (!product) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const category = await CategoryData.getCategoryById({ categoryId });
        if (!category) throw new ErrorHelper(Errors.CATEGORY_ERROR.message, Errors.CATEGORY_ERROR.statusCode);
        const updatedProduct = await ProductData.updateProduct({ userId, productId, name, description, isActive, slug, categoryId });
        return updatedProduct;
    }

    static async deleteProduct({ productId }) {
        const product = await ProductData.getProductById({ productId });
        if (!product) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const deletedProduct = await ProductData.deleteProduct({ productId });
        return deletedProduct;
    }

    static async getProduct({ productId }) {
        const Product = await ProductData.getProductById({ productId });
        return Product;
    }

    static async getProducts({ page, limit, categoryId, searchName }) {
        const products = await ProductData.getProducts({ page, limit, searchName, categoryId });
        return products;
    }
}

export default ProductService;