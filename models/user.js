var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Hobbies = require('./Hobby.js');


var userSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    username:{
        type:String,
        //unique:true,
        required:true

    },
    password:{
        type:String
    },
    email:{
        type:String,
        //unique:true,
        required:true
    },
    Age : Number,
    Rating :{
        type: Number,
        default : 5,
        max : 10

    },
    Credit: {
        type : Number,
        default : 0
    },
    Image : {
        date : Buffer,
        contentType : String
    },

    //Hobbies :[{type: Schema.Types.ObjectId , ref : 'Hobbies'} ] 
    
});

var User = mongoose.model('user', userSchema);
module.exports = User; 