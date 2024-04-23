const mongoose = require('mongoose')
const User = new mongoose.Schema({
  uid: {
    type: Number,
    // required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },

});
const usersignup = mongoose.model('User', User)
module.exports = usersignup