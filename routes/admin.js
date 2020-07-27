const express = require('express');
const passport = require('passport');
const router = express.Router();

let User = require('./../models/user');

router.get('/login', (req, res) => {
  user = req.user;
  res.render('admin/login', {layout: 'layoutAd', user});
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/admin/login'}),

  function(req, res) {
    user = req.user;
    res.render('admin/dashboard', {user, layout: 'layoutAd'});
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
})


module.exports = router;