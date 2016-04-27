var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser'); 

app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.json());

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);
//Look at documentation at http://getbootstrap.com/getting-started/#download
//require('bootstrap');



var port = 8000;

app.listen(port, function() {
  console.log('Code on! Cool stuff on: ', port);
});