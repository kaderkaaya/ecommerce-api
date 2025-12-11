import express from "express";
const router = express.Router();
import RoleController from '../controllers/role.js';
import RoleSchema from '../schemas/role.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';

router.post('/create-role',
    authenticate,
    permissionMiddleware({ endpointName: 'create-role' }),
    SchemaHelper.validateSchemaBody(RoleSchema.createRole),
    RoleController.createRole);

router.post('/update-role',
    authenticate,
    permissionMiddleware({ endpointName: 'update-role' }),
    SchemaHelper.validateSchemaBody(RoleSchema.updateRole),
    RoleController.updateRole);

router.post('/delete-role',
    authenticate,
    permissionMiddleware({ endpointName: 'delete-role' }),
    SchemaHelper.validateSchemaBody(RoleSchema.deleteRole),
    RoleController.deleteRole);

router.get('/get-roles',
    authenticate,
    permissionMiddleware({ endpointName: 'get-roles' }),
    SchemaHelper.validateSchemaQuery(RoleSchema.getRoles),
    RoleController.getRoles);


export default router;