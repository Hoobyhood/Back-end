var express = require('express');
var bodyParser = require('body-parser');
var Hobbies = require('../models/Hobby.js')
var mongoose = require('mongoose'),
assert = require('assert'); 
var Schema = mongoose.Schema;
var HobbyRouter = express.Router();
HobbyRouter.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;

var db = mongoose.connection; 

/* GET home page. */
HobbyRouter.route('/')
.get(function(req, res, next) {
    console.log('HobbyRouter');
    db.collection('Hobbies').find({}).toArray(function(err,result){
        if (err) throw err;
        console.log(result);
        res.json(result);
        
    });
})
.post(function (req, res, next) { 
    console.log('post is posted');
    var Hobby = new Hobbies ({Name:req.body.Name });
    console.log('Created Hobby');
    console.log(Hobby);
    db.collection('Hobbies').insertOne({Hobby}, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a newHobby into the Hobbies collection.");
        res.json('added the newHobby \n' + Hobby);
        
        
      });

})
HobbyRouter.route('/:HobName')
.get(function(req ,res,next){
    db.collection('Hobbies').findOne({'Hobby.Name':req.params.HobName},function(err,result){
        if (err) throw err;
        console.log("find parameter is " + req.params.HobName)
        console.log(result);
        res.json(result);
    })
})


module.exports = HobbyRouter;