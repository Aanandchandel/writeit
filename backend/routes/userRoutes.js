require("dotenv").config()
const express = require('express');
const router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Define constants directly
const SALT_ROUNDS = 10; 
const JWT_SECRET =process.env.JWT_SECRET

// Create user

router.post("/create", async (req, res) => {
    // Clean up request body keys
    const { username, password, email } = req.body;
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim();

    try {
        console.log(trimmedUsername, password, trimmedEmail);
        // Check if any required field is missing
        if (!trimmedUsername || !password || !trimmedEmail) {
            return res.status(400).send({ message: "Required fields are missing" });
        }

        console.log(trimmedUsername, password, trimmedEmail);

        // Generate salt and hash the password
        const hashpassword = await bcrypt.hash(password, SALT_ROUNDS);
        console.log(hashpassword, "hash password");

        // Create a new user in the database
        const newUser = await User.create({ username: trimmedUsername, password: hashpassword, email: trimmedEmail });
        
        // Respond with success message
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        if (err.code === 11000) {
            res.status(500).send({ message: "Duplicate email" });
        } else {
            res.status(500).send({ message: err.message || "Error creating user" });
        }
    } 
});
// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if username exists in database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };
        jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token ,message:"valid User"});
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Server Error" });
    }
});

// Other routes
router.get('/', async(req, res) => {
    try{
        const users= await User.find();
        res.status(201).json(users);

    }catch(err){
        console.log(err)
        res.status(500).send({message:err})
    }
});

router.get('/profile', (req, res) => {
    res.send('User profile');
});

router.post('/profile', (req, res) => {
    res.send('Update user profile');
});

// Export the router
module.exports = router;
