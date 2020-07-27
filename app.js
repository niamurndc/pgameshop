const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();

mongoose.connect('mongodb://localhost/pgameshop');
let db = mongoose.connection;
db.once('open', () => {
  console.log('db connected');
})

//Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));

//session
app.use(session({
  secret: 'secret', 
  resave: true, 
  saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// EJS
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout', 'layout', 'layoutAd');

// Routes
app.use('/', require('./routes/index.js'));
app.use('/cat', require('./routes/cat.js'));
app.use('/product', require('./routes/pro.js'));
app.use('/order', require('./routes/order.js'));
app.use('/admin', require('./routes/admin.js'));


const port = 5000
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))