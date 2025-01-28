const express = require('express');
const ProductController = require('../controllers/product');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getProductById);

module.exports = router;
