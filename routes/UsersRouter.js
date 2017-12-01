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
    //res.json('Will add the Profile: ' + req.body.username + ' with details: ' + req.body.Age);
    var USER = new Users ({username:req.body.username ,password:req.body.password ,email:req.body.email
         , DateOfBirth:new Date (req.body.DateOfBirth) , Phone:req.body.phone , Gender: req.body.gender });
         db.collection('Hobbies').findOne({'Hobby.Name':req.body.Hobbies},function(err,userHob){
            if (err) throw err;
            console.log(userHob);
        USER.Hobbies.push(userHob);
        USER.save();
    })
    
    console.log('Created USER');
    console.log(USER);
    db.collection('Users').insertOne({USER}, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a newUser into the Users collection.");
        res.json('added the newUser \n' + USER);
        
        
      });

})
.delete(function(req,res,next) {
    console.log('delete was choosed');
    db.collection('Users').remove({"USER.username":req.body.username}, function(err, result){
        if (err) throw err;
        assert.equal(err, null); 
        console.log("Removed the document " + req.body.username);
        res.json('Deleted the User')
    })

});

usersRouter.route('/:UserID' )
.get(function(req , res,next ){
    db.collection('Users').find({'USER.username':req.params.UserID}).exec(function(err,result){
        if (err) throw err;
        console.log("find parameter is " + req.params.UserID)
        console.log(result);
        res.json(result);

})
})
/*.put(function(req, res, next){ 

    db.collection('Users').update()

    db.collection('Users').update({'USER.username':req.params.UserID}).toArray(function(err,result){
        if (err) throw err;
        console.log("find parameter is " + req.params.UserID)
        console.log(result);
    res.json(result); 
    })
});*/
/*db.dropCollection("users", function(err, result){ 
    assert.equal(err,null); 
    
 }); */

 db.close(); 

module.exports = usersRouter;