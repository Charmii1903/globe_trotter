import express from 'express';
import Trip from '../models/Trip.js';
import User from '../models/User.js';
import { authMiddleware, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Simple admin stats
router.get('/stats', authMiddleware, adminOnly, async (req, res) => {
  const users = await User.countDocuments();
  const trips = await Trip.countDocuments();
  res.json({ users, trips });
});

export default router;