var events = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js')
var post = require('./../controllers/posts.js')
var user = require('./../controllers/users.js')
var User = require('../models/user.js');

// comment
module.exports = function(app, passport) {
	app.get('/dashboard', function(req, res) {
	  user.find(req, res);
	});

	app.get('/', function(req, res) {
		user.find(req, res);
	});

	app.post('/user', function(req, res) {
	  user.create(req, res);
	});

	app.get('/user', function(req, res) {
	  user.findAll(req, res);
	});

	app.post('/userUpdate', function(req, res) {
		console.log("____ in routes /userUpdates___ this is the req.params.id: ",req.params.id);
	  	user.userUpdate(req, res);
	});

	app.get('/userdetail/:id' , function(req, res) {
		console.log(req.params.id)
	  user.findId(req, res);

	});

    app.post('/remove', function(req,res){

		job.remove(req,res);
	});
//_________ Login Reg Routes Below this line__________


	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res){

		console.log("routes/ app.get(/profile)... system... hehe. You requested req.user._id: ", req.user._id);

  		User.findOne({_id: req.user._id}).exec(function(err, user){
      		if(err) {
      			console.log(err);
      		}
      		console.log("This is the current User: ", user);
      		res.json(user);
 		});
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
};

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}