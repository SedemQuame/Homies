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
    user.countDocuments({email_address: 'sedem.amekpewu.3@gmail.com'}, (err, result) => {
        console.log(typeof result);
        console.log(result);
        if(result>=1){
            console.log('Stop.');
            res.render(__dirname + './../views/signup.views.ejs', {errorMSG: 'Email Already Exists. Please use a different email to register.'});
        }else{
            console.log('Go ahead.');
                const image = req.files.profile_photo;
                if(image.name == ""){
                    path = __dirname + '/../public/img/';    
                }else{
                    path = __dirname + '/../public/img/' + image.name;
                }
                storedPath = '/img/' + image.name;

                // Starting session.
                sess = req.session;

                // storing user email and name in sessions.
                sess.useremail = req.body.emailAddress;
                sess.username = req.body.name;

                let state = null;

                if(req.body.anon == 'true'){
                    state = true;
                }else {
                    state = false;
                }

                image.mv(path, () => {
                    let password = req.body.password;

                    if(password == null){
                        const generator = require('generate-password');
                        console.log('no password, added. /n generating new password to be sent over email');
                        // generating automatic passwords.
                        password = generator.generate({
                            length: 10,
                            numbers: true
                        });

                        // sending generated password to user's email.
                    }

                    bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
                        // Store hash in your password DB.
                        user.create({
                            name: req.body.name,
                            residence: req.body.residence,
                            user_type: req.body.userType,
                            phone_number: req.body.phoneNumber,
                            email_address: req.body.emailAddress,
                            bio: req.body.bio,
                            password: hash,
                            profile_photo: storedPath,
                            anon: state
                        }).then(() => {
                            console.log('user account created ... 😎😎😎');
                            res.redirect('/dashboard/');
                        }).catch((err) => {
                            console.log('user not created ... 😪🙄😣');
                            res.redirect('/user_signup');
                        });
                    });
                }); 
     }
        
    });
};


// user authentication and logging
exports.login = (req, res) => {
    // nothing at the moment.
    user_to_login = user.where({ email_address: req.body.email_address });
    user_to_login.findOne().then((returnedUser) => {
        // Load hash from your password DB.
        console.log(req.body.password);
        
        bcrypt.compare(req.body.password, returnedUser.password).then(function(response) {
            if (response == true) {
                console.log('redirecting user .../');
                console.log('account found ... 😎😎😎');
                res.redirect('/dashboard');
            } else {
                console.log('account not found ... 🥱🥱🥱');
                console.log('redirecting user .../');
                res.render(__dirname + './../views/login.views.ejs', {errorMSG: 'Wrong Login Credentials'});
            }
        });
    }).catch((err) => {
        console.log('sorry, a serious error occurred ... 😪🙄😣');
        console.log('redirecting user .../');
        console.log(err);
        res.render(__dirname + './../views/login.views.ejs', {errorMSG: 'Wrong Login Credentials'});    });
};