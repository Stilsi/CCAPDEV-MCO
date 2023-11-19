import express from "express";
import Restaurant from "../model/restaurantschema.js";
import Review from '../model/reviewschema.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
 try {
 const restaurantId = req.params.id;
 const restaurant = await Restaurant.findById(restaurantId);
 const reviews = await Review.find({ restaurant: restaurantId });
 
 if (!restaurant) {
  console.error('No restaurant found with ID: ${restaurantId}');
  return res.status(404).send('Restaurant not found');
 }
 
 console.log('Restaurant data:', restaurant);
 res.render("restaurant", { pageTitle: restaurant.name, restaurant, reviews });

 req.session.restaurant = restaurant;
 req.session.restaurantId = restaurant._id; // Set the restaurant ID in the session
 console.log('Session ID:', req.sessionID); 
 console.log('Current Restaurant:', req.session.restaurant.name); 
 } catch (error) {
 console.error('Error fetching restaurant data: ${error.message}');
 res.status(500).send('Internal Server Error');
 }
});


export default router;
