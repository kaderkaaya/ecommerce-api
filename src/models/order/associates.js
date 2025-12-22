import OrderModel from './order.js';
import OrderItem from './order-item.js';

OrderModel.hasMany(OrderItem, {
    foreignKey: 'orderId',
    as: 'order-items'
});

OrderItem.belongsTo(OrderModel, {
    foreignKey: 'orderId',
    as: 'order'
});
