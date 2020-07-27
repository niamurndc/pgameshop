let mongoose = require('mongoose');

let categorySchema = new mongoose.Schema({
  name:{
    type: String
  },
  note:{
    type: String
  },
  finput:{
    type: String
  },
  logo:{
    type: String
  }
});

let Category = module.exports = mongoose.model('Category', categorySchema);