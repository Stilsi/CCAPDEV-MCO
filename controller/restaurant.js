import express from "express";
import Restaurant from "../model/restaurantschema.js";

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
   const restaurantId = req.params.id;
   const restaurant = await Restaurant.findById(restaurantId);
  
   if (!restaurant) {
     console.error(`No restaurant found with ID: ${restaurantId}`);
     return res.status(404).send('Restaurant not found');
   }
  
   console.log('Restaurant data:', restaurant);
   res.render("restaurant", { pageTitle: restaurant.name, restaurant });
 
   req.session.restaurant = restaurant;
   console.log('Session ID:', req.sessionID); 
   console.log('Current Restaurant:', req.session.restaurant.name); 
  } catch (error) {
   console.error(`Error fetching restaurant data: ${error.message}`);
   res.status(500).send('Internal Server Error');
  }
 }); 

export default router;
