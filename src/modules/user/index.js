import sequelize from "../../config/config.js";
import express from "express";
import UserRouter from '../../modules/user/routes/user.js';
const USER_PORT = process.env.USER_PORT;
const app = express();
app.use(express.json());

app.use('/user', UserRouter);
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
app.listen(USER_PORT, () => {
    console.log(`Server is running on port ${USER_PORT}`);
});