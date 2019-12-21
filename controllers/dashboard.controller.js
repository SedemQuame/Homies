// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const users = require('../models/users.models');

exports.getAllUsers = (req, res) => {
    users.find().then(docs => {
        // console.log(docs);
        res.render(__dirname + './../views/allusers.views.ejs', { list: docs });

        // res.json({ results: docs });
    }).catch(err => {
        res.json({ error: err });
    });
};

exports.getSingleUser = (req, res) => {
    console.log(req.params.user_id);
    users.findById(req.params.user_id).then(docs => {
        // console.log(docs);
        res.render(__dirname + './../views/homeless.views.ejs', { data: docs });
    }).catch(err => {
        res.json({ error: err });
    });
};

exports.getUser = (req, res) => {
    console.log(req.params.user_id);
    users.findById(req.params.user_id).then(docs => {
        // console.log(docs);
        res.render(__dirname + './../views/dashboard.views.ejs', { data: docs });
    }).catch(err => {
        res.json({ error: err });
    });
};