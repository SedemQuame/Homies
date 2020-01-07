// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const pledge = require('../controllers/pledges.controller');

    //========================================== app pledges routes ============================================//
    app.route('/pledges')
        .get(pledge.getAllPledges);

    app.route('/pledges')
        .post(pledge.createPledge);
};