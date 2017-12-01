var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Users = require('./user.js');
var Hobbies = require('./Hobby.js');



var EventSchema = new Schema (
    {
        _id : Schema.Types.ObjectId,
        Name : 
        {
            type : String
        },
        Admin : {type: Schema.Types.ObjectId , ref : 'Users'},
        specification : {type: Schema.Types.ObjectId , ref : 'Hobbies'},      
        Location : {
            type : String
        },
        Start_Date :{
            type :Date
        },
        End_Date :{
            type :Date
        },
        Rating : {
            rate : Number, 
            user : {type: Schema.Types.ObjectId , ref : 'Users'},
            Comment : String 
        },
        Gallery :{
            Images: [{
                type : String
            }]
        }

    }
) 
var Event = mongoose.model('Events', EventSchema);

module.exports = Event; 