var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert'); 
var Users = require('../models/user.js');
var userRouter = express.Router();
userRouter.use(bodyParser.json());
//var MongoClient = require('mongodb').MongoClient, 

// Connection URL 
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function () { 
    
    console.log("Connected correctly to server");
    var collection = db.collection("users");  
userRouter.route('/') 

.get(function (req, res, next) { 
    console.log('get is getted');
    res.json('Will send all the Profiles to you!');
    collection.find({}).toArray(function(err,docs){ 
        assert.equal(err,null); 
        console.log("printed all profiles:"); 
        res.json(docs);
    });
    
    })

.post(function (req, res, next) { 
    console.log('post is posted');
    res.json('Will add the Profile: ' + req.body.name + ' with details: ' + req.body 
    .description);
    collection.insertOne({username:req.body.username , passward: req.body.passward ,Age : req.body.Age}, function 
    (err,result){ 
        assert.equal(err,null); 
        console.log("After Insert:");
        res.json(result.ops);
       
    
});
}) 
db.dropCollection("users", function(err, result){ 
    assert.equal(err,null); 
    db.close(); 
 }); 

});
module.exports = userRouter;