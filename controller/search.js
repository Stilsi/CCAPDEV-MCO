import express from "express";

const router = express.Router();

router.get('/', function(req, res) {
    res.render('search');
});

router.get('/search', async function(req, res) {
    const query = req.query.query;
    const restaurants = await Restaurant.find({});
    const results = restaurants.filter(restaurant => restaurant.name.includes(query));
    res.render('search', {results: results});
});

export default router;