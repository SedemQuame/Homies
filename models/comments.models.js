//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const commentSchema = mongoose.Schema({
    comment: String,
    recepientId: String,
    senderId: String
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('comment', commentSchema);