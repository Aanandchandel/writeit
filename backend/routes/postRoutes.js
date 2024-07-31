const express = require('express');
const router = express.Router();
const { createPost, readPosts, readSinglePost, updatePost, deletePost } = require('../controllers/postController');
const authenticateToken = require("../middlewares/varifyToken");
const chackBelongPost = require("../middlewares/chackBelongPost");

// Create Post
router.post('/', authenticateToken, createPost);

// Read Posts
router.get('/', readPosts);

// Read Single Post
router.get('/:id', readSinglePost);

// Update Post
router.put('/:id', authenticateToken, chackBelongPost, updatePost);

// Delete Post
router.delete('/:id', authenticateToken, chackBelongPost, deletePost);

module.exports = router;
