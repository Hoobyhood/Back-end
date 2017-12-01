var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hobbies = require('./Hobby.js');
var Events = require('./Event.js');


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

    Hobbies :[{type: Schema.Types.ObjectId , ref : 'Hobbies'} ] ,
    Events : [{type: Schema.Types.ObjectId , ref : 'Events'}],
    Friends: [{type: Schema.Types.ObjectId , ref: 'Users' }]
    
    
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users; 