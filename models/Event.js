var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./user.js');
var Hobbies = require('./Hobby.js');



var EventSchema = new Schema (
    {
        _id : Schema.Types.ObjectId,
        Name : String,
        Admin : {type: Schema.Types.ObjectId , ref : 'Users'},
        specification : {type: Schema.Types.ObjectId , ref : 'Hobbies'},      
        Location : String,
        Date : Date ,
        Rating : {
            rate : Number, 
            user : {type: Schema.Types.ObjectId , ref : 'Users'},
            Comment : String 
        },
        Gallery :{
            Images: [{
                date : Buffer,
                contentType : String
            }]
        }

    }
) 
var Event = mongoose.model('Events', EventSchema);

module.exports = Event; 