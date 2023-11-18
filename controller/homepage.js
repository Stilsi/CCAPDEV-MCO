import express from "express";
import Restaurant from "../model/restaurantschema.js";

const router = express.Router();

const locations = [
{
    name: 'Taft Avenue',
    link: '/location/taft',
    defaultIcon: '/assets/location-icons/loc-2.png',
    hoverIcon: '/assets/location-icons/loc-2-hover.png'
},
{
    name: 'Agno Street',
    link: '/location/agno',
    defaultIcon: '/assets/location-icons/loc-1.png',
    hoverIcon: '/assets/location-icons/loc-1-hover.png'
},
{
    name: 'Leon Guinto Street',
    link: '/location/leonguinto',
    defaultIcon: '/assets/location-icons/loc-3.png',
    hoverIcon: '/assets/location-icons/loc-3-hover.png'
},
];
     
router.get('/', async function(req, res) {
    const restaurants = await Restaurant.find({});
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