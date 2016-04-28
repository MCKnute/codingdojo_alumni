var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StackSchema = new mongoose.Schema({
  name: String,

});

mongoose.model('Stack', StackSchema);