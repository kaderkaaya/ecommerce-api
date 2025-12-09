import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve('../.env') });
import initializeDatabase from "./config/config.js";
import express from "express";
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
const startServer = async () => {
    try {
       console.log("Starting server...");
  return await initializeDatabase(); 
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

startServer();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});