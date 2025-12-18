import express from "express";
const router = express.Router();
import CategoryController from '../controllers/category.js';
import CategorySchema from '../schemas/category.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';
/**
 * @swagger
 * /category/create-category:
 *   post:
 *     summary: Create category
 *     tags: [category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategory'
 *     responses:
 *       201:
 *         description: category created succesfully
 */
router.post('/create-category',
    // permissionMiddleware({ endpointName: 'create-category' }),
    authenticate,
    SchemaHelper.validateSchemaBody(CategorySchema.createCategory),
    CategoryController.createCategory);


/**
 * @swagger
 * /category/get-category:
 *   get:
 *     summary: Get Category
 *     tags: [category]
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully fetched categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */
router.get('/get-category',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-category' }),
    SchemaHelper.validateSchemaQuery(CategorySchema.getCategory),
    CategoryController.getCategory);

/**
 * @swagger
 * /category/get-categories:
 *   get:
 *     summary: Get Categories
 *     tags: [category]
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
 *         description: Successfully fetched categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 */
router.get('/get-categories',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-categories' }),
    SchemaHelper.validateSchemaQuery(CategorySchema.getCategories),
    CategoryController.getCategories);

/**
 * @swagger
 * /category/update-category:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Update category
 *     tags: [category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategory'
 *     responses:
 *       201:
 *         description: Category updated succesfully
 */
router.post('/update-category',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-category' }),
    SchemaHelper.validateSchemaBody(CategorySchema.updateCategory),
    CategoryController.updateCategory);

/**
 * @swagger
 * /category/delete-category:
 *   post:
 *     summary: Delete category
 *     tags: [category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeleteCategory'
 *     responses:
 *       201:
 *         description: category deleted succesfully
 */
router.post('/delete-category',
    authenticate,
    // permissionMiddleware({ endpointName: 'delete-category' }),
    SchemaHelper.validateSchemaBody(CategorySchema.deleteCategory),
    CategoryController.deleteCategory);

export default router;