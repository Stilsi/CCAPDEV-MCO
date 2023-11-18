// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import exphbs from 'express-handlebars';
import path from "path";

import restaurantRoutes from './controller/restaurant.js';
import homepageRoutes from './controller/homepage.js';
import searchRoutes from './controller/search.js';
import locationRoutes from './controller/location.js';

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

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//restaurant
app.use("/restaurant", restaurantRoutes);

//homepage
app.use("/homepage", homepageRoutes);

app.use("/search", searchRoutes);

app.use("/location", locationRoutes);
                                
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