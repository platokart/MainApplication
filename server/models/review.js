const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  feedback: { type: String },
  reason: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer' },
  consultantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Consultant' },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
