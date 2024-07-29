require("dotenv").config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET

// Middleware to verify JWT
function authenticateToken(req, res, next) {

    const {token}=req.body

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send({message:"token is invalid"}); // If token is invalid,
        req.user = user;
        next();
    });
}

module.exports=authenticateToken