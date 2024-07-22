const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the posts collection
const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming author_id references User collection
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
