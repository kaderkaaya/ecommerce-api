import express from "express";
const router = express.Router();
import UserController from '../controllers/user.js';
import UserSchema from '../schemas/user.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import authenticate from '../../../utils/auth-middleware-user.js';

router.post('/create-user',
    SchemaHelper.validateSchemaBody(UserSchema.createUser),
    UserController.createUser);

router.post('/login',
    SchemaHelper.validateSchemaBody(UserSchema.login),
    UserController.login);

router.get('/get-user',
    authenticate,
    SchemaHelper.validateSchemaQuery(UserSchema.getUser),
    UserController.getUser);

router.post('/update-user',
    authenticate,
    SchemaHelper.validateSchemaBody(UserSchema.updateUser),
    UserController.updateUser);

router.post('/update-password',
    authenticate,
    SchemaHelper.validateSchemaBody(UserSchema.updatePassword),
    UserController.updatePassword);

router.post('/delete-account',
    authenticate,
    SchemaHelper.validateSchemaBody(UserSchema.deleteAccount),
    UserController.deleteAccount);

export default router;