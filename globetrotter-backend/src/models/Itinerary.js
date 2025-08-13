import mongoose from 'mongoose';

const ItineraryItem = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  location: String,
  time: String
}, {_id: false});

const ItinerarySchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  items: [ItineraryItem],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Itinerary', ItinerarySchema);