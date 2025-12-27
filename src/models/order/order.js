import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import ORDER_STATUS from '../../modules/order/constant/const.js';

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    status: {
        type: DataTypes.INTEGER,
        defaultValue: ORDER_STATUS.ORDER_STATUS.PENDING,
    },

    paymentMethod: {
        type: DataTypes.STRING
    },

    addressSnapshot: {
        type: DataTypes.JSON
    }

}, {
    tableName: "orders",
    timestamps: true
});
export default Order;