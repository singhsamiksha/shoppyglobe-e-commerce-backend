const express = require('express');
const CartController = require('../controllers/cart');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', Auth.authenticateJWTToken, CartController.getUserCart);
router.post('/', Auth.authenticateJWTToken, CartController.addProductToCart);
router.put('/:productId', Auth.authenticateJWTToken, CartController.updateProductQuantityInCart);
router.delete('/:productId', Auth.authenticateJWTToken, CartController.removeItemFromCart);

module.exports = router;
