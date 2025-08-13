import express from 'express';
import Itinerary from '../models/Itinerary.js';
import Trip from '../models/Trip.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Create or replace itinerary for a trip (owner only)
router.post('/:tripId', authMiddleware, async (req, res) => {
  const trip = await Trip.findById(req.params.tripId);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  if (trip.owner.toString() !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  let it = await Itinerary.findOne({ trip: trip._id });
  if (!it) it = new Itinerary({ trip: trip._id, items: req.body.items || [] });
  else it.items = req.body.items || [];
  await it.save();
  res.json(it);
});

router.get('/:tripId', async (req, res) => {
  const it = await Itinerary.findOne({ trip: req.params.tripId }).populate('trip');
  if (!it) return res.status(404).json({ message: 'Itinerary not found' });
  res.json(it);
});

export default router;