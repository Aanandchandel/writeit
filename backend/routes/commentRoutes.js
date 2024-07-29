const express = require('express');
const router = express.Router();
const Comment = require('../model/comment');
const varifyToken=require("../middlewares/varifyToken");
const chackBelong=require("../middlewares/chackBelong");
const authenticateToken = require('../middlewares/varifyToken');

// Create Comment
router.post('/',varifyToken, async (req, res) => {
    console.log("commenting...",req.user.user.id)
    try {
        const author_id=req.user.user.id;
        const { content, post_id } = req.body;
        const comment = new Comment({ content, author_id, post_id });
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read Comments
router.get('/', async (req, res) => {
    try {
        const { post_id } = req.body;
        const comments = await Comment.find({ post_id });
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read Single Comment
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Comment
router.put('/:id',varifyToken,chackBelong, async (req, res) => {
    try {
        const { id } = req.params;
        const author_id=req.user.user.id;
        const { content } = req.body;
        const comment = await Comment.findByIdAndUpdate(id, { content, updatedAt: Date.now() }, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).send({message:"not found"});
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete Comment
router.delete('/:id',authenticateToken,chackBelong, async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
