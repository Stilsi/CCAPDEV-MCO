import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  logo: String,
  location: String,
  description: String,
  socialMedia: String,
  phoneNumber: String,
  recommendedCount: { type: Number, default: 0 },
  notRecommendedCount: { type: Number, default: 0 },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

restaurantSchema.index({ name: 'text' });

export default Restaurant;