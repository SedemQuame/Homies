// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const pledge = require('../models/pledges.models');

exports.getAllPledges = (req, res) => {
    try {
        pledge.find().then(docs => {
            return docs;
        });
    } catch (error) {
        return null;
    }
};

exports.createPledge = (req, res) => {  
    console.log(req.body);
    
    pledge.create({
        beneficiaryId: req.body.beneficiaryId, //take user details provided by routes
        benefactorId: req.body.benefactorId,
        pledgeType: req.body.pledgeType,
        pledge: req.body.pledge,
        pledgeStatus: null,
        dateForFulfillment: req.body.fulfillmentDate
    }).then(() => {
        console.log('adding users pledge to database');
        res.redirect('/get_all_users');
    }).catch((err) => {
        console.log('pledge not added to database');
        res.redirect('/get_all_users', {msg: `Pledge not added, please wait an try again.`});
    });
};