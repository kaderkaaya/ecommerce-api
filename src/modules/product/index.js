import sequelize from "../../config/config.js";
import express from "express";
import CategoryRouter from '../product/routes/category.js';
import swaggerUi from 'swagger-ui-express';
import swagger from "./config/swagger.js";
const PRODUCT_PORT = process.env.PRODUCT_PORT;

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve,
    swaggerUi.setup(swagger, {
        persistAuthorization: true,
    }));

app.use('/category', CategoryRouter);

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
app.listen(PRODUCT_PORT, () => {
    console.log(`Server is running on port ${PRODUCT_PORT}`);
});