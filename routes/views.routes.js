// jshint esversion:6
// ================================ creating list application route ===================================//

const pledges = require('../controllers/pledges.controller');

module.exports = app => {
    // app.route('/pledges').get((req, res) => {
    //     res.render(__dirname + './../views/pledges.views.ejs');
    // });

    app.route('/help_out').get(pledges.getAllPledges);
};