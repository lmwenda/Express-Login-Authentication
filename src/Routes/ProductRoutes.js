const router = require('express').Router();
const Product = require('../Models/Product');
const products = require('../Static/products');
const id = 13;

router.get('/products', (req, res) => {
    res.send(products);
})

router.post('/product', (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        brand: req.body.brand,
        category: req.body.category,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        price: req.body.price,
        countInStock: req.body.countInStock,
        createdAt: req.body.createdAt
    })
})

module.exports = router;