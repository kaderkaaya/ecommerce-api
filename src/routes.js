import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import UserRouter  from '../src/modules/panel/routes/user.js';

app.use('/user',UserRouter);