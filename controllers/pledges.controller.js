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
    pledge.create({
        beneficiaryId: null, //take user details provided by routes
        benefactorId: req.body.benefactorId,
        pledgeType: req.body.pledgeType,
        pledge: req.body.pledge,
        pledgeStatus: null,
        dateForFulfillment: req.body.fulfillmentDate
    }).then(() => {
        console.log('adding users pledge to database');
        res.send({msg: `pledge added to database successfully`});

        // todo: route back to, the same page.
        
    }).catch((err) => {
        console.log('pledge not added to database');
        res.send({msg: `pledge not added to database`});
    });
};