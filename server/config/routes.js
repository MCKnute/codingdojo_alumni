//var ninjas = require('../controllers/ninjas.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
	  //ninjas.showAll(req, res);
	});

	app.post('/ninjas', function(req, res){
    	//ninjas.createNinja(req, res);
    });

    app.delete('/ninjas/:id/delete', function(req, res){
    	//ninjas.deleteNinja(req, res);
    });

	
};