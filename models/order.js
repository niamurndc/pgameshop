let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({
  name:{
    type: String
  },
  detail:{
    type: String
  },
  mnum:{
    type: String
  },
  otime:{
    type: Date,
    default: Date.now
  },
  status:{
    type: String,
    default: 0
  }
});

let Order = module.exports = mongoose.model('Order', orderSchema);