import CartData from '../data/cart.js';
// import Errors from '../constant/error.js';
import ErrorHelper from '../../../utils/error-helper.js';
import { v4 as uuidv4 } from 'uuid';
import ProductData from '../../product/data/product.js';
import sequelize from "../../../config/config.js";
import { Op } from 'sequelize';
import Errors from '../constant/error.js';
class CartService {

    static async createCart({ userId }) {
        const activeCart = await CartData.getActiveCart({ userId });
        if (activeCart) {
            throw new ErrorHelper(Errors.CART_ERROR.message, Errors.CART_ERROR.statusCode);
        }
        if (!userId) {
            const guestId = uuidv4();
            const cart = await CartData.createCartForGuest({ guestId });
            return cart
        }
        const cart = await CartData.createCart({ userId });
        return cart;
    }

    //simdi burda direk olarak stoku kilitleyebilirdik ve isleme oyle devam edebilirdik ama
    //bu durumda mesela 1 urun icin 1000 tane bakan kullanici varsa bu db'de 
    //row level lock olusturur ve db performansini ciddi derecedede dusurur bundan dolayı
    //atomik bir yapi kullandik ve ayrica locking yaparak
    //lock süresini update kisminda kisa sürede alindi.
    //stok yetersizse updatedrows===0 oldugunda direk olarak hata verdik.
    static async addCartItems({ userId, cartId, productVariantId, quantity }) {
        return await sequelize.transaction(async (t) => {
            const cart = await CartData.getCartById({
                cartId,
                transaction: t
            });

            if (!cart) throw new ErrorHelper(Errors.CART_ERROR.message, Errors.CART_ERROR.statusCode);
            const productVariant = await ProductData.getVariantByIdForCart({
                productVariantId,
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!productVariant) throw new ErrorHelper(Errors.PRODUCT_ERROR.message, Errors.PRODUCT_ERROR.statusCode)
            const [updatedRows] = await ProductData.updateProductStockForCart({
                quantity,
                productVariantId,
                transaction: t,
            })

            if (updatedRows === 0) throw new ErrorHelper(Errors.STOCK_ERROR.message, Errors.STOCK_ERROR.statusCode);
            let cartItem = await CartData.getCartItem({
                cartId,
                productVariantId,
                transaction: t,
                lock: t.LOCK.UPDATE
            });
            //bu kisimdan emin degilim tekrar bakalim!!!!!!!!
            if (cartItem) {
                cartItem.quantity += quantity;
                return await cartItem.save({ transaction: t });
            }
            else {
                await CartData.addCartItems({
                    cartId,
                    productVariantId,
                    quantity,
                    priceSnapshot: productVariant.price,
                    transaction: t
                })
            }
            return { success: true };
        })
    }

    static async removeCartItems({ userId, cartId, productVariantId }) {
        return await sequelize.transaction(async (t) => {
            const cart = await CartData.getCartById({
                cartId,
                transaction: t
            });
            if (!cart) throw new ErrorHelper(Errors.CART_ERROR.message, Errors.CART_ERROR.statusCode);

            const cartItem = await CartData.getCartItem({
                cartId,
                productVariantId,
                transaction: t,
                lock: t.LOCK.UPDATE
            });

            if (!cartItem) throw new ErrorHelper(Errors.CART_ERROR.message, Errors.CART_ERROR.statusCode);
            const removeQty = cartItem.quantity;
            const [updatedRows] = await ProductData.updateProductStockAfterRemove({
                removeQty,
                productVariantId,
                transaction: t
            });
           console.log('updatedRows',updatedRows);   
            if (updatedRows === 0) throw new ErrorHelper(Errors.STOCK_ERROR.message, Errors.STOCK_ERROR.statusCode);
            await CartData.removeCartItemss({
                cartItemsId: cartItem.id,
                transaction: t
            })
            return { success: true };
        })

    }

}
export default CartService;