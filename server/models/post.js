var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  content: String,
  _users: {type: Schema.ObjectId, ref:'User'},
  _comments: [{type: Schema.ObjectId, ref:'Comment'}],
  _messages: [{type: Schema.ObjectId, ref:'Message'}],
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Post', PostSchema);