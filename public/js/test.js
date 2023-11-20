// Define a user schema
const User = mongoose.model('User', {
    username: String,
    profilePicture: String,
    description: String
});

// Route to render the profile page
router.get('/', function(req, res) {
    const userId = req.session.user; // Assuming userId is stored in the session

    // Fetch user details from the database using the userId
    User.findById(userId, (err, user) => {
        if (err) {
            console.error(err);
            // Handle errors accordingly, maybe render an error page
            res.render('error', { error: 'Failed to fetch user details' });
        } else {
            // Render the profile page with user details
            res.render('profile', { user: user });
        }
    });
});