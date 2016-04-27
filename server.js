var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./server/config/database.js');
var User = require('./server/models/user');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var port = 8000;

// mongoose.connect(config.url);
require('./server/config/passport')(passport);

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser());
app.use(cookieParser());

app.use(session({ 	secret: 'bestcatever',
					resave: false,
					saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Using EJS for testing pre-angularization
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app, passport);
//Look at documentation at http://getbootstrap.com/getting-started/#download
//require('bootstrap');


app.listen(port, function() {
  console.log('Code on! Cool stuff on: ', port);
});