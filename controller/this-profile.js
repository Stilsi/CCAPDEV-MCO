import express from "express";
import User from "../model/userschema.js"; // Assuming a user schema/model is defined
import Review from '../model/reviewschema.js';
import Handlebars from 'handlebars';

const router = express.Router();

// router.get('/:username', async function(req, res) {
//    const username = req.params.username;
//    console.log(username);
//    const userReviews = await Review.find({ username: username });
//    res.render('this-profile', { username: username, reviews: userReviews });
//  });

router.get('/:username', async function(req, res) {
   const username = req.params.username;
   console.log(username);
 
   // Check if the username exists in the database
   const user = await User.findOne({ username: username });
 
   if (user) {
     // If the user exists, fetch the user's reviews
     const userReviews = await Review.find({ username: username });
     res.render('this-profile', { user: user, reviews: userReviews });
   } else {
     // If the user does not exist, send a 404 response
     res.status(404).send('User not found');
   }
 });
 

Handlebars.registerHelper('if_eq', function(a, b, opts) {
 const result = a == b; // Or === depending on your needs
 console.log('Comparison result:', result);
 if(result)
    return opts.fn(this);
 else
    return opts.inverse(this);
});

export default router;