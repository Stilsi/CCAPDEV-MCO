
import express from "express";
import User from "../model/userschema.js";


const router = express.Router();

router.get('/', function(req, res) {
    const locations = ['Establishments', 'Agno Street', 'Taft Avenue', 'Leon Guinto'];
    res.render('homepage', {locations: locations});
});

export default router;
