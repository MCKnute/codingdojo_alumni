var event = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js')
var post = require('./../controllers/posts.js')
var user = require('./../controllers/users.js')

module.exports = function(app) {
	app.get('/', function(req, res) {
	  user.find(req, res);
	});

	app.get('/dash', function(req, res) {
	  user.find(req, res);
	});

	app.get('/profile', function(req, res) {
	  user.findID(req, res);
	});

	app.get('/profile', function(req, res) {
	  user.update(req, res);
	});

	app.get('/event', function(req, res) {
	  event.findID(req, res);
	});

	app.post('/event', function(req, res){
      event.create(req, res);
    });

  app.post('/remove', function(req,res){

		event.remove(req,res);
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

	
};