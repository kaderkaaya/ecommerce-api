import UserModel from './user.js';
import TokenModel from './token.js';

UserModel.hasMany(TokenModel, {
    foreignKey: 'userId',
    as: 'tokens'
});

TokenModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});
