const CartModel = require('../models/cart');
const ProductModel = require('../models/product');
const ErrorUtil = require('../utils/error');

const CartController = {};
module.exports = CartController;

/**
 * Retrieves the user's cart, including product details and quantities.
 * Populates the cart items with product information and calculates price details.
 *
 * @param {Object} req - The request object containing the user data.
 * @param {Object} res
 */
CartController.getUserCart = async (req, res) => {
    const { _id: userId } = req.user;

    try {
        const cart = await CartModel.findOne({ userId })
            .populate({
                path: 'items.productId',
            });
        if (!cart) {
            return res.json({
                message: 'Fetched cart successfully',
                data: [],
            });
        }

        const products = await Promise.all(cart.items.map(async (item) => {
            const product = item.productId;

            const { quantity } = item;
            const originalPrice = product.price * quantity;
            const discount = (product.discountPercentage / 100) * originalPrice;
            const priceAfterDiscount = originalPrice - discount;

            // Check if the quantity exceeds the available stock
            const isRequiredStockAvailable = quantity <= product.stock;

            return {
                productId: product._id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                description: product.description,
                rating: product.rating,
                stock: product.stock,
                discountPercentage: product.discountPercentage,
                quantity: item.quantity,
                totalPrice: originalPrice,
                totalPriceAfterDiscount: priceAfterDiscount,
                totalDiscount: discount,
                isRequiredStockAvailable,
            };
        }));

        return res.status(200).json({
            message: 'Fetched cart successfully',
            data: products,
        });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};

/**
 * Adds a product to the user's cart. If the product is already in the cart, the quantity is updated.
 *
 * @param {Object} req - The request object containing the product ID and quantity.
 * @param {Object} res
 */
CartController.addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const { _id: userId } = req.user;

    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found', re: req.body });
        }

        const cart = await CartModel.findOne({ userId });
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    quantity,
                    addedOn: new Date(),
                });
            }
            await cart.save();
        } else {
            const newCart = new CartModel({
                userId,
                items: [{
                    productId,
                    quantity,
                    addedOn: new Date(),
                }],
            });
            await newCart.save();
        }

        return res.status(200).json({ message: 'Product added to cart' });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};

/**
 * Updates the quantity of a product in the user's cart.
 * If the product is not already in the cart, it is added with the specified quantity.
 *
 * @param {Object} req - The request object containing the product ID and new quantity.
 * @param {Object} res
 */
CartController.updateProductQuantityInCart = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const { _id: userId } = req.user;

    try {
        let cart = await CartModel.findOne({ userId });
        if (!cart) {
            cart = new CartModel({
                userId,
                items: [],
            });
            await cart.save();
        }

        const productIndexInCart = cart.items.findIndex((item) => item.productId.toString() === productId);

        if (productIndexInCart <= -1) {
            cart.items.push({
                productId,
                quantity,
                addedOn: new Date(),
            });
        } else {
            cart.items[productIndexInCart].quantity = quantity;
        }
        await cart.save();

        return res.status(200).json({ message: 'Cart updated successfully' });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};

/**
 * Removes a product from the user's cart.
 *
 * @param {Object} req - The request object containing the product ID to be removed.
 * @param {Object} res
 */
CartController.removeItemFromCart = async (req, res) => {
    const { productId } = req.params;
    const { _id: userId } = req.user;

    try {
        const cart = await CartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
        await cart.save();

        return res.status(200).json({ message: 'Product removed from cart' });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};
