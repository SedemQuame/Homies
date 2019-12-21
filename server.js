// jshint esversion: 6
require('dotenv').config();

// requiring modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

// custom user modules
const db = require('./config/database.config');

// creating mongoose connection to db
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });
// mongoose.set('useCreateIndex', true);

//creating app
const app = express();
// app.set('views', __dirname + '/views');

// parse requests of content-type - application/x-www-form-urlencoded
app.use(fileupload(), bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// serving static files in express
app.use(express.static(__dirname + '/public'));
// app.use(express.static('public/img'));


//====================================== requiring list routes ========================================//
require('./routes/users.routes')(app);
require('./routes/views.routes')(app);
require('./routes/dashboard.routes')(app);


// define a simple route
app.get('/', (req, res) => {
    // uncomment the line below to display results in postman.
    // res.json({ "message": "hacking-homeless, reducing homelessness one person at a time." });

    // useful for rendering views in browser
    res.redirect('/user_login');
});


// listening port
let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`app started on port: ${port}`);
});