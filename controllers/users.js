const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration');

signToken = user=>{
    return JWT.sign({
        iss: 'HobbyHoodToken',
        sub: user.id,
        iat: new Date().getTime(),
    }, JWT_SECRET);

}

module.exports = {
    signUp: async (req,res,next)=>{
        const {email ,password} = req.value.body;
        
        //Check for duplication 
        const foundUser = await User.findOne({"local.email":email});
        if (foundUser) {
            return res.status(403).json({ error:'Email is already exists'})
        }
        //Create new User
        const newUser = new User({
            method: 'local',
            local: {
                email: email,
                password: password
            }
        });

        await newUser.save();
        
        //Generate the Token
        const token = signToken(newUser)
        
        //Respond with Token
        res.status(200).json({token});
              
    },

    signIn: async (req, res, next) => {
        // Generate Token
        const token = signToken(req.user);
        res.status(200).json({token});
    },

    secret: async (req, res, next) => {
        res.json({
            "user":req.user,
            secret:"resource"
        });

    },

    facebookOAuth: async(req, res, next)=>{
        const token = signToken(req.user);
        res.status(200).json({ token });
    },

    update: async(req,res,next)=>{
        user = req.user;
        const id = user.id;
        const ud = await  User.findOneAndUpdate(id,{
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phonenumber:req.body.phonenumber
        },{new:true});
        res.status(200).json(ud);
        
    },

    //add phonenumber & gender for "sign in with 3rd parties"
    adds: async(req,res,next)=>{
        const user = req.user;
        console.log(req.user);
        
        const id = user.id;
        const ud = await User.findOneAndUpdate(id,{
            phonenumber:req.body.phonenumber,
            gender:req.body.gender
        }, { new: true });
        res.status(200).json({ud, "method":user.method});
    },

    test:async(req,res,next)=>{
        console.log(req.user);
        res.status(200).json(req.user.method);
        
    }

}