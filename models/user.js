const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
   
    },
    lastName:{
        type: String,
    
    },
    email:{
        type: String,

    },
    direction:{
        type: String,
   
    },
    phone:{
        type: String,
    
    },
    city:{
        type: String,
 
    },
    country:{
        type: String,
  
    },
    zipCode:{
        type: String,
  
    },
    wallet:{
        type: String,
        unique: true
    },
    dni :{
        type: String,
    },
    picture:{
        type: String,
    },
    verifyWallet:{
        type: Boolean,
    },
    formValiddated:{
        type: Boolean,
        default: false
    },
    tokensBuyed:{
        type: Number,
        default: 0
    },

});

module.exports = mongoose.model('users', UserSchema);
