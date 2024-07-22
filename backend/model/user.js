const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the users collection
const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: {
        mail: { type: String, required: true },  
        valid: { type: Boolean, default: false } 
    }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
