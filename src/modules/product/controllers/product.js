import ResponseHelper from '../../../utils/response-handler.js';
import ProductService from '../services/product.js';
import messages from '../constant/messages.js';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from "url";

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
            const { page, limit, categoryId, searchName, minPrice, maxPrice } = req.query;
            const products = await ProductService.getProducts({ userId, page, limit, categoryId, searchName, minPrice, maxPrice });
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

    static async getProductsForUsers(req, res) {
        try {
            const userId = req.user.id;
            const { page, limit, categoryId, searchName, minPrice, maxPrice } = req.query;
            const products = await ProductService.getProductsForUsers({ userId, page, limit, categoryId, searchName, minPrice, maxPrice });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_FETCH_SUCCESS, data: { products } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async addProductVariant(req, res) {
        try {
            const userId = req.user.id;
            const { productId, price, attributes } = req.body;
            const variant = await ProductService.addProductVariant({ userId, productId, price, attributes });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_CREATED_SUCCESS, data: { variant } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async updateProductVariant(req, res) {
        try {
            const userId = req.user.id;
            const { variantId, productId, price, attributes } = req.body;
            const variant = await ProductService.updateProductVariant({ variantId, userId, productId, price, attributes });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_UPDATE_SUCCESS, data: { variant } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async updateProductVariantStatus(req, res) {
        try {
            const userId = req.user.id;
            const { variantStatus, variantId } = req.body;
            const variant = await ProductService.updateProductVariantStatus({ variantStatus, userId, variantId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_UPDATE_SUCCESS, data: { variant } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async getProductVariant(req, res) {
        try {
            const userId = req.user.id;
            const { variantId } = req.query;
            const variant = await ProductService.getProductVariant({ variantId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_FETCH_SUCCESS, data: { variant } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }

    }

    static async addProductStock(req, res) {
        try {
            const userId = req.user.id;
            const { productVariantId, quantity, reserved, lowStockThreshold } = req.body;
            const stock = await ProductService.addProductStock({ userId, productVariantId, quantity, reserved, lowStockThreshold });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_CREATED_SUCCESS, data: { stock } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async updateProductStock(req, res) {
        try {
            const userId = req.user.id;
            const { stockId, productVariantId, quantity, reserved, lowStockThreshold } = req.body;
            const stock = await ProductService.updateProductStock({ stockId, userId, productVariantId, quantity, reserved, lowStockThreshold });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_UPDATE_SUCCESS, data: { stock } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async updateProductStockStatus(req, res) {
        try {
            const userId = req.user.id;
            const { stockId, status } = req.body;
            const stock = await ProductService.updateProductStockStatus({ stockId, status });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_UPDATE_SUCCESS, data: { stock } });

        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async addImage(req, res) {
        try {
            const uploadDir = path.join(
                path.dirname(fileURLToPath(import.meta.url)),
                "../upload/uploads"
            );

            if (!fs.existsSync(uploadDir)) {
                fs.mkdir(uploadDir, { recursive: true });
            }
            const storage = multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, uploadDir);
                },
                filename: function (req, file, cb) {
                    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
                }
            });
            const upload = multer({
                storage: storage,
                limits: { fileSize: 1000000 }
            });
            const singleUpload = upload.single('imageUrl');
            singleUpload(req, res, async (err) => {
                if (err) return res.status(400).send({ error: err.message });
                const userId = req.user.id;
                const { productId, variantId } = req.body;
                const imagePath = req.file ? `../upload/uploads/${req.file.filename}` : null;
                const product = await ProductService.addImage({ userId, imagePath, productId, variantId });
                return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_UPDATE_SUCCESS, data: { product } });
            });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });
        }
    }

    static async getProductVariants(req, res) {
        try {
            const { productId } = req.query;
            const product = await ProductService.getProductVariants({ productId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_FETCH_SUCCESS, data: { product } });
        } catch (error) {
            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });

        }
    }

    static async getProductStockByVariant(req, res) {
        try {
            const { productId } = req.query;
            const product = await ProductService.getProductStockByVariant({ productId });
            return ResponseHelper.success({ res, statusCode: 201, message: messages.PRODUCT_FETCH_SUCCESS, data: { product } });
        } catch (error) {
            console.log('eror', error);

            return ResponseHelper.sendError({ res, statusCode: error.statusCode || 500, message: error.message });

        }
    }

}
export default ProductController;