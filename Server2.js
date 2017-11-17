var express = require('express');
var path = require('path'); 
var morgan = require('morgan');
var bodyParser =require('body-parser'); 
var favicon = require('serve-favicon'); 
var cookieParser = require('cookie-parser'); 
var routes = require('./routes/index');
var userRouter = require('./routes/users');
var hostname = 'localhost'; 
var port = 4000;
var app = express();


app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'jade'); 
 
app.use(morgan('dev')); 
app.use('/', routes); 
app.use('/users', userRouter);
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.listen(port, hostname, function(){ 
  console.log(`Hobby Hood Server running at http://${hostname}:${port}/`); 
});
