let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  username:{
    type: String
  },
  password:{
    type: String
  }
});

let User = module.exports = mongoose.model('User', userSchema);