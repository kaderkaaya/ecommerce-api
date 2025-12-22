import sequelize from "../../config/config.js";
import express from "express";
import CartRouter from '../cart/routes/cart.js';
import helmet from "helmet";
import '../../models/cart/associates.js';

const CART_PORT = process.env.CART_PORT;

const app = express();
app.use(express.json());
app.use(helmet());

app.use('/cart', CartRouter);

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
app.listen(CART_PORT, () => {
    console.log(`Server is running on port ${CART_PORT}`);
});