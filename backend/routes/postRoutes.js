const express = require('express');
const router = express.Router();
const Post = require('../model/post');
const authenticateToken=require("../middlewares/varifyToken")

// Create Post
router.post('/',authenticateToken, async (req, res) => {
  console.log("postinng.......")
  console.log(req.user,"..................")
  try {
    const author_id=req.user.user.id
    const {title,content,token}=req.body;
    if(title&&content){
      const post = new Post({title,content,author_id});
      await post.save();
      res.status(201).json(post);
    }else if(!content){
      console.log("content is required")
      res.status(400).send({message:"content is required"})
    }else{
      console.log("title is required")
      res.status(400).send({message:"title is required"})
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message });
  }
});

// Read Posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read Single Post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Post
router.put('/:id', async (req, res) => {
  try {
    const {title,content,author_id}=req.body
    const updated_at = new Date(); 
    if(title&&content){
      const post = await Post.findByIdAndUpdate(req.params.id, {title,content,author_id,updated_at}, { new: true });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    }else if(!title){
      console.log("title is required")
      res.status(400).send({message:"title is required"})
    }else{
      console.log("content is required")
      res.status(400).send({message:"content is required"})
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete Post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (post) {
      res.status(200).json({ message: 'Post deleted successfully' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
