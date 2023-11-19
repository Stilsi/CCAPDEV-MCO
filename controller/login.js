import express from "express";
import User from "../model/userschema.js";


const router = express.Router();

router.get('/', function(req, res) {
    res.render('login');
 });  

router.post('/', async (req, res) => {
    const { username, password } = req.body;
 
    // Find the user in the database
    const user = await User.findOne({ username });
 
    // If the user is not found, return an error message
    if (!user) {
        return res.status(400).send('Username not found');
    }
 
    // Validate the password
    // This is a simple check, in a real-world application you should hash and compare the passwords
    if (user.password !== password) {
        return res.status(400).send('Invalid password');
    }
 
    // If the password is correct, redirect the user to the homepage
    req.session.user = user;
    console.log('Session ID:', req.sessionID); 
    res.redirect('/homepage');
 }); 

export default router;
