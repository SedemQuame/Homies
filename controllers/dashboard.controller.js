// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const users = require('../models/users.models');
const comment = require('../models/comments.models');
const pledge = require('../models/pledges.models');
const homieStory = require('../models/homieStory.models');

// custom controllers
const homiesController = require('../controllers/homies.controller');
const pledgeController = require('../controllers/pledges.controller');

let sess = null;

exports.getAllUsers = (req, res) => {
    sess = req.session;
    users.find().then(docs => {
        console.log(docs);
        
        res.render(__dirname + './../views/allusers.views.ejs', { list: docs, emailAdd: sess.useremail });
    }).catch(err => {
        res.json({ error: err });
    });
};

exports.getSingleUser = (req, res) => {
    users.findById(req.params.user_id).then(docs => {
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
    
    // Error: session is not storing the email of the user to query the database,
    // Hence user is presented with an error on page reload.
    // Must fix problem priority Beta.
    users.findOne({ 'email_address': sess.useremail })
        .select('_id')
        .then(results => {
            sess.user_id = results._id;
            users.findById(results._id).then(docs => {
                // getting homies update preview
                // let homieDocs = homiesController.getHomiesUpdatePreview();
                    try {
                        users.find({user_type: "Homie"}).then(homieDocs => {                  
                            console.log(homieDocs);
                            // getting pledge update preview
                            // let pledgeDocs = pledgeController.getAllPledges();
                            pledge.find().then(pledgeDocs => {
                                // console.log(pledgeDocs);
                                homieStory.find().then(story => {
                                    res.render(__dirname + './../views/dashboard.views.ejs',
                                                { data: docs, homies: homieDocs, pledges: pledgeDocs, homieStory: story});
                                });
                            });
                        });
                    } catch (error) {
                        console.log("Error ocurred.");
                        console.log(error);
                    }

            });
        }).catch(err => {
            // redirect user to the login page.
            // with and error message, if an error occurs.
            res.render(__dirname + './../views/login.views.ejs', {errorMSG: 'User Authentication Unsuccessful.'});
        });
};
