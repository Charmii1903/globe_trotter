import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['planned','ongoing','completed','cancelled'], default: 'planned' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Trip', TripSchema);