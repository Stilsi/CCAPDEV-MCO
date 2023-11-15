import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  helpfulCount: { type: Number, default: 0 },
  unhelpfulCount: { type: Number, default: 0 },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
