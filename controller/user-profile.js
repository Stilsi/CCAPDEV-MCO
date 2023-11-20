import express from "express";
import User from "../model/userschema.js"; // Assuming a user schema/model is defined
import Handlebars from 'handlebars';

const router = express.Router();
router.get('/', function(req, res) {
    const user = req.session.user;
    res.render('user-profile', { user: user });
 }); 
 /*
router.get('/:id', async (req, res) => {
 try {
   const userId = req.params.id;
   const user = await User.findById(userId);

   if (!user) {
     console.error(`No user found with ID: ${userId}`);
     return res.status(404).send('User not found');
   }

   console.log('User data:', user);

   let loggedInUser = null;
   let username = null;
   
   if (req.session.user) {
     loggedInUser = req.session.user;
     username = req.session.user.username;
   }
   console.log("hello:", loggedInUser);


   ///res.render("profile", { 
   res.render("test", { ///testing line
     pageTitle: user.username, 
     user, 
     loggedInUser,
     username
   });
  
   req.session.user = user;
   req.session.userId = user._id; // Set the user ID in the session

   console.log('Session ID:', req.sessionID);
   console.log('Current User:', username);
   console.log('Current User Profile:', req.session.user.username);
 } catch (error) {
   console.error(`Error fetching user data: ${error.message}`);
   res.status(500).send('Internal Server Error');
 }
});
*/
Handlebars.registerHelper('if_eq', function(a, b, opts) {
 const result = a == b; // Or === depending on your needs
 console.log('Comparison result:', result);
 if(result)
     return opts.fn(this);
 else
     return opts.inverse(this);
});

export default router;
