const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
var port = process.env.PORT || 4000;
var app = express();

 mongoose.connect('mongodb://localhost/hobhod',useMongoClient = true);

 mongoose.Promise=global.Promise;
//var promise = mongoose.connect('mongodb://localhost/hobhod',useMongoClient=true);

app.use(bodyParser.json());
app.use(require('./routes/users'));


app.listen(port);
console.log('Hobby-Hood RESTful API server started on: ' + port+" is Live");
