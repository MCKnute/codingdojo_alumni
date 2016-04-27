var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
  content: String,
  _users: {type: Schema.ObjectId, ref:'User'},
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Message', MessageSchema);