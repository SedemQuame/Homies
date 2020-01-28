// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const homieStory = require('../models/homieStory.models');
exports.addHomieStory = (req, res) => {
    homieStory.create({
        homieUnderReview: req.body.homieUnderReview,
        homieReport: req.body.homieReport,
        progressScore: req.body.progressScore
     }).then(() => {
         console.log("Updated homie information.");
         res.redirect('/dashboard/');
    }).catch(() => {
        res.render(__dirname + './../views/login.views.ejs', {errorMSG: 'User authentication, failed.'});
     });
};