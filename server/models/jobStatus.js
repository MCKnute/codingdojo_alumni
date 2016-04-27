var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = new mongoose.Schema({
  name: String,

});

mongoose.model('Status', StatusSchema);