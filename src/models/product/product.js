import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
}, {
    tableName: "products",
    timestamps: true
});

export default Product;
