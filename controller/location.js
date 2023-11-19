import express from "express"; //required
import Location from "../model/locationschema.js"; //gets information from the db

const router = express.Router(); //required

router.get('/:id', async (req, res) => {
   try {
     const locationId = req.params.id; //gets id from location so example: taft
     const locations = await Location.find({}); //finds example u search "location/taft" if that exists
     const location = await Location.findById(locationId); //then it looks for that id
   
     if (!location) {
       console.error(`No location found with ID: ${locationId}`); //if it does not exist it will not render
       return res.status(404).send('location not found'); //this will print sa page
     }
   
     console.log('location data:', location); //if it does exist u will see the info print sa command line
     res.render("location", {location, locations }); //this gets location data, and all other locations
   } catch (error) {
     console.error(`Error fetching location data: ${error.message}`);
     res.status(500).send('Internal Server Error');
   }
});

export default router;
