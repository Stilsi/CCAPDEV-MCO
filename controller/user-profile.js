import express from "express";
import User from "../model/userschema.js"; // Assuming a user schema/model is defined
import Review from '../model/reviewschema.js';
import Handlebars from 'handlebars';

const router = express.Router();

router.get('/', async (req, res) => {
   const user = req.session.user;
   const userReviews = await Review.find({ username: user.username });
   res.render('user-profile', { user: user, reviews: userReviews });
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