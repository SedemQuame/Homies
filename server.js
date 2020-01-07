// jshint esversion: 6
require('dotenv').config();

// requiring modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const session = require('express-session');

// custom user modules
const db = require('./config/database.config');

// creating mongoose connection to db
mongoose.connect(db.url, { useUnifiedTopology: true, useNewUrlParser: true });

//creating app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(fileupload(), bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// serving static files in express
app.use(express.static(__dirname + '/public'));

// using sessions in node app
app.use(session({
    'secret': '343ji43j4n3jn4jk3n',
    resave: true,
    saveUninitialized: true
}));

//====================================== requiring list routes ========================================//
require('./routes/users.routes')(app);
require('./routes/views.routes')(app);
require('./routes/dashboard.routes')(app);
require('./routes/comments.routes')(app);
require('./routes/pledge.routes')(app);

// define a simple route
app.get('/', (req, res) => {
    res.redirect('/user_login');
});

// listening port
let port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`app started on port: ${port}`);
});