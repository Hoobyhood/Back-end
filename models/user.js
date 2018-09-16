var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({

    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    creation_dt:{type:Date,required:true},

});


schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function (hashpassword){
    return bcrypt.compareSync(hashpassword,this.password);
}

module.exports =mongoose.model('User',schema);
