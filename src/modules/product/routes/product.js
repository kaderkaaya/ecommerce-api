import express from "express";
const router = express.Router();
import ProductController from '../controllers/product.js';
import ProductSchema from '../schemas/product.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';
// /**
//  * @swagger
//  * /product/create-product:
//  *   post:
//  *     summary: Create product
//  *     tags: [product]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/CreateProduct'
//  *     responses:
//  *       201:
//  *         description: product created succesfully
//  */
router.post('/create-product',
    // permissionMiddleware({ endpointName: 'create-product' }),
    authenticate,
    SchemaHelper.validateSchemaBody(ProductSchema.createProduct),
    ProductController.createProduct);


// /**
//  * @swagger
//  * /product/get-product:
//  *   get:
//  *     summary: Get product
//  *     tags: [product]
//  *     parameters:
//  *       - in: query
//  *         name: productId
//  *         schema:
//  *           type: number
//  *     responses:
//  *       200:
//  *         description: Successfully fetched products
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Response'
//  */
router.get('/get-product',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-product' }),
    SchemaHelper.validateSchemaQuery(ProductSchema.getProduct),
    ProductController.getProduct);

// /**
//  * @swagger
//  * /product/get-products:
//  *   get:
//  *     summary: Get products
//  *     tags: [product]
//  *     parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: number
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: number
//  *     responses:
//  *       200:
//  *         description: Successfully fetched products
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Response'
//  */
router.get('/get-products',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-products' }),
    SchemaHelper.validateSchemaQuery(ProductSchema.getProducts),
    ProductController.getProducts);

// /**
//  * @swagger
//  * /product/update-product:
//  *   post:
//  *     security:
//  *       - bearerAuth: []
//  *     summary: Update product
//  *     tags: [product]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/UpdateProduct'
//  *     responses:
//  *       201:
//  *         description: product updated succesfully
//  */
router.post('/update-product',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-product' }),
    SchemaHelper.validateSchemaBody(ProductSchema.updateProduct),
    ProductController.updateProduct);

// /**
//  * @swagger
//  * /product/delete-product:
//  *   post:
//  *     summary: Delete product
//  *     tags: [product]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/DeleteProduct'
//  *     responses:
//  *       201:
//  *         description: product deleted succesfully
//  */
router.post('/delete-product',
    authenticate,
    // permissionMiddleware({ endpointName: 'delete-product' }),
    SchemaHelper.validateSchemaBody(ProductSchema.deleteProduct),
    ProductController.deleteProduct);

    // router.get('/get-products-for-users',
    // authenticate,
    // // permissionMiddleware({ endpointName: 'get-products' }),
    // SchemaHelper.validateSchemaQuery(ProductSchema.getProductsForUsers),
    // ProductController.getProductsForUsers);

export default router;