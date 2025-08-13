import express from 'express';
import Post from '../models/Post.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'firstName lastName');
  res.json(posts);
});

router.post('/', authMiddleware, async (req, res) => {
  const post = new Post({ ...req.body, author: req.user.id });
  await post.save();
  res.json(post);
});

router.post('/:id/like', authMiddleware, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  const idx = post.likes.indexOf(req.user.id);
  if (idx === -1) post.likes.push(req.user.id);
  else post.likes.splice(idx,1);
  await post.save();
  res.json(post);
});

export default router;