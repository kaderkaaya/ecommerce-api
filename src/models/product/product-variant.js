import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";

const ProductVariant = sequelize.define('ProductVariant', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    attributes: {
        type: DataTypes.JSON,
        allowNull: true
    },

}, {
    tableName: "product_variants",
    timestamps: true
});

export default ProductVariant;
