import express from "express";
const router = express.Router();
import UserController from '../controllers/user.js';
import UserSchema from '../schemas/user.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';

/**
 * @swagger
 * /user/create-user:
 *   post:
 *     summary: Create user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUser'
 *     responses:
 *       201:
 *         description: User created succesfully
 */
router.post(
    '/create-user',
    SchemaHelper.validateSchemaBody(UserSchema.createUser),
    UserController.createUser
);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: User login successfully
 */
router.post('/login',
    SchemaHelper.validateSchemaBody(UserSchema.login),
    UserController.login);
/**
 * @swagger
 * /user/get-user:
 *   get:
 *     summary: Get User
 *     tags: [User]
 *     parameters:
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully fetched user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */

router.get('/get-user',
    authenticate,
    permissionMiddleware({ endpointName: 'get-user' }),
    SchemaHelper.validateSchemaQuery(UserSchema.getUser),
    UserController.getUser);
/**
 * @swagger
 * /user/get-users:
 *   get:
 *     summary: Get Users
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully fetched users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */

router.get('/get-users',
    authenticate,
    permissionMiddleware({ endpointName: 'get-users' }),
    SchemaHelper.validateSchemaQuery(UserSchema.getUsers),
    UserController.getUsers);

/**
 * @swagger
 * /user/update-user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Update user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       201:
 *         description: User updated succesfully
 */
router.post('/update-user',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-user' }),
    SchemaHelper.validateSchemaBody(UserSchema.updateUser),
    UserController.updateUser);

/**
 * @swagger
 * /user/update-password:
 *   post:
*     security:
 *       - bearerAuth: []
 *     summary: Update password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePassword'
 *     responses:
 *       201:
 *         description: User's password updated succesfully
 */
router.post('/update-password',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-password' }),
    SchemaHelper.validateSchemaBody(UserSchema.updatePassword),
    UserController.updatePassword);

/**
 * @swagger
 * /user/delete-user:
 *   post:
 *     summary: Delete user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteUser'
 *     responses:
 *       201:
 *         description: User deleted succesfully
 */
router.post('/delete-user',
    authenticate,
    // permissionMiddleware({ endpointName: 'delete-user' }),
    SchemaHelper.validateSchemaBody(UserSchema.deleteUser),
    UserController.deleteUser);

// router.post('/forgot-password',
//     SchemaHelper.validateSchemaBody(UserSchema.forgotPassword),
//     UserController.forgotPassword);

export default router;