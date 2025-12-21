import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import UserStatus from "../../modules/panel/constants/const.js";
const PanelUser = sequelize.define('PanelUser', {
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
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    verifyPhone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    verifyCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserStatus.USER_STATUS.ACTIVE,
    },
}, {
    tableName: "panel_users",
    timestamps: true,
});

export default PanelUser;