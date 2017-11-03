var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
   ID: number,
    username:{
        type:String,
        unique:true

    },
    password:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    credit:{
        type:number,
        default : 0
    },
    Age : number,
    Name : String,
    Image :{
        Path : String
    }

    

});