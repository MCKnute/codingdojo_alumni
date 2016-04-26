var event = require('./../controllers/events.js');
var job = require('./../controllers/jobs.js')
var post = require('./../controllers/posts.js')
var user = require('./../controllers/users.js')

module.exports = function(app) {
	app.get('/dash', function(req, res) {
	  user.find(req, res);
	});

	app.get('/', function(req, res) {
	  user.find(req, res);
	});

	app.post('/ninjas', function(req, res){
    	//ninjas.createNinja(req, res);
    });

    app.delete('/ninjas/:id/delete', function(req, res){
    	//ninjas.deleteNinja(req, res);
    });

	
};