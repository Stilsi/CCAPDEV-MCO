import express from "express";
import User from "../model/userschema.js"; // Assuming a user schema/model is defined
import Review from '../model/reviewschema.js';
import Handlebars from 'handlebars';

const router = express.Router();
router.get('/', function(req, res) {
    const user = req.session.user;
    res.render('edit-profile', { user: user });
 }); 
 

 router.post('/update', async function(req, res) {
    const username = req.session.user.username;
    const { descTitle } = req.body;
    console.log('description title', descTitle);
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.descriptionTitle = descTitle;
            await user.save();
            res.status(200).json({ message: 'User description updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    console.log('What');
    console.log('Hello from update');
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
