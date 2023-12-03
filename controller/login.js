import express from "express";
import User from "../model/userschema.js";

const router = express.Router();

router.get('/', function(req, res) {
    const warningMessage = req.query.warning; // Get warning message from query parameters
    res.render('login', { warningMessage });
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.redirect('/login?warning=Username not found'); // Pass warning message in query parameters
    }

    if (user.password !== password) {
        return res.redirect('/login?warning=Invalid password'); // Pass warning message in query parameters
    }

    req.session.user = user;
    console.log('Session ID:', req.sessionID);
    console.log('Session User:', req.session.user.username);
    res.redirect('/homepage');
});

export default router;
