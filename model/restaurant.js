import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialMedia: String,
  address: String,
  phoneNumber: String,
  recommendedCount: { type: Number, default: 0 },
  notRecommendedCount: { type: Number, default: 0 },
  numberOfReviews: { type: Number, default: 0 },
});

const restaurant = mongoose.model('restaurant', restaurantSchema);

export default restaurant;