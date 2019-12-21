//jshint esversion:6
// ===================================== requiring node modules ===================================== //
const mongoose = require('mongoose');

// ==================================== creating database schema=======================================//
const userSchema = mongoose.Schema({
    name: String,
    age: String,
    race: String,
    gender: String,
    phone_number: String,
    email_address: String,
    special_skills: String,
    medical_history: String,
    password: String,
    optional_message: String,
    residence: { type: String, default: 'none' },
    handler: { type: String, default: 'none' },
    user_type: { type: String, default: 'homeless' },
    profile_url: { type: String, default: 'none' }
});


// ==================================== creating schema model =========================================//
module.exports = mongoose.model('user', userSchema);