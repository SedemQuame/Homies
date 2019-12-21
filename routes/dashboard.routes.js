// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const dashboard = require('../controllers/dashboard.controller');

    //========================================== app users routes ============================================//
    app.route('/get_all_users')
        .get(dashboard.getAllUsers);

    app.route('/get_user/:user_id')
        .get(dashboard.getSingleUser);

    app.route('/dashboard/')
        .get(dashboard.getUser);
};