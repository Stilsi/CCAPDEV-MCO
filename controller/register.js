import express from "express";
import User from "../model/userschema.js";

const router = express.Router();

router.get('/', function(req, res) {
    res.render('register');
});

router.post('/', async function(req, res) {
    const { username, password, profilePicture, description } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.redirect('/register?error=Username already in use'); // Redirect with an error message
        }

        const user = new User({
            username,
            password,
            profilePicture,
            description
        });

        await user.save();
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
});

export default router;
