const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('./../config/auth');

let Category = require('./../models/category');
let Product = require('./../models/product');
let Order = require('./../models/order');

router.get('/', ensureAuthenticated, (req, res) => {
  Order.find({}, (err, orders) => {
    if(err) throw err;

    res.render('admin/order', {orders, layout: 'layoutAd'});
  });
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if(err) throw err;

    res.render('admin/editorder', {order, layout: 'layoutAd'});
  });
})

router.post('/edit/:id', (req, res) => {
  let order = {};
  order.status = req.body.status;

  let query = { _id: req.params.id};

  Order.update(query, order, err => {
    if(err) throw err;

    res.redirect('/order')
  })
})


module.exports = router;