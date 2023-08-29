const router = require('express').Router();
const User = require('../models/user');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');



router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRETKEY).toString(),
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).send(savedUser)
    } catch (err) {
        res.status(500).send(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).send('Wrong credentials!');
        const hasePass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRETKEY)
        const password1 = hasePass.toString(CryptoJS.enc.Utf8)
        password1 !== req.body.password && res.status(401).send('Wrong credentials!');

        const accessToken = jwt.sign({
            id: user._id, isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: '3d' })
        
        const { password, ...others } = user._doc;
        res.status(200).send({ ...others, accessToken })
    } catch (error) {
        res.status(500).send(error)
    }

})


module.exports = router;