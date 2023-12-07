import express from "express";
import User from "../model/userschema.js"; // Assuming a user schema/model is defined
import Review from '../model/reviewschema.js';
import Handlebars from 'handlebars';

const router = express.Router();
router.get('/', function(req, res) {
 const user = req.session.user;
 res.render('edit-profile', { user: user });
 console.log(user);
});


router.get('/:id', async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
      // Use the await keyword to wait for the findById method to resolve
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Adjust the response based on your needs
      res.status(200).send(user);
    } catch (error) {
      console.error('Error retrieving user:', error);
      res.status(500).send(error.message);
    }
  });
  
  router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    console.log(userId);
    try {
      const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Adjust the response based on your needs
      res.status(200).send(user);
    } catch (error) {
      console.error('Error updating User', error);
      res.status(500).send(error.message);
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
