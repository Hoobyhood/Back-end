var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./user.js');



var HobbySchema = new Schema (
    {
        //_id : Schema.Types.ObjectId,
        Name : String,
        //Fans : [{type: Schema.Types.ObjectId , ref : 'Users'} ] 
    }
) 
var Hobbies = mongoose.model('Hobby', HobbySchema);

module.exports = Hobbies; 