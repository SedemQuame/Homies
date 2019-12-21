// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const pledge = require('../models/pledges.models');

exports.getAllPledges = (req, res) => {
    pledge.find().then(docs => {
        // console.log(docs);
        res.render(__dirname + './../views/pledge_form.views.ejs', { pledges: docs });
    }).catch(err => {
        res.json({ error: err });
    });
};