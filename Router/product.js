const router = require('express').Router();
const product = require('../models/product');
const Product = require('../models/product')

router.get('/getallproducts', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.get('/getproductbyid/:id', async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById(id);
        res.status(201).send(product)
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

router.put('/updateproduct/:id', (req, res) => {
    const id = req.params.id;
    try {
        product.findByIdAndUpdate(id, req.body, { useFindAndModify: true }).then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Failed to update Product with id=${id}.`
                });
            } else res.send({
                message: "Product was updated successfully."
            });
        })
        // res.status(200).send('updated successfull')
    } catch (error) {
        res.status(500).send(err)
    }
})


module.exports = router;

