import express from 'express';

const router = express.Router();

router.get('/', function(req, res) {
req.session.destroy(function(err) {
if(err) {
    console.log(err);
} else {
    console.log('Session ID:', req.sessionID); 
    console.log('Session destroyed'); // Add this line
    res.redirect('/login');
}
});
});
   

export default router;
