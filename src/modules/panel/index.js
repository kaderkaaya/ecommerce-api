import sequelize from "../../config/config.js";
import express from "express";
import PanelUserRouter from '../panel/routes/user.js';
import PanelRoleRouter from '../panel/routes/role.js';
const PANEL_PORT = process.env.PANEL_PORT;

const app = express();
app.use(express.json());
app.use('/user', PanelUserRouter);
app.use('/role', PanelRoleRouter);
const startServer = async () => {
    try {
        console.log("Starting server...");
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
app.listen(PANEL_PORT, () => {
    console.log(`Server is running on port ${PANEL_PORT}`);
});