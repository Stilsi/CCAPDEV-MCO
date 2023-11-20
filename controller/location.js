import express from "express"; //required
import Location from "../model/locationschema.js"; //gets information from the db
import Restaurant from "../model/restaurantschema.js"

const router = express.Router(); //required

router.get('/:id', async (req, res) => {
  try {
    const locationId = req.params.id; //gets id from location so example: taft
    const location = await Location.findById(locationId);
  
    if (!location) {
      console.error(`No location found with ID: ${locationId}`); //if it does not exist it will not render
      return res.status(404).send('location not found'); //this will print sa page
    }
 
    // Fetch the restaurant documents using their IDs
    const restaurants = await Restaurant.find({ _id: { $in: location.restaurants } });
 
    console.log('location data:', location);
    console.log('restaurants data:', restaurants);
    res.render("location", {location, restaurants });
  } catch (error) {
    console.error(`Error fetching location data: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
 });
 


export default router;
