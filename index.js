// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import exphbs from "express-handlebars"; // Import express-handlebars
import User from "./model/userschema.js";
import Restaurant from "./model/restaurantschema.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    return null;
  }
};

// Handlebars setup
app.use(express.static('public'));
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

//users
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

  //create a new user
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

app.get('/restaurant/:id', async (req, res) => {
  const restaurantId = req.params.id;

  try {
    // Find the restaurant in MongoDB by ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      // Handle case where restaurant is not found
      res.status(404).send('Restaurant not found');
      return;
    }

    // Render the restaurant template with the selected data
    res.render('restaurant', { restaurant });
  } catch (error) {
    // Handle any errors that occur during the MongoDB query
    console.error(`Error finding restaurant: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});
                                
// Mount the routes on the main app
app.use("/", routes);

app.listen(PORT, async () => {
  console.log("App started");

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.restaurantDB.restaurants,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    // Handle any errors that occur during the MongoDB connection
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
});
