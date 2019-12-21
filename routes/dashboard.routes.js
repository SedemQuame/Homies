// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const dashboard = require('../controllers/dashboard.controller');

    //========================================== app users routes ============================================//
    app.route('/get_all_users')
        .get(
            // res.json({ msg: 'trying to get all user data' });
            dashboard.getAllUsers);

    app.route('/get_user/:user_id')
        .get(
            dashboard.getSingleUser
            // (req, res) => {
            // res.render(__dirname + './../views/dashboard.views.ejs');
            // res.json({ msg: 'getting a single user\'s data' });}
        );

    app.route('/dashboard/:my_id')
        .get(dashboard.getUser);

};