// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const homies = require('../controllers/homies.controller');
    const homiesStory = require('../controllers/homieStory.controller');

    //========================================== app users routes ============================================//
    // app.route('')
    //     .get(homies.getHomiesUpdatePreview);

    // app.route('')
    //     .get(homies.getHomieInfo);

    app.route('/homieStoryUpdate')
        .post(homiesStory.addHomieStory);

    // app.route('')
    //     .get(homies.createNewHomieInfo);

    // app.route('')
    //     .get(homies.deleteHomieInfoPermanently);
};