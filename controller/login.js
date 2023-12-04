// login.js
import express from "express";
import User from "../model/userschema.js";

const router = express.Router();

router.get('/', function(req, res) {
    const warningMessage = req.query.warning;
    res.render('login', { warningMessage });
});

router.post('/', async (req, res) => {
    const { username, password, remember } = req.body;
 
    const user = await User.findOne({ username });
 
    if (!user) {
        return res.redirect('/login?warning=Username not found');
    }
 
    user.comparePassword(password, (err, isMatch) => {
        if (err) {
            console.log(err);
            return res.redirect('/login?warning=Error occurred');
        }
        if (!isMatch) {
            return res.redirect('/login?warning=Invalid password');
        }
 
        req.session.user = user;
 
        if (remember) {
            req.session.cookie.maxAge = 3 * 7 * 24 * 60 * 60 * 1000;
        } else {
            req.session.cookie.maxAge = null;
        }
 
        console.log('Session ID:', req.sessionID);
        console.log('Session User:', req.session.user.username);
        res.redirect('/homepage');
    });
 });
 

export default router;
