import CategoryModel from '../../../models/product/category.js';

class CategoryData {
    static async createCategory({ name, description, isActive, slug }) {
        const category = await CategoryModel.create({
            name,
            description,
            isActive,
            slug
        })
        return category;
    }

    static async updateCategory({ categoryId, name, description, isActive, slug }) {
        const updatedData = {};
        if (name !== undefined) updatedData.name = name;
        if (description !== undefined) updatedData.description = description;
        if (isActive !== undefined) updatedData.isActive = isActive;
        if (slug !== undefined) updatedData.slug = slug;

        await CategoryModel.update(
            updatedData,
            { where: { id: categoryId } }
        );
        const category = await this.getCategoryById({ categoryId });
        return category;

    }

    static async getCategoryById({ categoryId }) {
        const category = await CategoryModel.findOne({
            where: { id: categoryId }
        })
        return category;
    }

    static async deleteCategory({ categoryId }) {
        await CategoryModel.update(
            { isActive: false },
            { where: { id: categoryId } }
        )
        const category = await this.getCategoryById({ categoryId });
        return category;
    }

    static async getCategories({ page, limit }) {
        const offset = Number((page - 1) * limit);
        const numLim = Number(limit);
        return await CategoryModel.findAll({
            where: { isActive: true },
            offset,
            numLim
        })
    }


}
export default CategoryData;