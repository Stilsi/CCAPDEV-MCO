// logout.js
import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
    req.session.cookie.maxAge = null; // Clear the "remember" setting
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Session ID:', req.sessionID);
            console.log('Session destroyed');
            res.redirect('/login');
        }
    });
});

export default router;
