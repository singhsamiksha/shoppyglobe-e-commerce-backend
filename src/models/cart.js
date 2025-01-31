const mongoose = require('mongoose');
const UserModel = require('./user');
const ProductModel = require('./product');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: UserModel },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: ProductModel, required: true },
            quantity: { type: Number, min: 1, required: true },
            addedOn: { type: Date, required: true },
        },
    ],
}, {
    timestamps: true,
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
