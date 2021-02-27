const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    // User
    productName: {
        type: String,
        min: 3,
        max: 100
    },
    brand: {
        type: String,
        min: 3,
        max: 100
    },
    category: {
        type: String,
        min: 3,
        max: 100
    },
    description: {
        type: String,
        min: 10,
        max: 500
    },

    rating: {
        type: Number,
        min: 0,
        max: 7
    },

    numReviews: {
        min: 0,
    },

    price: { 
        type: Number,
        min: 0,
        max: 7
    },

    countInStock: { 
        min: 0,
    },

     createdAt: {
        type: Date,
        default: Date.now
     }
})

module.exports = mongoose.model('Product', ProductSchema)