import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import UserStatus from "../../modules/panel/constants/const.js";
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserStatus.USER_STATUS.ACTIVE,
    },
}, {
    timestamps: true,
});

export default User;