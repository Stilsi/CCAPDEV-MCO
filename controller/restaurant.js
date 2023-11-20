import express from "express";
import Restaurant from "../model/restaurantschema.js";
import Review from '../model/reviewschema.js';
import Handlebars from 'handlebars';

const router = express.Router();

router.get('/:id', async (req, res) => {
 try {
   const restaurantId = req.params.id;
   const restaurant = await Restaurant.findById(restaurantId);
   const reviews = await Review.find({ restaurant: restaurantId });

   if (!restaurant) {
     console.error(`No restaurant found with ID: ${restaurantId}`);
     return res.status(404).send('Restaurant not found');
   }

   console.log('Restaurant data:', restaurant);

   let loggedInUser = null;
   let username = null;
   
   if (req.session.user) {
     loggedInUser = req.session.user;
     username = req.session.user.username;
   }
   console.log("hello:", loggedInUser);

   res.render("restaurant", { 
     pageTitle: restaurant.name, 
     restaurant, 
     reviews, 
     loggedInUser,
     username
   });
  
   req.session.restaurant = restaurant;
   req.session.restaurantId = restaurant._id; // Set the restaurant ID in the session

   console.log('Session ID:', req.sessionID);
   console.log('Current User:', username);
   console.log('Current Restaurant:', req.session.restaurant.name);
 } catch (error) {
   console.error(`Error fetching restaurant data: ${error.message}`);
   res.status(500).send('Internal Server Error');
 }
});

Handlebars.registerHelper('if_eq', function(a, b, opts) {
 const result = a == b; // Or === depending on your needs
 console.log('Comparison result:', result);
 if(result)
     return opts.fn(this);
 else
     return opts.inverse(this);
});

export default router;


