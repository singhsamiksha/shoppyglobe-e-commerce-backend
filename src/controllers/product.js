const { default: mongoose } = require('mongoose');
const ProductModel = require('../models/product');
const ErrorUtil = require('../utils/error');

const ProductController = {};
module.exports = ProductController;

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
