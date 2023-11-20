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
    const restaurants = await Restaurant.find({ $text: { $search: query } });
    console.log('results:', restaurants);
    res.render('search', {results: restaurants});
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while performing the search');
  }
 });
 

export default router;
