//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const homieSchema = mongoose.Schema({
    homieId: String,
    postMsg: String,
    postPhotoUrl: String
});

// ==================================== creating schema model =========================================//
module.exports = mongoose.model('homie', homieSchema);