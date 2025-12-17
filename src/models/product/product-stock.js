import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import STOCK_STATUS from '../../modules/product/constant/const.js';

const Stock = sequelize.define("Stock", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    productVariantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    reserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    lowStockThreshold: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },

    status: {
        type: DataTypes.INTEGER,
        defaultValue: STOCK_STATUS.STOCK_STATUS.IN_STOCK,
    }

}, {
    tableName: "stocks",
    timestamps: true
});

export default Stock;
