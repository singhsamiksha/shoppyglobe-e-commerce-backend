const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

User.statics.getPublicObject = (user) => ({
    name: user.name,
    email: user.email,
});

const UserModel = mongoose.model('User', User);
module.exports = UserModel;
