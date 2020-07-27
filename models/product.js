let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name:{
    type: String
  },
  catid:{
    type: String
  },
  price:{
    type: String
  }
});

let Product = module.exports = mongoose.model('Product', productSchema);