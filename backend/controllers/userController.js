const User = require("../model/user");
const ValidU = require("../model/valid");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail, generateOTP } = require("../services/emailService");

const SALT_ROUNDS = 10; 
const JWT_SECRET = process.env.JWT_SECRET;

// Create user
exports.createUser = async (req, res) => {
    const { username, password, email } = req.body;
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim();
    try {
        if (!trimmedUsername || !password || !trimmedEmail) {
            return res.status(400).send({ message: "Required fields are missing" });
        }

        const hashpassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await User.create({ username: trimmedUsername, password: hashpassword, email: trimmedEmail });
        
        res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error creating user:", err);
        if (err.code === 11000) {
            res.status(500).send({ message: "Duplicate email" });
        } else {
            res.status(500).send({ message: err.message || "Error creating user" });
        }
    }
};
//delete user
exports.deleteUser= async (req, res) => {
    try {
        const userId = req.params.id;
         // Find and delete the user
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const payload = {
            user: {
                id: user.id,
                username: user.username,
                email
            }
        };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token, message: "Valid User" });
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email and exclude the password field from the result
        const user = await User.findOne({ email }).select('-password');

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Send user profile as response
        res.send(user);
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).send({ message: 'Server error' });
    }
};
// Send OTP
exports.sendOtp = async (req, res) => {
    try {
        const { id, email } = req.user.user;
        const OTP = generateOTP();

        const sent = await sendOTPEmail(email, OTP);
        console.log('Email sent response:', sent);

        const valid = await ValidU.create({ user_id: id, OTP });
        console.log('OTP stored in database:', valid);

        res.status(200).send({ message: 'OTP sent' });
    } catch (err) {
        console.error('Error sending OTP:', err);
        res.status(500).send({ message: 'Failed to send OTP' });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { OTP } = req.body;
        const { id } = req.user.user;

        const getOtp = await ValidU.findOne({ user_id: id });

        if (getOtp) {
            if (OTP === getOtp.OTP) {
                const user = await User.findByIdAndUpdate(id, { emailValid: true }, { new: true });
                await ValidU.deleteOne({ user_id: id });

                res.status(200).send({ message: 'OTP verified, email validated.', user });
            } else {
                res.status(401).send({ message: 'Invalid OTP. Please try again.' });
            }
        } else {
            res.status(401).send({ message: 'OTP expired or not found. Please regenerate OTP.' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).send({ message: 'Server error. Please try again later.' });
    }
};
