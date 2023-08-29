const jwt = require('jsonwebtoken')

const VerifyToken = (req, res, next) => {
    const authToken = req.headers.token;
    if (authToken) {
        const token = authToken.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) res.status(403).json('token is not valide!');
            req.user = user;
            next()
        })
    } else {
        return res.status(401).json('Unauthorized!')
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    VerifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not alowed to do that!")
        }
    })
}
module.exports = { VerifyToken, verifyTokenAndAuthorization };