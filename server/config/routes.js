var events = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js')
var post = require('./../controllers/posts.js')
var user = require('./../controllers/users.js')
var gitkitWid = require('./../controllers/gitkitWid.js');

module.exports = function(app, passport) {
	app.get('/dash', function(req, res) {

	  user.find(req, res);
	  gitkitWid.renderIndexPage(req,res);
	});

	app.get('/dash', function(req, res) {
	  user.find(req, res);
	});

//	Gitkit
	// widget page hosting Gitkit javascript
	app.get('/gitkit', function(req,res){
		gitkitWid.renderGitkitWidgetPage(req,res);
	});
	app.post('/gitkit', function(req,res){
		gitkitWid.renderGitkitWidgetPage(req,res);
	});
	// Ajax endpoint to send email for password-recovery and email change event
	app.post('/sendemail', function(res, loginInfo){
		gitkitWid.renderSendEmailPage(res, loginInfo);
	});
//	END Gitkit

	// app.get('/profile', function(req, res) {
	//   user.findID(req, res);
	// });

	// app.get('/profile', function(req, res) {
	//   user.update(req, res);
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

	app.get('/job', function(req, res) {
	  job.findID(req, res);

	});

	app.post('/job', function(req, res){
    	job.create(req, res);
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