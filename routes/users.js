var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Users = require('../models/user.js');
var userRouter = express.Router();
userRouter.use(bodyParser.json());
userRouter.route('/') 

.get(function (req, res, next) { 
    console.log('get is getted');
    res.json('Will send all the Profiles to you!');
    
    })

.post(function (req, res, next) { 
    console.log('post is posted');
    res.json('Will add the Profile: ' + req.body.name + ' with details: ' + req.body 
    .description);;
}) 


module.exports = userRouter;