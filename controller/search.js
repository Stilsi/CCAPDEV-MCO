import express from "express";
import Restaurant from "../model/restaurantschema.js";
import Review from "../model/reviewschema.js";

const router = express.Router();

router.get('/', async(req, res) => {
 const query = req.query.query;
 if (!query) {
   return res.status(400).send('No query provided');
 }
 try {
   const restaurants = await Restaurant.find({ $text: { $search: query } }).lean().sort('-ratingDifference name');
   const reviews = await Review.find({ $text: { $search: query } });
   console.log('restaurants:', restaurants); // Debug line
   console.log('reviews:', reviews); // Debug line
   res.render('search', {results: restaurants, reviews: reviews});
} catch (error) {
   console.error(error);
   res.status(500).send('An error occurred while performing the search');
 }
});

export default router;
