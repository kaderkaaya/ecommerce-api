import express from "express";
const router = express.Router();
import UserController from '../controllers/user.js';
import UserSchema from '../schemas/user.js';
import SchemaHelper from '../../../utils/schema-helper.js';

router.post('/create-user',
    SchemaHelper.validateSchemaBody(UserSchema.createUser),
    UserController.createUser);

router.post('/login',
    SchemaHelper.validateSchemaBody(UserSchema.login),
    UserController.login);

router.get('/get-user',
    SchemaHelper.validateSchemaQuery(UserSchema.getUser),
    UserController.getUser);

router.get('/get-users',
    SchemaHelper.validateSchemaQuery(UserSchema.getUsers),
    UserController.getUsers);


export default router;