var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  currentJob: String,
  primaryLocation: String,
  gradDate: {},
  summary: String,
  beltComplete: {},
  status: String,
  posts: [{type: Schema.ObjectId, ref:'Post'}],
  _comments: [{type: Schema.ObjectId, ref:'Comment'}],
  _messages: [{type: Schema.ObjectId, ref:'Message'}],
  _jobs: [{type: Schema.ObjectId, ref:'Job'}],
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('User', UserSchema);