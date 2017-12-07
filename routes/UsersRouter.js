//import { request } from "https";

var passport = require('passport');
var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose'),
    assert = require('assert'); 
var Users = require('../models/user.js');
var Hobbies = require('../models/Hobby.js');
var Schema = mongoose.Schema;
var usersRouter = express.Router();
usersRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var LocalStrategy = require('passport-local').Strategy;


var db = mongoose.connection; 
    
usersRouter.route('/') 

.get(function(req, res, next) {
    console.log('Get is Getted ');
    Users.find({}).populate().exec(function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
        
    });
    
})
.post(function (req, res, next) { 
    console.log('post is posted');
    Hobbies.findOne({'Name':req.body.Hobbies},function(err,userHob){
        if (err) throw err;
        console.log(userHob);
    var USER = new Users ({username:req.body.username ,password:req.body.password ,email:req.body.email
          , Phone:req.body.phone , Gender: req.body.gender 
         , _id: new mongoose.Types.ObjectId() });
        USER.DateOfBirth = new Date (req.body.DateOfBirth)
        USER.Hobbies.push(userHob._id);
        USER.save(function (err){
            if (err) throw err;
        });
    
    console.log('Created USER');
    // Users.insertMany({USER}, function(err, result) {
    //     if (err) throw err;
    //     assert.equal(err, null);
    //     console.log("Inserted a newUser into the Users collection.\n" + USER);
    //   })
    res.json(USER);

})
})

.delete(function(req,res,next) {
    console.log('delete was choosed');
    Users.remove({"username":req.body.username}, function(err, result){
        if (err) throw err;
        assert.equal(err, null); 
        console.log("Removed the document " + req.body.username);
        res.json('Deleted the User')
    })

});

usersRouter.route('/:UserID' )
.get(function(req , res,next ){
    Users.findOne({'USER.username':req.params.UserID}).populate('Hobbies')
    .exec(function(err,result){
        if (err) throw err;
        console.log('the result is \n',result);
        res.json(result);
    })
//     db.collection('Users').findOne({'USER.username':req.params.UserID} ,function(err,result){
//         if (err) throw err;
//         console.log("find parameter is " + req.params.UserID)
//         console.log(result);
//         res.json(result);

// })
})
.put(function(req, res, next){ 

    Users.update({'USER.username':req.params.UserID} , {USER:{username:req.body.username ,password:req.body.password ,email:req.body.email
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

 usersRouter.route('/signup')
 .post(function(req,res,next){
     var username = req.body.username,
     password = req.body.password,
     email =  req.body.email,
     age = req.body.dateofbirth,
     phone = req.body.phonenumber;
  console.log(username);
 var newUSER = new Users({
    _id: new mongoose.Types.ObjectId(), 
     username : username,
     password : password, 
     email : email , 
     Phone : phone,
     DateOfBirth :new Date(age) 
 })
 Users.createUser(newUSER , function (err, user){
     if (err) throw err;
     consol.log(newUSER.username);
     res.json(newUSER);
 })
})

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log ( username +'\n'+password)
        Users.getUserbyUsername(username,function(err,user){
            if (err) throw err;
            console.log(user);

            if(!user)
                return done(null,false,{msg:'unknown user'});
            
            Users.comparePassword(password,user.password,function(err,isMatched){
                if(err) throw err;

                if(isMatched){
                    return done(null,user);
                } else{
                    return done(null,false,{msg:'invalid password'});
                }

            })

        })
    
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Users.getUserbyId(id, function(err, user) {
          done(err, user);
        });
      });

usersRouter.route('/login')
.post(passport.authenticate('local',{successRedirect:'/',failureRedirect:'/userlogin',}),
    function(req, res) {
        console.log('Logged INN');
    }
    
);

db.close();
module.exports = usersRouter;