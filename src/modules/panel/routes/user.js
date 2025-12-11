import express from "express";
const router = express.Router();
import UserController from '../controllers/user.js';
import UserSchema from '../schemas/user.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';

router.post('/create-user',
    authenticate,
    permissionMiddleware({ endpointName: 'create-user' }),
    SchemaHelper.validateSchemaBody(UserSchema.createUser),
    UserController.createUser);

router.post('/login',
    authenticate,
    permissionMiddleware({ endpointName: 'login' }),
    SchemaHelper.validateSchemaBody(UserSchema.login),
    UserController.login);

router.get('/get-user',
    authenticate,
    permissionMiddleware({ endpointName: 'get-user' }),
    SchemaHelper.validateSchemaQuery(UserSchema.getUser),
    UserController.getUser);

router.get('/get-users',
    authenticate,
    permissionMiddleware({ endpointName: 'get-users' }),
    SchemaHelper.validateSchemaQuery(UserSchema.getUsers),
    UserController.getUsers);


export default router;