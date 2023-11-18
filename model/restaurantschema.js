import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  _id: { type: String, required: true },
  name: String,
  logo: {
    type: String,
    default: './images/assets/default_user.png'   
},
  location: String,
  socialMedia: String,
  address: String,
  phoneNumber: String,
  recommendedCount: { type: Number, default: 0 },
  notRecommendedCount: { type: Number, default: 0 },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;

