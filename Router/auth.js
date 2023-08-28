const router = require('express').Router();
const User = require('../models/user')

router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser)
        console.log(savedUser)
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router;