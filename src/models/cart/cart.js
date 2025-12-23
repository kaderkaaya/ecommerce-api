import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import CART_STATUS from '../../modules/cart/constant/const.js';

const Cart = sequelize.define("Cart", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    guestId: {
        type: DataTypes.STRING,
        allowNull: true
    },

    status: {
        type: DataTypes.INTEGER,
        defaultValue: CART_STATUS.CART_STATUS.ACTIVE,
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    }

}, {
    tableName: "carts",
    timestamps: true
});

export default Cart;