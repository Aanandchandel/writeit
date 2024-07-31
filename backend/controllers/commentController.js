const Comment = require('../model/comment');

// Create Comment
exports.createComment = async (req, res) => {
    try {
        const author_id = req.user.user.id;
        const { content, post_id } = req.body;
        const comment = new Comment({ content, author_id, post_id });
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).send(error);
    }
};

// Read Comments
exports.readComments = async (req, res) => {
    try {
        const { post_id } = req.body;
        const comments = await Comment.find({ post_id });
        res.send(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).send(error);
    }
};

// Read Single Comment
exports.readSingleComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        console.error("Error fetching comment:", error);
        res.status(500).send(error);
    }
};

// Update Comment
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const comment = await Comment.findByIdAndUpdate(id, { content, updatedAt: Date.now() }, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).send({ message: "Comment not found" });
        }
        res.send(comment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).send(error);
    }
};

// Delete Comment
exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).send();
        }
        res.send(comment);
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(400).send(error);
    }
};
