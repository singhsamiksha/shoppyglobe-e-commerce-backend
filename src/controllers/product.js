const { default: mongoose } = require('mongoose');
const ProductModel = require('../models/product');
const ErrorUtil = require('../utils/error');

const ProductController = {};
module.exports = ProductController;

/**
 * Retrieves a list of products based on search criteria, pagination, and sorting options.
 * Allows filtering by product title, sorting by either title or price, and pagination.
 *
 * @param {Object} req - The request object containing query parameters (search, skip, limit, sortBy, sortOrder).
 * @param {Object} res - The response object for sending the response back to the client.
 * @returns {Object} JSON response with product data, pagination info, or error details.
 */
ProductController.getAllProducts = async (req, res) => {
    const {
        search, skip = 0, limit = 10, sortBy = 'title', sortOrder = 'asc',
    } = req.query;

    try {
        const filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const sortObj = {};
        if (sortBy === 'price') {
            sortObj.price = sortOrder === 'asc' ? 1 : -1;
        } else {
            sortObj.title = sortOrder === 'asc' ? 1 : -1;
        }

        const products = await ProductModel.find(filter, {
            title: 1,
            price: 1,
            thumbnail: 1,
            created_at: 1,
        })
            .skip(Number(skip))
            .limit(Number(limit))
            .sort(sortObj);

        const totalProducts = await ProductModel.countDocuments(filter);

        return res.json({
            data: products,
            page_info: {
                total: totalProducts,
                page: Math.floor(Number(skip) / Number(limit)) + 1,
                totalPages: Math.ceil(totalProducts / Number(limit)),
            },
        });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};

/**
 * Retrieves a specific product by its ID.
 *
 * @param {Object} req - The request object containing the product ID in the parameters.
 * @param {Object} res - The response object for sending the response back to the client.
 * @returns {Object} JSON response with product details or error details.
 */
ProductController.getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await ProductModel.findOne(
            { _id: new mongoose.Types.ObjectId(`${productId}`) },
        );

        return res.json({
            data: product,
        });
    } catch (e) {
        return ErrorUtil.APIError(e, res);
    }
};
