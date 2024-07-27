const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the users collection
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true // Ensures emails are stored in lowercase
    },
    emailValid: { type: Boolean, default: false } // Separate field for email validity
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
