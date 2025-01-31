const express = require('express');
const AuthController = require('../controllers/auth');
const Auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/user', Auth.authenticateJWTToken, AuthController.validateUser);

module.exports = router;
