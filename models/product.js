const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    discountPercentage: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String },
    price: { type: Number, required: true },
    occasion: { type: String, required: true },
    colors: { type: String, required: true },
    size: { type: String, required: true },
},
    { timestamps: true }
);

module.exports = mongoose.model('product', productSchema)