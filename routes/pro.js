const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('./../config/auth');

let Product = require('./../models/product');
let Category = require('./../models/category');

router.get('/', ensureAuthenticated, (req, res) => {
  Product.find({}, (err, pros) => {
    if(err) throw err;

    res.render('admin/pros', {pros, layout: 'layoutAd'});
  });
})

router.get('/add', ensureAuthenticated, (req, res) => {
  Category.find({}, (err, cats) => {
    if(err) throw err;

    res.render('admin/addpro', { cats, layout: 'layoutAd'});
  });
})

router.post('/add', (req, res) => {
  let product = new Product();
  product.name = req.body.name;
  product.catid = req.body.catid;
  product.price = req.body.price;

  product.save(err => {
    if(err) throw err;

    res.redirect('/product')
  })
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Product.findById(req.params.id, (err, pro) => {
    if(err) throw err;

    res.render('admin/editpro', {pro, layout: 'layoutAd'});
  });
})

router.post('/edit/:id', (req, res) => {
  let product = {};
  product.name = req.body.name;
  product.catid = req.body.catid;
  product.price = req.body.price;

  let query = { _id: req.params.id};

  Product.update(query, product, err => {
    if(err) throw err;

    res.redirect('/product')
  })
})

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
  let query = { _id: req.params.id};

  Product.remove(query, (err, pro) => {
    if(err) throw err;

    res.redirect('/product');
  });
})


module.exports = router;