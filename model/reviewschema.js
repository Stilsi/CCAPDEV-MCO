import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
 usericon: String,
 username: String,
 restaurant: String,
 title: { type: String, required: true },
 comment: { type: String, required: true },
 recommendation: { type: String, required: true },
 helpfulCount: { type: Number, default: 0 },
 unhelpfulCount: { type: Number, default: 0 },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
