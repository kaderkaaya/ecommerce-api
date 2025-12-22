import sequelize from "../../config/config.js";
import express from "express";
import OrderRouter from '../order/routes/order.js';
import helmet from "helmet";
import '../../models/order/associates.js';
const ORDER_PORT = process.env.ORDER_PORT;

const app = express();
app.use(express.json());
app.use(helmet());

app.use('/order', OrderRouter);

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
app.listen(ORDER_PORT, () => {
    console.log(`Server is running on port ${ORDER_PORT}`);
});