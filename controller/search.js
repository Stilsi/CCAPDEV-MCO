import express from "express";
import Restaurant from "../model/restaurantschema.js";

const router = express.Router();

router.get('/', async(req, res) => {
 console.log("hello");
 const query = req.query.query;
 if (!query) {
  return res.status(400).send('No query provided');
 }
 try {
  const restaurants = await Restaurant.find({ $text: { $search: query } }).sort({ rating: -1 });
  console.log('results:', restaurants);
  res.render('search', {results: restaurants});
 } catch (error) {
  console.error(error);
  res.status(500).send('An error occurred while performing the search');
 }
});

router.get('/sort', async(req, res) => {
  const sortType = req.query.type;
  let sortQuery;
  if (sortType === 'alphabetically') {
     sortQuery = { name: 1 };
  } else if (sortType === 'by-rating') {
     sortQuery = { rating: -1 };
  } else {
     return res.status(400).send('Invalid sort type');
  }
  try {
     const restaurants = await Restaurant.find().sort(sortQuery);
     res.render('search', {results: restaurants});
  } catch (error) {
     console.error(error);
     res.status(500).send('An error occurred while performing the sort');
  }
});

export default router;
