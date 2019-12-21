// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules
const bcrypt = require('bcrypt');
const fs = require('fs');

// custom models
const user = require('../models/users.models');
const SALT_ROUNDS = 12;

let sess;
let storedPath, path;

//================================== creating HTTP handler methods ==================================//
// create new user
exports.createUser = (req, res) => {
    const image = req.files.profile_url;
    path = __dirname + '/../public/img/' + image.name;
    storedPath = '/img/' + image.name;

    // Starting session.
    sess = req.session;

    // storing user email and name in sessions.
    sess.useremail = req.body.emailAddress;
    sess.username = req.body.name;

    image.mv(path, () => {
        bcrypt.hash(req.body.password, SALT_ROUNDS, function(err, hash) {
            // Store hash in your password DB.
            user.create({
                name: req.body.name,
                user_type: req.body.userType,
                phone_number: req.body.phoneNumber,
                email_address: req.body.emailAddress,
                residence: req.body.residence,
                handler: req.body.handler,
                age: req.body.age,
                race: req.body.race,
                gender: req.body.gender,
                special_skills: req.body.specialSkills,
                medical_history: req.body.medHistory,
                password: hash,
                optional_message: req.body.optionalMessage,
                profile_url: storedPath
            }).then(() => {
                console.log('user account created ... 😎😎😎');
                res.redirect('/dashboard/');
            }).catch((err) => {
                console.log('user not created ... 😪🙄😣');
                res.redirect('/user_signup');
            });
        });
    });
};


// user authentication and logging
exports.login = (req, res) => {
    // nothing at the moment.
    user_to_login = user.where({ email_address: req.body.email_address });
    user_to_login.findOne().then((returnedUser) => {
        // Load hash from your password DB.
        bcrypt.compare(req.body.password, returnedUser.password).then(function(response) {
            if (response == true) {
                console.log('redirecting user .../');
                console.log('account found ... 😎😎😎');
                res.redirect('/dashboard');
            } else {
                console.log('account not found ... 🥱🥱🥱');
                console.log('redirecting user .../');
                res.redirect('/user_login');
            }
        });
    }).catch((err) => {
        console.log('sorry, a serious error occurred ... 😪🙄😣');
        console.log('redirecting user .../');
        console.log(err);
        res.redirect('/user_login');
    });
};