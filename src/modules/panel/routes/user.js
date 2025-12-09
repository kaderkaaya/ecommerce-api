import express from "express";
const router = express.Router();
import UserController from '../controllers/user.js';

router.post('/createUser',UserController.createUser);
export default router;