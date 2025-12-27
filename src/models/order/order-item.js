import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";

const OrderItem = sequelize.define("OrderItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  orderId: {
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
  tableName: "order_items",
  timestamps: true
});

export default OrderItem;