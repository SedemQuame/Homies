//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const userSchema = mongoose.Schema({
    // personal information
    name: String,
    user_type: {type: String, default: 'Individual'},
    residence: { type: String, default: 'none' },
    bio: String,

    // contact information
    phone_number: String,
    email_address: String,
    password: String,
    profile_photo: { type: String, default: 'none' },
    anon: {type: Boolean, default: false}
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('user', userSchema);