const { verifyTokenAndAuthorization } = require('./verifyToken');
const User = require('../models/user')
const router = require('express').Router();
const CryptoJS = require('crypto-js');




router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRETKEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;