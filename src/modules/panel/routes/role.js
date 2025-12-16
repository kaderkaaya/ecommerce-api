import express from "express";
const router = express.Router();
import RoleController from '../controllers/role.js';
import RoleSchema from '../schemas/role.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';

/**
 * @swagger
 * /role/create-role:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create Role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRole'
 *      responses:
 *      201:
 *         description: User updated succesfully
 */
router.post('/create-role',
    authenticate,
    permissionMiddleware({ endpointName: 'create-role' }),
    SchemaHelper.validateSchemaBody(RoleSchema.createRole),
    RoleController.createRole);

/**
 * @swagger
 * /role/update-role:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Update Role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRole'
 */
router.post('/update-role',
    authenticate,
    permissionMiddleware({ endpointName: 'update-role' }),
    SchemaHelper.validateSchemaBody(RoleSchema.updateRole),
    RoleController.updateRole);
/**
 * @swagger
 * /role/delete-role:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete Role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteRole'
 */
router.post('/delete-role',
    authenticate,
    permissionMiddleware({ endpointName: 'delete-role' }),
    SchemaHelper.validateSchemaBody(RoleSchema.deleteRole),
    RoleController.deleteRole);

/**
 * @swagger
 * /role/get-roles:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get Roles
 *     tags: [Role]
 *     requestQuery:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetRoles'
 */
router.get('/get-roles',
    authenticate,
    permissionMiddleware({ endpointName: 'get-roles' }),
    SchemaHelper.validateSchemaQuery(RoleSchema.getRoles),
    RoleController.getRoles);


export default router;