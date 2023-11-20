import express from "express";
import User from "../model/userschema.js";


const router = express.Router();

router.get('/', function(req, res) {
    res.render('register');
  });  

  router.post('/', async function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        description: req.body.description
    });
  
    try {
        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
  });
  
 

export default router;
