import express from 'express';
import Trip from '../models/Trip.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create trip
router.post('/', authMiddleware, async (req, res) => {
  const data = req.body;
  data.owner = req.user.id;
  const trip = new Trip(data);
  await trip.save();
  res.json(trip);
});

// List trips (public)
router.get('/', async (req, res) => {
  const trips = await Trip.find().populate('owner', 'firstName lastName');
  res.json(trips);
});

// Get trip
router.get('/:id', async (req, res) => {
  const trip = await Trip.findById(req.params.id).populate('owner', 'firstName lastName');
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  res.json(trip);
});

// Update trip
router.put('/:id', authMiddleware, async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  if (trip.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  Object.assign(trip, req.body);
  await trip.save();
  res.json(trip);
});

// Delete trip
router.delete('/:id', authMiddleware, async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  if (trip.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  await trip.deleteOne();
  res.json({ message: 'Deleted' });
});

export default router;