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

	// app.post('/login', function(req, res){
	// 	user.find(req,res);
	// });

	// app.get('/login', function(req,res){

	// 	user.create(req,res);

	// })

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

	app.get('/userdetail/:id' , function(req, res) {
		console.log(req.params.id)
	  user.findId(req, res);

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
//_________ Login Reg Routes Below this line__________
	// app.get('/signup', function(req, res) {
	// 	res.render('signup.ejs', { message: req.flash('signupMessage') });
	// });

	// app.post('/signup', function(req, res, next) {
	//   console.log('_did a SIGNUP route_', req.body);
	//   passport.authenticate('local-signup', function(err, user, info) {
	//     if (err) {
	//       return res.status(401).json(info); 
	//     }
	//     if (!user) {
	//       return res.status(401).json(info);
	//     } 
	//     return res.json(info);
	//   })(req, res, next);
	// });

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
	// app.post('/login', function(req, res, next) {
	//   passport.authenticate('local-login', function(err, user, info) {
	//     if (err) {
	//       return res.status(401).json(info); 
	//     }
	//     if (!user) {
	//       return res.status(401).json(info);
	//     }
	//     req.logIn(user, function(loginErr) {
	//       if (loginErr) { return next(loginErr); }
	//       return res.json(user);
	//     });    
	//   })(req, res, next);
	// });

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