import mongoose from 'mongoose';
import Restaurant from './restaurantschema.js';

const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
 usericon: String,
 username: String,
 restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
 title: { type: String, required: true },
 comment: { type: String, required: true },
 recommendation: { type: String, required: true },
 helpfulCount: { type: Number, default: 0 },
 unhelpfulCount: { type: Number, default: 0 },
});

reviewSchema.pre('save', async function (next) {
    if (this.isNew) {
      console.log('Saving new review');
      console.log('Restaurant ID:', this.restaurant);
      console.log('Recommendation:', this.recommendation);
      if (this.recommendation === 'recommended') {
        const result = await Restaurant.findByIdAndUpdate(this.restaurant, { $inc: { recommendedCount: 1, reviewCount: 1 } });
        console.log('Update result:', result);
      } else {
        const result = await Restaurant.findByIdAndUpdate(this.restaurant, { $inc: { notRecommendedCount: 1, reviewCount: 1 } });
        console.log('Update result:', result);
      }
    }
    next();
   });
   
   reviewSchema.pre('findOneAndUpdate', async function (next) {
    console.log('Updating review');
    const docToUpdate = await this.model.findOne(this.getQuery());
    console.log('Old recommendation:', docToUpdate.recommendation);
    console.log('New recommendation:', this._update.recommendation);
    if (docToUpdate.recommendation !== this._update.recommendation) {
      if (docToUpdate.recommendation === 'recommended') {
        const result = await Restaurant.findByIdAndUpdate(docToUpdate.restaurant, { $inc: { recommendedCount: -1, notRecommendedCount: 1, reviewCount: -1 } });
        console.log('Update result:', result);
      } else {
        const result = await Restaurant.findByIdAndUpdate(docToUpdate.restaurant, { $inc: { recommendedCount: 1, notRecommendedCount: -1, reviewCount: -1 } });
        console.log('Update result:', result);
      }
    }
    next();
   });
   

const Review = mongoose.model('Review', reviewSchema);

export default Review;
