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
 *     summary: Create Role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRole'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
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
 *     responses:
 *       201:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
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
 *     responses:
 *       201:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
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
 *     summary: Get Roles
 *     tags: [Role]
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
 *         description: Successfully fetched roles
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */

router.get('/get-roles',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-roles' }),
    SchemaHelper.validateSchemaQuery(RoleSchema.getRoles),
    RoleController.getRoles);


export default router;