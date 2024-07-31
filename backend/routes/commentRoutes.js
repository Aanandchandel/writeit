const express = require('express');
const router = express.Router();
const { createComment, readComments, readSingleComment, updateComment, deleteComment } = require('../controllers/commentController');
const varifyToken = require("../middlewares/varifyToken");
const chackBelong = require("../middlewares/chackBelong");
const authenticateToken = require('../middlewares/varifyToken');

// Create Comment
router.post('/', varifyToken, createComment);

// Read Comments
router.get('/', readComments);

// Read Single Comment
router.get('/:id', readSingleComment);

// Update Comment
router.put('/:id', varifyToken, chackBelong, updateComment);

// Delete Comment
router.delete('/:id', authenticateToken, chackBelong, deleteComment);

module.exports = router;
