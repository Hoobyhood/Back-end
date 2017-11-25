var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert'); 
var Users = require('../models/user.js');
var Schema = mongoose.Schema;
var usersRouter = express.Router();
usersRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;

var db = mongoose.connection; 
    
usersRouter.route('/') 

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
    var USER = new Users ({username:req.body.username ,password:req.body.password ,email:req.body.Email
        ,Hobbies:req.body.Hobbies , Age:req.body.Age });
    console.log('Created USER');
    console.log(USER);
    db.collection('Users').insertOne({USER}, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a newUser into the Users collection.");
        res.json('added the newUser \n' + USER);
        
        
      });

})
.delete(function(req,res,next) {
    console.log('delete is choosed');
    db.collection('Users'),deleteOne({username:req.body.username}, function(err, result){
        assert.equal(err, null); 
        console.log("Removed the document " + req.body.username);
    })


});

usersRouter.route('/:UserID' )
.get(function(req , res,next ){
    db.collection('Users').find({Name:req.params.UserID},function(err,result){
        if (err) throw err;
        console.log("find parameter is " + req.params.UserID)
        console.log(result);
        res.json(result);

})
});
/*db.dropCollection("users", function(err, result){ 
    assert.equal(err,null); 
    db.close(); 
 }); */

module.exports = usersRouter;