import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  productVariantId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  priceSnapshot: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: "cart_items",
  timestamps: true
});
export default CartItem;
