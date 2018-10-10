const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/HH');
const app = express();

//Midllewares
app.use(morgan('dev'));
app.use(express.json());


//Routes 
app.use('/users',require('./routes/users'));
app.use('/events',require('./routes/events'));



//Start the Server 
const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`server is listing at ${PORT}`);
