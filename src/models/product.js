const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    discountPercentage: { type: Number },
    description: { type: String },
    brand: { type: String },
    category: { type: String },
    dimensions: {
        width: { type: Number },
        height: { type: Number },
        depth: { type: Number },
    },
    stock: { type: Number, required: true },
    weight: { type: Number },
    minimumOrderQuantity: { type: Number },
    rating: { type: Number },
    returnPolicy: { type: String },
    shippingInformation: { type: String },
    warrantyInformation: { type: String },
    availabilityStatus: { type: String },
    sku: { type: String },
    tags: [
        { type: String },
    ],
}, {
    timestamps: true,
});

const ProductModel = mongoose.model('products', productSchema);

module.exports = ProductModel;
