var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobSchema = new mongoose.Schema({
  company: String,
  title: String,
  description: String,
  status: String,
  location: String,
  primaryStack: String,
  _user: {type: Schema.ObjectId, ref:'users'},
  _posts: [{type: Schema.ObjectId, ref:'posts'}],
  _comments: [{type: Schema.ObjectId, ref:'comments'}],
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Job', JobSchema);