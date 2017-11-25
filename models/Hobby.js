var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./user.js');



var HobbySchema = new Schema (
    {
        _id : Schema.Types.ObjectId,
        Name : String,
        
    }
) 
const Hobbies = mongoose.model('Hobby', HobbySchema);

module.exports = Hobbies; 