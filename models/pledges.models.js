//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const pledgeSchema = mongoose.Schema({
    pledger: String,
    beneficiary: String,
    amount: String,
    dateForFulfillment: String
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('pledge', pledgeSchema);