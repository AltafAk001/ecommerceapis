const router = require('express').Router();
const Product = require('../models/product')

router.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(201).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/addproduct', async (req, res) => {
    const createProduct = new Product({
        brand: req.body.brand,
        title: req.body.title,
        description: req.body.description,
        images: req.body.img,
        category: req.body.categories,
        discountPercentage: req.body.discountPercentage,
        rating: req.body.rating,
        stock: req.body.stock,
        thumbnail: req.body.thumbnail,
        price: req.body.price,
    })
    try {
        const savedProduct = await createProduct.save();
        res.status(201).send(savedProduct)
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router;

