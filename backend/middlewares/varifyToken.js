require("dotenv").config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET

// Middleware to verify JWT
function authenticateToken(req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    const {token}=req.body

    if (token == null) return res.sendStatus(401); // If no token, unauthorized

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, forbidden
        req.user = user;
        next();
    });
}

module.exports=authenticateToken