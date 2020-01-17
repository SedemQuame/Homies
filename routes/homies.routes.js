// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const homies = require('../controllers/homies.controller');

    //========================================== app users routes ============================================//
    app.route('')
        .get(homies.getHomiesUpdatePreview);

    app.route('')
        .get(homies.getHomieInfo);

    app.route('')
        .get(homies.updateHomieInfo);

    app.route('')
        .get(homies.createNewHomieInfo);

    app.route('')
        .get(homies.deleteHomieInfoPermanently);
};