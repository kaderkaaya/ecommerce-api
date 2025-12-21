import { DataTypes } from "sequelize";
import sequelize from "../../config/config.js";

const PanelUsersToken = sequelize.define('PanelUsersToken', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },

}, {
    tableName: "tokens",
    timestamps: true,
});

export default PanelUsersToken;