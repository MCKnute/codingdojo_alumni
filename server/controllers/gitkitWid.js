var mongoose = require('mongoose');
var User = mongoose.model('User');
var googleAPI = require('googleapis');
var gitKit = require('gitkitclient');
var fs = require('fs');
var GitkitClient = require('gitkitclient');
var gitkitClient = new GitkitClient(JSON.parse(fs.readFileSync('./gitkit-server-config.json')));

module.exports = (function() {
	return {
	    find: function(req, res) {
	       User.findOne({name: req.body.name}, function(err, user){
	        if(err){ 
	            console.log(err);
	        }   
	        else{
	      	//is there a user?
	            if(user){
	            res.json(user);
	            } 
	                else{
	                //otherwise make a user:
	                User.create({name: req.body.name}, function(err, newUser){
	                    if(err) { console.log(err); }
	                    res.json(newUser);
	                })
	                }
	         }
	        })
	    },
	    renderIndexPage: function(req,res){
			if (req.cookies.gtoken) {
				gitkitClient.verifyGitkitToken(req.cookies.gtoken, function (err, resp) {
				  	if (err) {
				    	printLoginInfo(res, 'Invalid token: ' + err);
				  	} else {
				    	printLoginInfo(res, 'Welcome back! Login token is: ' + JSON.stringify(resp));
				  	}
				});
			} else {
				printLoginInfo(res, 'You are not logged in yet.');
			}
	    },

		renderGitkitWidgetPage: function(req, res) {
		  res.writeHead(200, {'Content-Type': 'text/html'});
		  var html = new Buffer(fs.readFileSync('./client/static/partials/gitkit-widget.html')).toString();
		  html = html.replace('%%postBody%%', encodeURIComponent(req.body || ''));
		  res.end(html);
		},

		renderSendEmailPage: function(req, res) {
		  app.disable('etag');
		  gitkitClient.getOobResult(req.body, req.ip, req.cookies.gtoken, function(err, resp) {
		    if (err) {
		      console.log('Error: ' + JSON.stringify(err));
		    } else {
		      // Add code here to send email
		      console.log('Send email: ' + JSON.stringify(resp));
		    }
		    res.statusCode = 200;
		    res.setHeader('Content-Type', 'text/html');
		    res.end(resp.responseBody);
		  });
		},

		printLoginInfo: function(res, loginInfo) {
		  res.writeHead(200, {'Content-Type': 'text/html'});
		  var html = new Buffer(fs.readFileSync('/client/index.html'))
		      .toString()
		      .replace('%%loginInfo%%', loginInfo);
		  res.end(html);
		}
	}
})();