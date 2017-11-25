var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert'); 
var Events = require('../models/Event.js');
var Schema = mongoose.Schema;
var eventRouter = express.Router();
eventRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var db = mongoose.connection; 
    
eventRouter.route('/') 

.get(function (req, res, next) { 
    console.log('get is getted');
    //res.json('Will send all the Profiles to you!');
    db.collection('Event').find({}).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
        
    });
    
    })

.post(function (req, res, next) { 
    console.log('post is posted');
    //res.json('Will add the Profile: ' + req.body.username + ' with details: ' + req.body.Age);
    
    var EVENT = new Events({Name:req.body.Name
    ,Admin:req.body.Admin
    ,sps:req.body.specification
    ,location:req.body.Location
    ,Date:req.body.Date
    ,rating:req.body.Rating
    })
    
    console.log('Event Created ');
    console.log(EVENT);
    db.collection('Events').insertOne({EVENT}, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a newEvent into the Events collection.");
        res.json('added the newEvent \n' + EVENT);
        
        
      });

})
.delete(function(req,res,next) {
    console.log('delete is choosed');
    db.collection('Events'),deleteOne({name:req.body.Name}, function(err, result){
        assert.equal(err, null); 
        console.log("Removed the document " + req.body.username);
    })


});
//
// usersRouter.route('/:UserID' )
// .get(function(req , res,next ){
//     db.collection('Users').find({Name:req.params.UserID},function(err,result){
//         if (err) throw err;
//         console.log("find parameter is " + req.params.UserID)
//         console.log(result);
//         res.json(result);

// })
// });

module.exports = eventRouter;