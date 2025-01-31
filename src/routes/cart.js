const express = require('express');
const CartController = require('../controllers/cart');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.get('/', Auth.authenticateJWTToken, CartController.getUserCart);
router.post('/:productId', Auth.authenticateJWTToken, CartController.addUpdateProductQuantityInCart);
router.delete('/:productId', Auth.authenticateJWTToken, CartController.removeItemFromCart);

module.exports = router;
