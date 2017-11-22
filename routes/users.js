var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert'); 
var Users = require('../models/user.js');
var Schema = mongoose.Schema;
var userRouter = express.Router();
userRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;

// Connection URL 
var url = 'mongodb://localhost/HB';
mongoose.connect(url,{useMongoClient:true});
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function () {console.log("Connected correctly to server"); });
    

//var collection = db.collection('users');  
userRouter.route('/') 

.get(function (req, res, next) { 
    console.log('get is getted');
    //res.json('Will send all the Profiles to you!');
    db.collection('Users').find({}).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
        
    });
    
    
    })

.post(function (req, res, next) { 
    console.log('post is posted');
    //res.json('Will add the Profile: ' + req.body.username + ' with details: ' + req.body.Age);
    var USER = new Users ({username:req.body.username ,password:req.body.password , Age:req.body });
    console.log('Created USER');
    console.log(USER);
    db.collection('Users').insertOne({USER}, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a newUser into the Users collection.");
        res.json('added the newUser \n' + USER);
        
        
      });

}) ;
/*db.dropCollection("users", function(err, result){ 
    assert.equal(err,null); 
    db.close(); 
 }); */

module.exports = userRouter;