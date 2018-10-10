const Event = require('../models/event');

module.exports = {

    postEvent : async (req,res,next)=>{
        const event = new Event({
            name:req.body.name,

            info: req.body.info,

            startDate: req.body.startDate,

            endDate: req.body.endDate,

            genre:req.body.genre


        });

        await event.save();
        res.status(200).json({ 'message': 'recived ' });
    },


    //search functions by event name or by a tag or an upcoming date
    searchTitle: async (req,res,next)=>{
        const searchName = req.body.name;

        const found = await Event.find({ name:/[searchName]/i},
            {new:true});
        
        console.log(typeof(found));
        
        
        res.status(200).json( { 'message': 'recived ',found });

    },

    searchTag: async (req, res, next) =>{
        const tag = req.body.tag;

        const events = await Event.find({genre:tag},{new:true});

        res.status(200).json({'events':events});
        
    },

    SearchDate: async(req, res, next) =>{
        const date = new Date(req.body.date) ;
        
        const events = await Event.find({ startDate: { $gte:date  }},{new:true})
        console.log(events);
        res.status(200).json({events});
    }
}