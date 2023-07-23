const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    referBy:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    myReferernce:[{
        type: Schema.Types.ObjectId,
        ref: 'users',
        unique: true
    }],
    referCode:{
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Refer', referSchema);

    
        