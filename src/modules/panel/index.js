import sequelize from "../../config/config.js";
import express from "express";
import PanelUserRouter from '../panel/routes/user.js';
import PanelRoleRouter from '../panel/routes/role.js';
import swaggerUi from 'swagger-ui-express';
import swagger from "./config/swagger.js";
const PANEL_PORT = process.env.PANEL_PORT;
import helmet from "helmet";
import '../../models/panel-user/associates.js';

const app = express();
app.use(express.json());
app.use(helmet());
app.use('/api-docs', swaggerUi.serve,
    swaggerUi.setup(swagger, {
        persistAuthorization: true,
    }));

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