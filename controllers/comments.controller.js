// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// custom models
const comment = require('../models/comments.models');

exports.updateComments = (req, res) => {
    // Starting session.
    let sess = req.session;
    comment.create({ comment: req.body.user_comment, recepientId: req.body.id, senderId: sess.username }).then(docs => {
        res.redirect('/get_user/' + req.body.id);
    }).catch(err => {
        res.json({ msg: 'in comments route' });
    });

};