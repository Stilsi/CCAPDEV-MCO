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
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
 }));

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

