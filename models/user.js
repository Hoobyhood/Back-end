const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

//Create Schema
const userSchema = new Schema({
    firstname:{
        type:String,
        lowercase:true
    },

    lastname:{
        type:String,
        lowercase:true
    },



    phonenumber:{
        type:String
    },

    gender:{
        type:String,
        enum:['male','female']
    },

    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },

    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        }
    },

    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },

    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    }
});


//hashing password
userSchema.pre('save',async function (next) {
  //modifiy this.password
  try {
    if (this.method !=='local'){
        next();
    }

      const salt =await bcrypt.genSalt(10);
      const passwordHash= await bcrypt.hash(this.local.password,salt)
      
      this.local.password = passwordHash;
      next();
      
  } catch (error) {
      next(error)
  }
    
});

userSchema.methods.isVaildPassword = async function(newPasswod){
    try {
        return await bcrypt.compare(newPasswod, this.local.password);
    } catch (error) {
        throw new Error(error);
    }
}

//Create Model
const User = mongoose.model('user',userSchema);


//Export Model
module.exports = User;

