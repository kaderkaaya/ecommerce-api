import UserModel from './user.js';
import RoleModel from './role.js';
import TokenModel from './token.js';

UserModel.hasMany(RoleModel, {
    foreignKey: 'userId',
    as: 'roles'
});

RoleModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});

UserModel.hasMany(TokenModel, {
    foreignKey: 'userId',
    as: 'tokens'
});

TokenModel.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'user'
});
