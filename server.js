var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./server/config/database');
var User = require('./server/models/user');
var jwt = require('jwt-simple');

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(passport.initialize());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);
//Look at documentation at http://getbootstrap.com/getting-started/#download
//require('bootstrap');
require('./server/config/passport')(passport);

var apiRoutes = express.Router();

apiRoutes.post('/signup', function(req, res) {
  	if (!req.body.email || !req.body.password) {
    	res.json({success: false, msg: 'Please enter email and password.'});
  	} else {
    	var newUser = new User({
      		email: req.body.email,
      		password: req.body.password
    	});
    // save the user
    	newUser.save(function(err) {
      		if (err) {
        		return res.json({success: false, msg: 'Username already exists.'});
      		}
      		res.json({success: true, msg: 'Successfully created new user.'});
    	});
  	}
});

apiRoutes.post('/authenticate', function(req, res) {
  	User.findOne({
    	email: req.body.email
  	}, function(err, user) {
    	if (err) throw err;
 
    	if (!user) {
      		res.send({success: false, msg: 'Authentication failed. User not found.'});
    	} 
    	else {
      // check if password matches
      		user.comparePassword(req.body.password, function (err, isMatch) {
        		if (isMatch && !err) {
          // if user is found and password is right create a token
          		var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          		res.json({success: true, token: 'JWT ' + token});
        		} 
        		else {
          			res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        		}
      		});
    	}
  	});
});

apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  	var token = getToken(req.headers);
  	if (token) {
    	var decoded = jwt.decode(token, config.secret);
    	User.findOne({
      	email: decoded.email
    }, function(err, user) {
    	if (err) throw err;
 
        if (!user) {
          	return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } 
        else {
          	res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!'});
        }
    });
  	} 
  	else {
    	return res.status(403).send({success: false, msg: 'No token provided.'});
  	}
});
 
getToken = function (headers) {
  	if (headers && headers.authorization) {
    	var parted = headers.authorization.split(' ');
    	if (parted.length === 2) {
      		return parted[1];
    	} 
    	else {
      		return null;
    	}
  	} 
  	else {
    	return null;
  	}
};
 
// connect the api routes under /api/*
app.use('/api', apiRoutes);

var port = 8000;

app.get('/', function(req, res) {
	res.send('The API is at http://localhost:' + port + '/api');
})

app.listen(port, function() {
  console.log('Code on! Cool stuff on: ', port);
});