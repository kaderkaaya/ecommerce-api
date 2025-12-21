import express from "express";
const router = express.Router();
import ProductController from '../controllers/product.js';
import ProductSchema from '../schemas/product.js';
import SchemaHelper from '../../../utils/schema-helper.js';
import permissionMiddleware from '../../../utils/permission-middleware.js';
import authenticate from '../../../utils/auth-middleware.js';
import AuthenticateForUser from '../../../utils/auth-middleware-user.js';

router.post('/create-product',
    // permissionMiddleware({ endpointName: 'create-product' }),
    authenticate,
    SchemaHelper.validateSchemaBody(ProductSchema.createProduct),
    ProductController.createProduct);

router.get('/get-product',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-product' }),
    SchemaHelper.validateSchemaQuery(ProductSchema.getProduct),
    ProductController.getProduct);


router.get('/get-products',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-products' }),
    SchemaHelper.validateSchemaQuery(ProductSchema.getProducts),
    ProductController.getProducts);

router.post('/update-product',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-product' }),
    SchemaHelper.validateSchemaBody(ProductSchema.updateProduct),
    ProductController.updateProduct);

router.post('/delete-product',
    authenticate,
    // permissionMiddleware({ endpointName: 'delete-product' }),
    SchemaHelper.validateSchemaBody(ProductSchema.deleteProduct),
    ProductController.deleteProduct);

router.get('/get-products-for-users',
    AuthenticateForUser,
    // permissionMiddleware({ endpointName: 'get-products' }),
    SchemaHelper.validateSchemaQuery(ProductSchema.getProductsForUsers),
    ProductController.getProductsForUsers);

router.post('/add-image',
    authenticate,
    // permissionMiddleware({ endpointName: 'add-image' }),
    SchemaHelper.validateSchemaBody(ProductSchema.addImage),
    ProductController.addImage);

router.post('/add-product-variant',
    authenticate,
    // permissionMiddleware({ endpointName: 'add-product-variant' }),
    SchemaHelper.validateSchemaBody(ProductSchema.addProductVariant),
    ProductController.addProductVariant);

router.post('/update-product-variant',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-product-variant' }),
    SchemaHelper.validateSchemaBody(ProductSchema.updateProductVariant),
    ProductController.updateProductVariant);

router.post('/update-product-variant-status',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-product-variant-status' }),
    SchemaHelper.validateSchemaBody(ProductSchema.updateProductVariantStatus),
    ProductController.updateProductVariantStatus);

router.get('/get-product-variant',
    authenticate,
    // permissionMiddleware({ endpointName: 'get-product-variant' }),
    SchemaHelper.validateSchemaQuery(ProductSchema.getProductVariant),
    ProductController.getProductVariant);

router.get('/get-product-variants',
authenticate,
// permissionMiddleware({ endpointName: 'get-product-variants' }),
SchemaHelper.validateSchemaQuery(ProductSchema.getProductVariants),
ProductController.getProductVariants);

router.post('/add-product-stock',
    authenticate,
    // permissionMiddleware({ endpointName: 'add-product-stock' }),
    SchemaHelper.validateSchemaBody(ProductSchema.addProductStock),
    ProductController.addProductStock);

router.post('/update-product-stock',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-product-stock' }),
    SchemaHelper.validateSchemaBody(ProductSchema.updateProductStock),
    ProductController.updateProductStock);

router.post('/update-product-stock-status',
    authenticate,
    // permissionMiddleware({ endpointName: 'update-product-stock-status' }),
    SchemaHelper.validateSchemaBody(ProductSchema.updateProductStockStatus),
    ProductController.updateProductStockStatus);

// router.get('/get-product-stock-by-variant',
// authenticate,
// // permissionMiddleware({ endpointName: 'get-product-stock-by-variant' }),
// SchemaHelper.validateSchemaQuery(ProductSchema.getProductStockByVariant),
// ProductController.getProductStockByVariant);

// router.get('/get-product-stocks',
// authenticate,
// // permissionMiddleware({ endpointName: 'get-product-stocks' }),
// SchemaHelper.validateSchemaQuery(ProductSchema.getProductStocks),
// ProductController.getProductStocks);

// router.get('/get-products-top-five',
// authenticate,
// // permissionMiddleware({ endpointName: 'get-products' }),
// SchemaHelper.validateSchemaQuery(ProductSchema.getProductstopFive),
// ProductController.getProductstopFive);



export default router;