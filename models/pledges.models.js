//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const pledgeSchema = mongoose.Schema({
    beneficiaryId: String,
    benefactorId: String,
    pledgeType: String,
    pledge: String,
    pledgeStatus: String,
    dateForFulfillment: String
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('pledge', pledgeSchema);