var events = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js')
var post = require('./../controllers/posts.js')
var user = require('./../controllers/users.js')

// comment
module.exports = function(app, passport) {
	app.get('/dash', function(req, res) {
	  user.find(req, res);
	});

	app.get('/', function(req, res) {
	user.find(req, res);
	});

	app.post('/login', function(req, res){
		user.find(req,res);
	});

	app.get('/login', function(req,res){

		user.create(req,res);

	})

	app.get('/dash', function(req, res) {
	  user.find(req, res);
	});

	// app.get('/profile', function(req, res) {
	//   user.findID(req, res);
	// });

	// app.get('/profile', function(req, res) {
	//   user.update(req, res);
	// });

	app.post('/user', function(req, res) {
	  user.create(req, res);
	});

	app.get('/user', function(req, res) {
	  user.findAll(req, res);
	});

	// app.get('/event', function(req, res) {
	//   event.findID(req, res);
	// });

	app.get('/event', function(req, res) {

	  events.findID(req, res);

	});

	app.post('/event', function(req, res){
      events.create(req, res);
    });

  app.post('/remove', function(req,res){

		events.remove(req,res);
	});

	app.get('/jobdetail/:id' , function(req, res) {
		console.log(req.params.id)
	  job.findId(req, res);

	});
	app.get('/job', function(req, res) {
	  job.find(req, res);

	});

	// app.get('/job', function(req, res) {
	//   job.find(req, res);

	// });

	app.post('/job', function(req, res){
    job.create(req, res);
   });

	app.get('/stacks', function(req, res) {
	  job.findStack(req, res);

	});

	app.get('/locations', function(req, res) {
	  user.findLocation(req, res);

	});

	app.get('/status', function(req, res) {
	  job.findStatus(req, res);

	});



    

    app.post('/remove', function(req,res){

		job.remove(req,res);
	});
// Login Reg Routes Below this line

	app.get('/login', function(req, res) {
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user: req.user
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