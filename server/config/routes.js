var event = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js')
var post = require('./../controllers/posts.js')
var user = require('./../controllers/users.js')


module.exports = function(app) {
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

	app.get('/profile', function(req, res) {
	  user.findID(req, res);
	});

	app.get('/profile', function(req, res) {
	  user.update(req, res);
	});

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
	  event.find(req, res);
	});

	app.post('/event', function(req, res){
      event.create(req, res);
    });

  app.post('/remove', function(req,res){

		event.remove(req,res);
	});

	// app.get('/job', function(req, res) {
	//   job.findID(req, res);

	// });
	app.get('/job', function(req, res) {
	  job.find(req, res);

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

	app.post('/job', function(req, res){
    	job.create(req, res);
    });

    

    app.post('/remove', function(req,res){

		job.remove(req,res);
	});

	
};