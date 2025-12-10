import express from "express";
const router = express.Router();
import RoleController from '../controllers/role.js';
import RoleSchema from '../schemas/role.js';
import SchemaHelper from '../../../utils/schema-helper.js';

router.post('/create-role',
    SchemaHelper.validateSchemaBody(RoleSchema.createRole),
    RoleController.createRole);

router.post('/update-role',
    SchemaHelper.validateSchemaBody(RoleSchema.updateRole),
    RoleController.updateRole);

router.post('/delete-role',
    SchemaHelper.validateSchemaBody(RoleSchema.deleteRole),
    RoleController.deleteRole);

router.get('/get-roles',
    SchemaHelper.validateSchemaQuery(RoleSchema.getRoles),
    RoleController.getRoles);


export default router;