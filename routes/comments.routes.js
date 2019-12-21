// jshint esversion:6
// ================================ creating list application route ===================================//
module.exports = app => {
    const comments = require('../controllers/comments.controller');

    //========================================== app users routes ============================================//
    app.route('/comments')
        .post(comments.updateComments);

};