//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const homieStorySchema = mongoose.Schema({
    homieUnderReview: String,
    homieReport: String,
    progressScore: String
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('homieStory', homieStorySchema);