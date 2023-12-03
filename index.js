// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import exphbs from 'express-handlebars';
import path from "path";
import session from 'express-session';

import restaurantRoutes from './controller/restaurant.js';
import homepageRoutes from './controller/homepage.js';
import searchRoutes from './controller/search.js';
import locationRoutes from './controller/location.js';
import registerRoutes from './controller/register.js';
import loginRoutes from './controller/login.js';
import logoutRoutes from './controller/logout.js';
import reviewRoutes from './controller/review.js';
import userProfileRoutes from './controller/user-profile.js';
import editProfileRoutes from './controller/edit-profile.js';

import Review from './model/reviewschema.js'
import Restaurant from "./model/restaurantschema.js";

import Reply from './model/replyschema.js';

import methodOverride from "method-override";


// const setups
const app = express();
const PORT = process.env.PORT || 3000;
const routes = express.Router();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

app.use(express.static('public'));

// Handlebars setup
app.use(express.static('public'));
app.set("view engine", "hbs");
app.engine(
  'hbs',
  exphbs.engine({
    partialsDir: 'views/partials/',
    extname: 'hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoProperties: {
        name: true,
        address: true,
        phoneNumber: true,
        socialMedia: true,
        recommendedCount: true,
        notRecommendedCount: true
      }
    },
  })
 ); 
app.set("views", path.join("views"));
app.use(methodOverride('_method'));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

 //creates session for users logging in
app.use(session({
  secret: 'ang galing ni sir kerwin',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: null
  }
 }));

 app.use((req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
  } else {
    res.locals.user = null;
  }
  next();
});


//restaurant
app.use("/restaurant", restaurantRoutes);

//homepage
app.use("/homepage", homepageRoutes);

app.use("/search", searchRoutes);

app.use("/location", locationRoutes);

app.use("/register", registerRoutes);

app.use("/login", loginRoutes);

app.use("/logout", logoutRoutes);

app.use("/review", reviewRoutes);

app.use("/user-profile", userProfileRoutes);

const authenticateUser = (req, res, next) => {
  if (!req.session || !req.session.user) {
    // If no user session exists, redirect to the login page or send an error response
    return res.redirect(req.originalUrl);
  }
  // If the user is authenticated, proceed to the next middleware or route handler
  next();
};

app.get('/update-review/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    // Use the await keyword to wait for the findById method to resolve
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).send('Review not found');
    }

    // Adjust the response based on your needs
    res.status(200).send(review);
  } catch (error) {
    console.error('Error retrieving review:', error);
    res.status(500).send(error.message);
  }
});

app.put('/update-review/:id', async (req, res) => {
  const reviewId = req.params.id;
  const updatedReview = req.body;

  try {
    const review = await Review.findByIdAndUpdate(reviewId, updatedReview, { new: true });

    if (!review) {
      return res.status(404).send('Review not found');
    }

    // Adjust the response based on your needs
    res.status(200).send(review);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).send(error.message);
  }
});

app.delete('/delete-review/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
      const deletedReview = await Review.findByIdAndDelete(reviewId);

      if (!deletedReview) {
          return res.status(404).send('Review not found');
      }

      // Optionally, you can handle additional logic or send a success message
      res.status(200).send({ message: 'Review deleted successfully' });
  } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).send(error.message);
  }
});

// Add this route to your server code
// Modify the existing /mark-helpful/:id route
app.post('/mark-helpful/:id', authenticateUser, async (req, res) => {
  const reviewId = req.params.id;

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).send('Review not found');
    }

    // Check if the user has already voted on this review
    const userHasVoted = review.votes.some(vote => vote.user.equals(req.session.user._id));

    if (!userHasVoted) {
      // If the user hasn't voted, proceed with marking the review as helpful
      review.votes.push({ user: req.session.user._id, action: 'helpful' });

      // Increment the helpfulCount
      review.helpfulCount += 1;

      // Save the updated review to the database
      const updatedReview = await review.save();

      // Send the updated review as the response
      return res.status(200).send(updatedReview);
    } else {
      // User has already voted on this review
      return res.status(400).send('User has already voted on this review');
    }
  } catch (error) {
    console.error('Error marking review as helpful:', error);
    return res.status(500).send(error.message);
  }
});


// Add this route to your server code
app.post('/mark-unhelpful/:id',  authenticateUser, async (req, res) => {
  const reviewId = req.params.id;

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).send('Review not found');
    }

    // Check if the user has already voted on this review
    const userHasVoted = review.votes.some(vote => vote.user.equals(req.session.user._id));

    if (!userHasVoted) {
      // If the user hasn't voted, proceed with marking the review as helpful
      review.votes.push({ user: req.session.user._id, action: 'unhelpful' });

      // Increment the helpfulCount
      review.unhelpfulCount += 1;

      // Save the updated review to the database
      const updatedReview = await review.save();

      // Send the updated review as the response
      return res.status(200).send(updatedReview);
    } else {
      // User has already voted on this review
      return res.status(400).send('User has already voted on this review');
    }
  } catch (error) {
    console.error('Error marking review as unhelpful:', error);
    return res.status(500).send(error.message);
  }
});

app.post('/submit-reply/:id',  authenticateUser, async (req, res) => {
  const reviewId = req.params.id;
  const replyContent = req.body.content;

  try {
    // Find the review
    if (!replyContent || replyContent.trim() === '') {
      return res.status(400).json({ error: 'Reply content cannot be empty.' });
    }
    
    const review = await Review.findById(reviewId);

    // Create a new reply
    const reply = new Reply({
      user: req.session.user._id,
      content: replyContent,
    });

    // Save the reply
    await reply.save();

    // Add the reply to the review
    review.replies.push(reply);

    // Save the updated review
    await review.save();

    // Redirect to the restaurant page
    res.redirect('/restaurant/' + req.session.restaurant._id);
  } catch (error) {
    console.error('Error submitting reply:', error);
    res.status(500).send(error.message);
  }
});

app.get('/check-user-vote/:id', authenticateUser, async (req, res) => {
  const reviewId = req.params.id;

  try {
    // Find the review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).send('Review not found');
    }

    // Check if the user has already voted on this review
    const userHasVoted = review.votes.some(vote => vote.user.equals(req.session.user._id));

    // Send the result as the response
    res.status(200).send({ userHasVoted });
  } catch (error) {
    console.error('Error checking user vote:', error);
    res.status(500).send(error.message);
  }
});
                           
app.use("/edit-profile", editProfileRoutes);
                                
// Mount the routes on the main app
app.use("/", routes);

app.listen(PORT, async () => {
  console.log("App started");

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.restaurantDB,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    // Handle any errors that occur during the MongoDB connection
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
});

