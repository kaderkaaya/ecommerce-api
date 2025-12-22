import CartModel from './cart.js';
import CartItem from './cart-item.js';

CartModel.hasMany(CartItem, {
    foreignKey: 'cartId',
    as: 'cart-items'
});

CartItem.belongsTo(CartModel, {
    foreignKey: 'cartId',
    as: 'cart'
});
