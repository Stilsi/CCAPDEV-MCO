import express from "express";
import Location from "../model/locationschema.js";

const router = express.Router();

router.get('/:id', async (req, res) => {
   try {
     const locationId = req.params.id;
     const locations = await Location.find({});
     const location = await Location.findById(locationId);
   
     if (!location) {
       console.error(`No location found with ID: ${locationId}`);
       return res.status(404).send('location not found');
     }
   
     console.log('location data:', location);
     res.render("location", { pageTitle: location.name, location, locations });
   } catch (error) {
     console.error(`Error fetching location data: ${error.message}`);
     res.status(500).send('Internal Server Error');
   }
});

export default router;
