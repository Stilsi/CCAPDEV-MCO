import express from 'express';
import Review from '../model/reviewschema.js';

const router = express.Router();

router.post('/', async function(req, res) {
    const review = new Review({
        usericon: req.session.user.profilePicture,
        username: req.session.user.username,
        restaurant: req.session.restaurantId,
        title: req.body.title,
        comment: req.body.comment,
        recommendation: req.body.recommendation,
        image: req.body.image
    });
 
    console.log('current user', req.session.user.username);
 
    try {
        await review.save();
        res.redirect('/restaurant/' + req.session.restaurant._id);
    } catch (err) {
        console.log(err);
        res.redirect('/error');
    }
 }); 

 export default router;

 