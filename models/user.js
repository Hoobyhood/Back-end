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
    Age :{
        type : Number
    } ,
    Rating :{
        type: Number,
        default : 3,
        max : 5

    },
    Credit: {
        type : Number,
        default : 0
    },
    Image : {
        date : Buffer,
        contentType : String
    },

    Hobbies :[{type: Schema.Types.ObjectId , ref : 'Hobbies'} ] ,
    Events : [{type: Schema.Types.ObjectId , ref : 'Events'}],
    
    
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users; 