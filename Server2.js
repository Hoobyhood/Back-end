var mongoose = require('mongoose'), 
assert = require('assert'); 
var Users = require('./models/user.js'); 
// Connection URL 
var url = 'mongodb://localhost:27017/conFusion'; 
mongoose.connect(url); 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:')); 
db.once('open', function () { 
// we're connected! 
console.log("Connected correctly to server"); 
// create a new user 
var newUser = Users({ 
    username: 'John', 
    Password: 'j123456' ,
    email : 'john.jones@gmail.com'
    
}); 
console.log("USer Data was entered ");
// save the user 
newUser.save(function (err) { 
    if (err) throw err; 
    console.log('User created!'); 
    // get all the users 
    Users.find({}, function (err, users) { 
        if (err) throw err; 
        // object of all the users 
        console.log(Users); 
                    db.collection('Users').drop(function () { 
            db.close(); 
        }); 
    }); 
}); 
});