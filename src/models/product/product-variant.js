import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import VARIANT_STATUS from '../../modules/product/constant/const.js';

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
    variantStatus: {
        type: DataTypes.INTEGER,
        defaultValue: VARIANT_STATUS.VARIANT_STATUS.ACTIVE,
    }

}, {
    tableName: "product_variants",
    timestamps: true
});

export default ProductVariant;
