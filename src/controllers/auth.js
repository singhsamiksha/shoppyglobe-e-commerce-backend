const TokenHelper = require('../utils/token');
const UserModel = require('../models/user');
const ErrorUtil = require('../utils/error');

const AuthController = {};
module.exports = AuthController;

AuthController.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new UserModel({
            name,
            email: email.toLowerCase(),
            password: await TokenHelper.convertToHash(password),
        });
        await newUser.save();

        const token = TokenHelper.generateToken(newUser._id);
        return res.status(201).json({
            message: 'User registered successfully',
            data: {
                token,
                user: UserModel.getPublicObject(newUser),
            },
        });
    } catch (error) {
        return ErrorUtil.APIError(error, res);
    }
};

AuthController.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await TokenHelper.compareHash(password, user?.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = TokenHelper.generateToken(user._id);
        return res.status(200).json({
            message: 'Login successful',
            data: {
                token,
                user: UserModel.getPublicObject(user),
            },
        });
    } catch (error) {
        return ErrorUtil.APIError(error, res);
    }
};
