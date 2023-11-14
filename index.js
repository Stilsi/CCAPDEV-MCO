// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import exphbs from "express-handlebars"; // Import express-handlebars
import User from "./model/userschema.js";
import path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs.engine({extname: 'hbs', defaultLayout: 'main'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use ( express.static(`public`) );
app.use ( express.urlencoded({ extended: true }));
app.use ( bodyParser.urlencoded({ extended: true }));
app.use ( bodyParser.json() );
app.use ( express.json() );

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

// Mount the routes on the main app
app.use("/", routes);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
