const { default: mongoose } = require('mongoose');
const ProductModel = require('../models/product');
const ErrorUtil = require('../utils/error');

const ProductController = {};
module.exports = ProductController;

ProductController.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find(
            {},
            {
                title: 1,
                price: 1,
                thumbnail: 1,
            },
        );

        return res.json({
            products,
        });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};

ProductController.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const products = await ProductModel.findOne(
            { _id: new mongoose.Types.ObjectId(`${productId}`) },
            {
                title: 1,
                price: 1,
                thumbnail: 1,
                discountPercentage: 1,
                stock: 1,
                brand: 1,
                category: 1,
                dimensions: 1,
                weight: 1,
                minimumOrderQuantity: 1,
                rating: 1,
                returnPolicy: 1,
                shippingInformation: 1,
                warrantyInformation: 1,
                availabilityStatus: 1,
                sku: 1,
                tags: 1,
            },
        );

        return res.json({
            products,
        });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};
