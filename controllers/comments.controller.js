// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const comment = require('../models/comments.models');

exports.updateComments = (req, res) => {
    comment.create({ comment: req.body.user_comment, recepientId: req.body.id, senderId: 'sender\'s id' }).then(docs => {
        res.redirect('/get_user/' + req.body.id);
        // res.json({ comment: req.body.user_comment, recepientId: req.body.id, senderId: 'sender\'s id' });

    }).catch(err => {
        // res.json({ error: err });
        res.json({ msg: 'in comments route' });
    });

};