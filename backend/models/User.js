const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    color: {
        type: String,
        default: 'Default'
    }
  });
  const User = mongoose.model('user', UserSchema);
  module.exports = User;