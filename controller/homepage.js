import express from "express";
import Restaurant from "../model/restaurantschema.js";

const router = express.Router();

router.get('/', function(req, res) {
    res.render('homepage');
});


router.get('/search', async function(req, res) {
    const query = req.query.query;
    const restaurants = await Restaurant.find({});
    const results = restaurants.filter(restaurant => restaurant.name.includes(query));
    res.render('search', {results: results});
});

export default router;