import ProductModel from '../../../models/product/product.js';
import { Op } from 'sequelize';
import ProductVariantModel from '../../../models/product/product-variant.js';
import ProductStockModel from '../../../models/product/product-stock.js';
import ProductImageModel from '../../../models/product/product-image.js';

class ProductData {
    static async createProduct({ name, description, isActive, slug, categoryId }) {
        const product = await ProductModel.create({
            name,
            description,
            isActive,
            slug,
            categoryId
        })
        return product;
    }

    static async updateProduct({ productId, name, description, isActive, slug, categoryId }) {
        const updatedData = {};
        if (name !== undefined) updatedData.name = name;
        if (description !== undefined) updatedData.description = description;
        if (isActive !== undefined) updatedData.isActive = isActive;
        if (slug !== undefined) updatedData.slug = slug;
        if (categoryId !== undefined) updatedData.categoryId = categoryId;


        await ProductModel.update(
            updatedData,
            { where: { id: productId } }
        );
        const product = await this.getProductById({ productId });
        return product;

    }

    static async getProductById({ productId }) {
        const product = await ProductModel.findOne({
            where: { id: productId }
        })
        return product;
    }

    static async deleteProduct({ productId }) {
        await ProductModel.update(
            { isActive: false },
            { where: { id: productId } }
        )
        const product = await this.getProductById({ productId });
        return product;
    }

    static async getProducts({ page, limit, searchName, categoryId }) {
        const offset = Number((page - 1) * limit);
        const numLim = Number(limit);
        const where = {};
        if (searchName) {
            where.name = { [Op.like]: `%${searchName}%` }
        }
        if (categoryId) {
            where.categoryId = categoryId
        }
        return await ProductModel.findAll({
            where,
            offset,
            numLim
        })
    }

    static async getProductsForUsers({ page, limit, searchName, categoryId }) {
        const offset = Number((page - 1) * limit);
        const numLim = Number(limit);
        const where = {
            isActive: true
        };
        if (searchName) {
            where.name = { [Op.like]: `%${searchName}%` }
        }
        if (categoryId) {
            where.categoryId = categoryId
        }
        return await ProductModel.findAll({
            where,
            offset,
            numLim
        })
    }

    static async addProductVariant({ productId, price, attributes }) {
        return await ProductVariantModel.create({
            productId,
            price,
            attributes,
        })
    }

    static async getProductVariantById({ variantId }) {
        return await ProductVariantModel.findOne({
            where: { id: variantId }
        })
    }

    static async updateProductVariant({ variantId, productId, price, attributes }) {
        const updatedData = {};
        if (productId !== undefined) updatedData.productId = productId;
        if (price !== undefined) updatedData.price = price;
        if (attributes !== undefined) updatedData.attributes = attributes;

        await ProductVariantModel.update(
            updatedData,
            { where: { id: variantId } }
        );
        const variant = await this.getProductVariantById({ variantId });
        return variant;
    }

    static async updateProductVariantStatus({ variantStatus, variantId }) {
        const updatedData = {};
        if (variantStatus !== undefined) updatedData.variantStatus = variantStatus;

        await ProductVariantModel.update(
            updatedData,
            { where: { id: variantId } }
        );
        const variant = await this.getProductVariantById({ variantId });
        return variant;
    }

    static async getVariantById({ productVariantId }) {
        return await ProductStockModel.findOne({
            where: { id: productVariantId }
        })
    }

    static async addProductStock({ productVariantId, quantity, reserved, lowStockThreshold }) {
        return await ProductStockModel.create({
            productVariantId,
            quantity,
            reserved,
            lowStockThreshold
        })
    }

    static async getProductstockById({ stockId }) {
        return await ProductStockModel.findOne({
            where: { id: stockId }
        })
    }

    static async updateProductStock({ stockId, productVariantId, quantity, reserved, lowStockThreshold }) {
        const updatedData = {};
        if (productVariantId !== undefined) updatedData.productVariantId = productVariantId;
        if (quantity !== undefined) updatedData.quantity = quantity;
        if (reserved !== undefined) updatedData.reserved = reserved;
        if (lowStockThreshold !== undefined) updatedData.lowStockThreshold = lowStockThreshold;


        await ProductStockModel.update(
            updatedData,
            { where: { id: stockId } }
        );
        const stock = await this.getProductstockById({ stockId });
        return stock;
    }

    static async updateProductStockStatus({ stockId, status }){
         const updatedData = {};
        if (status !== undefined) updatedData.status = status;

        await ProductVariantModel.update(
            updatedData,
            { where: { id: stockId } }
        );
        const stock = await this.getProductstockById({ stockId });
        return stock;
    }

}
export default ProductData;