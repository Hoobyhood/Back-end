const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy ;
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('./configuration');
const User = require('./models/user');

//JSON WEB TOKENS Strategy
passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.JWT_SECRET
},async(payload,done)=>{
    try {
        //find user specified in token
        const user = await User.findById(payload.sub);
        
        //user dose not exsits 
        if (!user) {
            return done(null, false);
        }
        //otherwise
        done(null,user);

    } catch (error) {
        done(error,false);
    }
}));

//FACEBOOK Strategy
passport.use('facebookToken',new FacebookTokenStrategy({
    clientID: config.ouath.facebook.clientID,
    clientSecret: config.ouath.facebook.clientSecret
}, async (accessToken,refreshToken,profile,done)=>{
    try {                 
        const existingUser = await User.findOne({ "facebook.id": profile.id });
        console.log(profile);
        

        if(existingUser){
            console.log(profile.name.givenName);
            console.log(profile.name.familyName);
            
            return done(null,existingUser); 
        }
        

        const newUser = new User({
            method:'facebook',
            facebook:{
                id: profile.id,
                email:profile.emails[0].value
            },
            firstname:profile.name.givenName,
            lastname:profile.name.familyName
        });

        await  newUser.save();
        return done(null,newUser);
    } catch (error) {
        done(error,false,error.message)
    }
}));

//LOCAL Strategy
passport.use(new LocalStrategy({
    usernameField:'email'
},async (email,password,done) => {
    try {
        //find User by email
        const user = await User.findOne({"local.email":email });

        //if not found
        if (!user) { return done(null, false); }
        
        
        //check password
        const isMatch = await user.isVaildPassword(password);

        //if not correct
        if (!isMatch) {
            return done(null, false);
        }
        //otherwiser
        done(null, user);
    } catch (error) {
        done (error,false);
    }
}));
