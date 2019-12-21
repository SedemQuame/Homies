// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const users = require('../models/users.models');
const comment = require('../models/comments.models');

let sess = null;



exports.getAllUsers = (req, res) => {
    sess = req.session;
    users.find().then(docs => {
        // console.log(docs);
        res.render(__dirname + './../views/allusers.views.ejs', { list: docs, emailAdd: sess.useremail });

        // res.json({ results: docs });
    }).catch(err => {
        res.json({ error: err });
    });
};

exports.getSingleUser = (req, res) => {
    users.findById(req.params.user_id).then(docs => {
        // console.log(docs);
        comment.find().then(com => {
            res.render(__dirname + './../views/homeless.views.ejs', { data: docs, colls: com, user_id: req.params.user_id });
        });
    }).catch(err => {
        res.json({ error: err });
    });
};

exports.getUser = (req, res) => {
    // saving users id in sessions.
    sess = req.session;
    users.findOne({ 'email_address': sess.useremail })
        .select('_id')
        .then(results => {
            sess.user_id = results._id;
            users.findById(results._id).then(docs => {
                console.log(docs);
                res.render(__dirname + './../views/dashboard.views.ejs', { data: docs });
            });
        }).catch(err => {
            res.json({ error: err });
        });
};