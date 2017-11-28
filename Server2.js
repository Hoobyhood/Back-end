var express = require('express');
var path = require('path'); 
var morgan = require('morgan');
var bodyParser =require('body-parser'); 
var favicon = require('serve-favicon'); 
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose'),
assert = require('assert');  
var routes = require('./routes/index');
var UserRouter = require('./routes/UsersRouter');
var HobbyRouter = require('./routes/HobbyRouter');
var eventRouter = require('./routes/eventRouter');
var hostname = 'localhost'; 
var port = 4000;
var app = express();

var url = 'mongodb://localhost/HB';
mongoose.connect(url,{useMongoClient:true});
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function () {console.log("Connected correctly to server"); });

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade'); 
 
app.use(morgan('dev')); 
app.use('/', routes); 
app.use('/Users', UserRouter);
app.use('/Hobbies', HobbyRouter);
app.use('/Events', eventRouter);
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 



app.listen(port, hostname, function(){ 
  console.log(`Hobby Hood Server running at http://${hostname}:${port}/`); 
});
