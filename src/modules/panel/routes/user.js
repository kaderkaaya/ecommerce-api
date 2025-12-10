import express from "express";
const router = express.Router();
import UserController from '../controllers/user.js';
import UserSchema from '../schemas/user.js';
import SchemaHelper from '../../../utils/schema-helper.js';

router.post('/createUser',
    SchemaHelper.validateSchemaBody(UserSchema.createUser),
    UserController.createUser);
export default router;