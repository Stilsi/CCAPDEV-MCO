import express from "express";
import Restaurant from "../model/restaurantschema.js";
import Location from "../model/locationschema.js";

const router = express.Router();
     
router.get('/', async function(req, res) {
    const restaurants = await Restaurant.find({});
    const locations = await Location.find({});
    const results = restaurants.filter(restaurant => restaurant.name.includes(req.query.query));
    res.render('homepage', { locations: locations, results: results });
 });

router.get('/search', async function(req, res) {
    const query = req.query.query;
    const restaurants = await Restaurant.find({});
    const results = restaurants.filter(restaurant => restaurant.name.includes(query));
    res.render('search', {results: results});
});


export default router;