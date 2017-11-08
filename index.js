var express = require('express'),
app = express(),
mongoose= require('mongoose'),
User = require('./models/user'),
bodyParser = require('body-parser'),
port = process.env.PORT || 3000;


mongoose.Promise=global.Promise;
mongoose.connect='mongod://localost/hobhod';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json);

var routes = require('./routes/users');




app.listen(port);
console.log('Hobby-Hood RESTful API server started on: ' + port+" is Live");

