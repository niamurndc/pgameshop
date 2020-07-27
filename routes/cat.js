const express = require('express');
const multer = require('multer');
const path = require('path');
const {ensureAuthenticated} = require('./../config/auth');
const router = express.Router();

router.use(express.static(__dirname+'public/upload'));

let storage = multer.diskStorage({
  destination: './public/upload',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({storage: storage});

let Category = require('./../models/category');

router.get('/', ensureAuthenticated, (req, res) => {
  Category.find({}, (err, cats) => {
    if(err) throw err;

    res.render('admin/cats', {cats, layout: 'layoutAd'});
  });
})

router.get('/add', ensureAuthenticated,  (req, res) => {
  res.render('admin/addcat', {layout: 'layoutAd'});
})

router.post('/add', upload.single('logo'), (req, res) => {
  let category = new Category();
  category.name = req.body.name;
  category.note = req.body.note;
  category.inputno = req.body.inputno;
  category.finput = req.body.finput;
  category.sinput = req.body.sinput;
  category.tinput = req.body.tinput;
  category.logo = req.file.filename;

  category.save((err) => {
    if(err) throw err;

    res.redirect('/cat');
  })
})

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Category.findById(req.params.id, (err, cat) => {
    if(err) throw err;

    res.render('admin/editcat', {cat, layout: 'layoutAd'});
  });
})

router.post('/edit/:id', (req, res) => {
  let category = {};
  category.name = req.body.name;
  category.note = req.body.note;
  category.inputno = req.body.inputno;
  category.finput = req.body.finput;
  category.sinput = req.body.sinput;
  category.tinput = req.body.tinput;

  let query = { _id: req.params.id};

  Category.update(query, category, err => {
    if(err) throw err;

    res.redirect('/cat')
  })
})

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
  let query = { _id: req.params.id};

  Category.remove(query, (err, pro) => {
    if(err) throw err;

    res.redirect('/cat');
  });
})

module.exports = router;