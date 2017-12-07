var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hobbies = require('./Hobby.js');
var Events = require('./Event.js');
var bcrypt = require('bcryptjs'); 

//var passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username:{
        type:String,
        unique:true,
        required:true

    }, 
    password:{
        type:String,
        required : true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    Phone:{
        type : String
    },
    DateOfBirth :{
        type : Date
    } ,
    Rating :{
        type: Number,
        default : 3,
        max : 5

    },
    Gender :{
        type : String
    },
    Credit: {
        type : Number,
        default : 0
    },
    Image : {
        type : String,
        default: "../public/images/martina_dimitrova.jpg"
    },

    Hobbies :[{type: Schema.Types.ObjectId , ref : 'Hobbies'}] ,
    Events : [{type: Schema.Types.ObjectId , ref : 'Events'}],
    Friends: [{type: Schema.Types.ObjectId , ref: 'Users' }]
    
    
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users; 

module.exports.getUserbyUsername = function(username,callback){
    
        var qeury = {username:username};
        Users.findOne(qeury,callback);
    }
module.exports.comparePassword = function(candidatePassword,hash,callback ){
        bcrypt.compare (candidatePassword,hash,function(err,isMatched){
            if(err) throw err;
            callback(null,isMatched);
    
        })
    }
    
    module.exports.getUserbyId = function(id,callback){
        
            Users.findById(id,callback);
        }

    module.exports.createUser =function (newUser ,salt ,callback){
        bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt ,function(err,hash){
            newUser.password=hash;
            newUser.save(callback);
        })
    })
}