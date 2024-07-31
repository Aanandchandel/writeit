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
        lowercase: true 
    },
    emailValid: { type: Boolean, default: false } 
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
