const mongoose =require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const eventSchema =new Schema({

    name:{
        type:String,
        lowercase:true,
        required:true
    },

    info:{
        type: String,
        required: true
    },
    organizer:{
        type: Schema.Types.ObjectId, ref: User
    },

    startDate:{
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        required: true
    },

    genre:[{
        type:String,
        lowercase:true
    }],

    intrested: [{ type: Schema.Types.ObjectId, ref: User }],

    attended: [{ type: Schema.Types.ObjectId, ref: User}]

    //location ?



});

//Create Model
const Event = mongoose.model('event', eventSchema);


//Export Model
module.exports = Event;