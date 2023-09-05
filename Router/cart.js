const router = require('express').Router()
const Cart = require('../models/cart');

router.get('/cartitemsbyudid/:id', async (req, res) => {
    const id = req.params.id
    try {
        const items = await Cart.findById(id)
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/addtocart', async (req, res) => {
    const { userId } = req.body;
    const { productId, quantity } = req.body.products[0]

    if (!userId || !productId) {
        return res.status(400).json({ error: 'userId and productId are required.' });
    }

    try {
        let userCart = await Cart.findOne({ userId });

        if (!userCart) {
            userCart = await Cart.create({ userId });
        }

        const existingProduct = userCart.products.find((product) => product.productId === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity || 1;
        } else {
            userCart.products.push({ productId, quantity });
        }

        await userCart.save();

        return res.json({ message: 'Item added to the cart.', cart: userCart });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/removetocart', async (req, res) => {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
        return res.status(400).json({ error: 'userId and productId are required.' });
    }

    try {

        let userCart = await Cart.findOne({ userId });
        const existingProductIndex = userCart.products.findIndex((product) => product.productId === productId);
        userCart.products.splice(existingProductIndex, 1);
        await userCart.save();
        return res.json({ message: 'Item remove to the cart.', cart: userCart });

    } catch (error) {

        return res.status(500).json({ error: 'Internal Server Error' });

    }
})

module.exports = router



