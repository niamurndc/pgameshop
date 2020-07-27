const express = require('express');
const router = express.Router();


let Category = require('./../models/category');
let Product = require('./../models/product');
let Order = require('./../models/order');

router.get('/', (req, res) => {
  Category.find({}, (err, cats) => {
    if(err) throw err;

    res.render('index', {cats});
  });
})

router.get('/cart/:name', (req, res) => {
  let name = req.params.name;
  Product.find({catid : name}, (err, pros) => {
    if(err) throw err;

    Category.find({name: name}, (err, cats) => {
      if(err) throw err;
      res.render('cart', {pros, cats});
    });
  });
})

router.post('/cart/:name', (req, res) => {
  let order = {};

  order.product = req.body.product;
  order.price = req.body.price;
  order.pid = req.body.pid;

    res.render('check', {order});
  
})

router.post('/check', (req, res) => {
  let order = new Order();
  order.name = req.body.name;
  order.detail = req.body.detail;
  order.mnum = req.body.mnum;

  order.save(err => {
    if(err) throw err;

    res.redirect('/');
  })
})


module.exports = router;