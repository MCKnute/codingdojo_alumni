var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new mongoose.Schema({
  locations: {}

});

mongoose.model('Location', LocationSchema);