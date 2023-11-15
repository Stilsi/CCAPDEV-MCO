import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  helpfulCount: { type: Number, default: 0 },
  unhelpfulCount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  ownerResponse: String,
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;