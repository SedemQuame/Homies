// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules
const bcrypt = require('bcrypt');
// const passport = require('passport');
// const formidable = require('formidable');
const fs = require('fs');



// custom models
const user = require('../models/users.models');

// use static authenticate method of model in LocalStrategy
// passport.use(user.createStrategy());

// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());

const SALT_ROUNDS = 12;

//================================== creating HTTP handler methods ==================================//
// create new user
exports.createUser = (req, res) => {
    const image = req.files.profile_url;

    console.log(image);

    const path = __dirname + '/../public/img/' + image.name;
    const storedPath = '/img/' + image.name;

    image.mv(path, (error) => {
        if (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ status: 'error', message: error }));
            return;
        }

        // res.writeHead(200, { 'Content-Type': 'application/json' });
        // res.end(JSON.stringify({ status: 'success', path: '/images/' + image.name }));

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
                console.log('spinning user account ... 🥱🥱🥱');
                console.log('user account created ... 😎😎😎');
                console.log('redirecting user .../');
                res.redirect('/dashboard');
                // res.json({ result: 'success' });
            }).catch((err) => {
                console.log('spinning user account ... 🥱🥱🥱');
                console.log('user not created ... 😪🙄😣');
                console.log('redirecting user .../');
                console.log(err);
                // res.json({ result: 'failure' });
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
                res.json({ msg: 'login successful' });
            } else {
                console.log('account not found ... 🥱🥱🥱');
                console.log('redirecting user .../');
                res.redirect('/user_login');
                // res.json({ msg: 'login failed' });
            }
        });
    }).catch((err) => {
        console.log('sorry, a serious error occurred ... 😪🙄😣');
        console.log('redirecting user .../');
        console.log(err);
        res.redirect('/user_login');
    });
};