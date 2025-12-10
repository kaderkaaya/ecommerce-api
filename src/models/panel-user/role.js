import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";
import RoleStatus from "../../modules/panel/constants/const.js";

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    authEndpoints: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
    },
    roleStatus: {
        type: DataTypes.INTEGER,
        defaultValue: RoleStatus.ROLE_STATUS.ACTIVE,
    },
}, {
    timestamps: true,
});

export default Role;