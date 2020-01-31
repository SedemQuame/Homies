// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const user = require('../controllers/users.controller');
    const dashboard = require('../controllers/dashboard.controller');

    //========================================== app users routes ============================================//
    app.route('/user_login')
        .get((req, res) => {
            res.render(__dirname + './../views/login.views.ejs', {errorMSG: null});
    });

    app.route('/user_signup')
        .get((req, res) => {
            res.render(__dirname + './../views/signup.views.ejs', {errorMSG: null});
    });

    // signup route
    app.route('/signup').post(user.createUser);

    app.route('/homieSignup').post(user.createHomie);

    // login route
    app.route('/login').post(user.login);

    // add person route (where person = homeless or handler)
    app.route('/add_person')
        .get(dashboard.getAllUsers);

    // routing to the about page
    app.route('/about_us')
        .get((req, res) => {
            res.render(__dirname + './../views/about.views.ejs', {errorMSG: null});
        });

    // logging out user.
    app.route('/logout')
        .get((req, res) => {
            req.session.destroy(function(err) {
                // cannot access session here
                if(err){
                    res.render(__dirname + './../views/dashboard.views.ejs', {errorMSG: `Logout failed.`});
                }else{
                    res.render(__dirname + './../views/login.views.ejs', {errorMSG: `Logout successful.`});
                }
              });
        });
};