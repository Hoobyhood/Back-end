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
    db.collection('Users').find({}).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
        
    });
    })
.post(function (req, res, next) { 
    console.log('post is posted');
    db.collection('Hobbies').findOne({'Hobby.Name':req.body.Hobbies},function(err,userHob){
        if (err) throw err;
        console.log(userHob);
    var USER = new Users ({username:req.body.username ,password:req.body.password ,email:req.body.email
         , DateOfBirth:new Date (req.body.DateOfBirth) , Phone:req.body.phone , Gender: req.body.gender
        , Hobbies : userHob });
        console.log(req.body.Hobbies);
        
        USER.save();
        console.log(USER.Hobbies);
    
    console.log('Created USER');
    db.collection('Users').insertOne({USER}, function(err, result) {
        if (err) throw err;
        assert.equal(err, null);
        console.log("Inserted a newUser into the Users collection.\n" + USER);
        
      })
        res.json(USER);

})
})

.delete(function(req,res,next) {
    console.log('delete was choosed');
    db.collection('Users').remove({"USER.Gender":req.body.gender}, function(err, result){
        if (err) throw err;
        assert.equal(err, null); 
        console.log("Removed the document " + req.body.gender);
        res.json('Deleted the User')
    })

});

usersRouter.route('/:UserID' )
.get(function(req , res,next ){
    /*db.collection('Users').findOne({'USER.username':req.params.UserID}).populate('Hobbies')
    .exec(function(err,result){
        if (err) throw err;
        console.log('th hobbies are %s',USER.Hobbies[0].Name)
    })*/
    db.collection('Users').findOne({'USER.username':req.params.UserID} ,function(err,result){
        if (err) throw err;
        console.log("find parameter is " + req.params.UserID)
        console.log(result);
        res.json(result);

})
})
.put(function(req, res, next){ 

    db.collection('Users').update({'USER.username':req.params.UserID} , {USER:{username:req.body.username ,password:req.body.password ,email:req.body.email
        , DateOfBirth:new Date (req.body.DateOfBirth) , Phone:req.body.phone , Gender: req.body.gender}},
    function(err,updated){
        if (err) throw err;
        console.log(updated);
        res.json(updated); 
    })
});
/*db.dropCollection("users", function(err, result){ 
    assert.equal(err,null); 
    
 }); */

 db.close(); 

module.exports = usersRouter;