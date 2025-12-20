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
        const category = await CategoryData.getCategoryById({ categoryId: product.categoryId });
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
        const product = await ProductData.getProductById({ productId });
        return product;
    }

    static async getProducts({ page, limit, categoryId, searchName }) {
        const products = await ProductData.getProducts({ page, limit, searchName, categoryId });
        return products;
    }

    static async getProductsForUsers({ page, limit, categoryId, searchName }) {
        const products = await ProductData.getProductsForUsers({ page, limit, searchName, categoryId });
        return products;
    }

    static async addProductVariant({ productId, price, attributes }) {
        const product = await ProductData.getProductById({ productId });
        if (!product) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const productVariant = await ProductData.addProductVariant({ productId, price, attributes });
        return productVariant;
    }

    static async updateProductVariant({ variantId, userId, productId, price, attributes }) {
        const productVariant = await ProductData.getProductVariantById({ variantId });
        if (!productVariant) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const updatedProductVariant = await ProductData.updateProductVariant({ variantId, productId, price, attributes });
        return updatedProductVariant;
    }

    static async updateProductVariantStatus({ variantStatus, variantId }) {
        const productVariant = await ProductData.getProductVariantById({ variantId });
        if (!productVariant) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const updatedProductVariant = await ProductData.updateProductVariantStatus({ variantStatus, variantId });
        return updatedProductVariant;
    }

    static async getProductVariant({ variantId }) {
        const productVariant = await ProductData.getProductVariantById({ variantId });
        return productVariant;
    }

    static async addProductStock({ userId, productVariantId, quantity, reserved, lowStockThreshold }) {
        const variant = await ProductData.getVariantById({ productVariantId });
        if (!variant) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const productStock = await ProductData.addProductStock({ productVariantId, quantity, reserved, lowStockThreshold });
        return productStock;
    }

    static async updateProductStock({ stockId, userId, productVariantId, quantity, reserved, lowStockThreshold }) {
        const productStock = await ProductData.getProductstockById({ stockId });
        if (!productStock) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const updatedProductStock = await ProductData.updateProductStock({ stockId, userId, productVariantId, quantity, reserved, lowStockThreshold });
        return updatedProductStock;
    }

    static async updateProductStockStatus({ stockId, status }) {
        const productStock = await ProductData.getProductstockById({ stockId });
        if (!productStock) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const updatedProductStock = await ProductData.updateProductStockStatus({ stockId, status });
        return updatedProductStock;
    }

    static async addImage({ imagePath, productId, variantId }) {
        const product = await ProductData.getProductById({ productId });
        if (!product) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode);
        const img = await ProductData.addImage({ imagePath, productId, variantId });
        return img;
    }
}

export default ProductService;