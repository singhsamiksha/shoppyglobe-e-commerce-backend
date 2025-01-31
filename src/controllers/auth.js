const TokenHelper = require('../utils/token');
const UserModel = require('../models/user');
const ErrorUtil = require('../utils/error');

const AuthController = {};
module.exports = AuthController;

/**
 * Registers a new user.
 * Checks if a user with the provided email already exists. If not, it creates a new user, hashes the password,
 * saves the user, and returns a JWT token along with the user's public data.
 *
 * @param {Object} req - The request object containing the user data (name, email, password).
 * @param {Object} res
 */
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

/**
 * Logs in a user.
 * Verifies the user's email and password. If valid, generates and returns a JWT token along with the user's public data.
 *
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res
 */
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

/**
 * Validates a logged-in user.
 * Checks if the user exists and returns their public data.
 *
 * @param {Object} req - The request object containing the authenticated user's details.
 * @param {Object} res
 */
AuthController.validateUser = async (req, res) => {
    const { user } = req;
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({
            message: 'User valid',
            data: {
                user: UserModel.getPublicObject(user),
            },
        });
    } catch (error) {
        return ErrorUtil.APIError(error, res);
    }
};
