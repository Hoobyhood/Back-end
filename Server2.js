var express = require('express');
var morgan = require('morgan');

var bodyParser = require('body-parser'); 

mongoose= require('mongoose');
var app = express();
var hostname = 'localhost'; 
var port = 3080;
const util = require('util');

Users = require('./models/user');

 
app.use(morgan('dev')); 
app.use(bodyParser.json());


//mongoose.Promise=global.Promise;
//mongoose.connect='mongod://localost:27017/HobbyHood';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);


app.listen(port, hostname, function(){ 
    console.log(`Hobby-Hood RESTful API server  running at http://${hostname}:${port}/`); 
  });