import express from "express";
const router = express.Router();
import CategoryController from '../controllers/category.js';
import CategorySchema from '../schemas/category.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';

router.post(
    authenticate,
    // permissionMiddleware({ endpointName: 'create-category' }),
    '/create-category',
    SchemaHelper.validateSchemaBody(CategorySchema.createCategory),
    CategoryController.createCategory
);

router.get('/get-category',
    authenticate,
    permissionMiddleware({ endpointName: 'get-category' }),
    SchemaHelper.validateSchemaQuery(CategorySchema.getCategory),
    CategoryController.getCategory);

router.get('/get-categories',
    authenticate,
    permissionMiddleware({ endpointName: 'get-categories' }),
    SchemaHelper.validateSchemaQuery(CategorySchema.getCategories),
    CategoryController.getCategories);

router.post('/update-category',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-category' }),
    SchemaHelper.validateSchemaBody(CategorySchema.updateCategory),
    CategoryController.updateCategory);

router.post('/delete-category',
    authenticate,
    // permissionMiddleware({ endpointName: 'delete-category' }),
    SchemaHelper.validateSchemaBody(CategorySchema.deleteCategory),
    CategoryController.deleteCategory);

export default router;