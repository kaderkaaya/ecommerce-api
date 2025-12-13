// import dotenv from "dotenv";
// import path from "path";
// dotenv.config({ path: path.resolve('../.env') });
// import sequelize from "./config/config.js";
// import express from "express";
// import routers from './routes.js';

// const PORT = process.env.PORT;
// const app = express();
// app.use(express.json());
// routers(app);
// const startServer = async () => {
//     try {
//         console.log("Starting server...");
//         await sequelize.authenticate();
//         await sequelize.sync({ alter: true });
//     } catch (error) {
//         console.error("Failed to start server:", error);
//     }
// };

// startServer();
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });