const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const TokenHelper = {};
module.exports = TokenHelper;

TokenHelper.generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

TokenHelper.convertToHash = (target) => bcrypt.hash(target, 10);

TokenHelper.compareHash = (targetString, hash) => bcrypt.compare(targetString, hash);

TokenHelper.verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
