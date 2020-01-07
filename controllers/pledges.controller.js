// jshint esversion:6
require('dotenv').config({ path: __dirname + './../.env' });

//====================================== requiring modules ===========================================//
// node modules

// custom models
const pledge = require('../models/pledges.models');

exports.getAllPledges = (req, res) => {
    pledge.find().then(docs => {
        // console.log(docs);
        res.send({collections: docs});
    }).catch(err => {
        res.json({ error: err });
    });
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