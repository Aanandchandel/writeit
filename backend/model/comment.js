const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for the comments collection
const commentSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Assuming post_id references Post collection
    content: { type: String, required: true },
    author_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming author_id references User collection
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// Create a model based on the schema
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
