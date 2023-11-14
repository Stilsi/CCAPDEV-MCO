import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import User from "./model/userschema.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// routes
const routes = express.Router();

routes.route("/user/:id").get(function (req, res) {
    User.findById(req.params.id).then((user) => {
        res.json(user);
        res.end();
    });
});

routes.route("/user").get(function (req, res) {
    User.find().then((user) => {
        res.json(user);
        res.end();
    });
});

routes.route("/user").post(function (req, res) {
    const user = new User({
        username: req.body.username,
        bio: req.body.bio,
        password: req.body.password,
        email: req.body.email,
    });
    user.save();
    res.json({ message: "User saved." });
});

// Mount the routes on the main app
app.use("/", routes);

// app listen
app.listen(3000, () => {
    console.log("App started");
    mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
});