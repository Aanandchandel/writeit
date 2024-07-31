require("dotenv").config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;
const adminEmail = process.env.EMAIL_USER; // Renamed to make it clear

// Middleware to verify JWT and check admin access
function authenticateToken(req, res, next) {
    const { token } = req.body;

    // Check if the token is provided
    if (!token) {
        return res.status(401).send({ message: "No token provided" }); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Token is invalid" }); // Forbidden
        }

        // Check if the user's email matches the admin email
        if (user.user.email === adminEmail) {
            // req.user = user; 
            next(); 
        } else {
            return res.status(401).send({ message: "Only admin can access" }); // Unauthorized
        }
    });
}

module.exports = authenticateToken;
