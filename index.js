// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import exphbs from "express-handlebars"; // Import express-handlebars
import User from "./model/userschema.js";
import Restaurant from "./model/restaurant.js";
import Review from "./model/review.js";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars setup
app.use(express.static(`public`));
app.set("view engine", "hbs");
app.engine("hbs", exphbs.engine({ extname: "hbs" }));
app.set("views", path.join("views"));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Routes
const routes = express.Router();

routes.route("/user/:id").get(function (req, res) {
    User.findById(req.params.id).then((user) => {
      res.render("user", { user }); // render the "user" template with user data
    });
  });
  
  routes.route("/user").get(function (req, res) {
    User.find().then((users) => {
      res.render("user", { users }); // render the "user" template with users data
    });
  });

routes.route("/user").post(function (req, res) {
  const user = new User({
    username: req.body.username,
    bio: req.body.bio,
    password: req.body.password,
    email: req.body.email,
  });
  user.save().then(() => {
    res.json({ message: "User saved." });
  });
});

routes.route("/restaurant/:id").get((req, res) => {
  const restaurantId = req.params.id;    
   Restaurant.findById(restaurantId)
    .populate('reviews') // 
    .exec((err, restaurant) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.render("restaurant", { restaurant });
    });
});

// find reviews assigned to each restaurant
routes.route("/restaurant/:id/reviews").post((req, res) => {
  const restaurantId = req.params.id;

    Review.find({ restaurant: restaurantId }, (err, reviews) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.render("reviews", { reviews });
  });
});

// create a new review
routes.route("/restaurant/:id/reviews").post((req, res) => {
  const restaurantId = req.params.id;

  const newReview = new Review({
    comment: req.body.comment,
    username: req.body.username, 
  });

  newReview.save((err, savedReview) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    
  // add the new review to the appropriate restaurant
    Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { reviews: savedReview._id } },
      (updateErr) => {
        if (updateErr) {
          console.error(updateErr);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.json({ message: "Review saved." });
      }
    );
  });
});
                                
// Mount the routes on the main app
app.use("/", routes);

// Connect to MongoDB and start the server
app.listen(3000, () => {
    console.log("App started");
    mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
});
