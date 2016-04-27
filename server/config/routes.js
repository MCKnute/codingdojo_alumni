var event = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js');
var post = require('./../controllers/posts.js');
var user = require('./../controllers/users.js');
var gitkitWid = require('./../controllers/gitkitWid.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
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