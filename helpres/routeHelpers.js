const Joi = require('joi');

module.exports= {
    validateBody : (schema) => {

        return (req,res,next)=>{
            const result = Joi.validate(req.body,schema);

            if (result.error){                 
            return res.status(400).json(result);
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }

    },

    schemas:{
        authSchema:Joi.object().keys({
            email:Joi.string().email().required(),
            password :Joi.string()
        }),

        updateSchema:Joi.object().keys({
            firstname:Joi.string().required(),
            lastname: Joi.string().required(),
            phonenumber: Joi.string().required()
        }),
        
        adssSchema:Joi.object().keys({
            phonenumber: Joi.string().required(),
            gender: Joi.string()
        }),

        postEventSchema:Joi.object().keys({
            name: Joi.string().required(),
            info: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            userID: Joi.string(),
            genre: Joi.array()
        })

    }
}