import ProductModel from '../../../models/product/product.js';

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

    static async getCategories({ page, limit }) {
        const offset = Number((page - 1) * limit);
        const numLim = Number(limit);
        return await ProductModel.findAll({
            where: { isActive: true },
            offset,
            numLim
        })
    }


}
export default ProductData;