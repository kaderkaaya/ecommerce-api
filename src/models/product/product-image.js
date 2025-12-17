import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";

const ProductImage = sequelize.define('ProductImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    variantId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    url: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isPrimary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    order: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

}, {
    tableName: "product_images",
    timestamps: true
});

export default ProductImage;
