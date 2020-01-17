// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const users = require('../models/users.models');

exports.getHomiesUpdatePreview = () => {
    try {
        users.find({user_type: "Homie"}).then(docs => {                  
            return docs;
        });
    } catch (error) {
        return null;
    }
};

exports.getHomieInfo = (req, res) => {
    // find homie data by id.
    users.findById(id, (err, docs) => {
        if(err){
            res.send({});
        }else{
            res.send({});
        }
    });
};

exports.updateHomieInfo = (req, res) => {  
    // update homie data by id.
    users.findByIdAndUpdate(id, update, () => {
        // redirect to homie information page
    });
};

exports.createNewHomieInfo = (req, res) => {

};

exports.deleteHomieInfoPermanently = (req, res) => {
    users.findByIdAndRemove(id, () => {
        // redirect to page with a message.
    });
};