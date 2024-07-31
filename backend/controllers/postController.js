const Post = require('../model/post');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const author_id = req.user.user.id;
    const { title, content } = req.body;
    
    if (title && content) {
      const post = new Post({ title, content, author_id });
      await post.save();
      res.status(201).json(post);
    } else if (!content) {
      console.log("Content is required");
      res.status(400).send({ message: "Content is required" });
    } else {
      console.log("Title is required");
      res.status(400).send({ message: "Title is required" });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(400).json({ message: error.message });
  }
};

// Read Posts
exports.readPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: error.message });
  }
};

// Read Single Post
exports.readSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const author_id = req.user.user.id;
    const { title, content } = req.body;
    const updated_at = new Date();
    
    if (title && content) {
      const post = await Post.findByIdAndUpdate(req.params.id, { title, content, author_id, updated_at }, { new: true });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } else if (!title) {
      console.log("Title is required");
      res.status(400).send({ message: "Title is required" });
    } else {
      console.log("Content is required");
      res.status(400).send({ message: "Content is required" });
    }
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: error.message });
  }
};
