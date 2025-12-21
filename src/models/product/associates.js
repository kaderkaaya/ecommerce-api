import ProductModel from './product.js';
import ProductVariantModel from './product-variant.js';
import ProductStocktModel from './product-stock.js';
import ProductImageModel from './product-image.js'

ProductModel.hasMany(ProductVariantModel, {
    foreignKey: 'productId',
    as: 'variants'
});


ProductVariantModel.belongsTo(ProductModel, {
    foreignKey: 'productId',
    as: 'product'
});

ProductVariantModel.hasMany(ProductStocktModel, {
    foreignKey: 'productVariantId',
    as: 'variants'
});

ProductStocktModel.belongsTo(ProductVariantModel, {
    foreignKey: 'productVariantId',
    as: 'variant'
});

ProductModel.hasMany(ProductImageModel, {
    foreignKey: 'productId',
    as: 'images'
});


ProductImageModel.belongsTo(ProductModel, {
    foreignKey: 'productId',
    as: 'product'
});
