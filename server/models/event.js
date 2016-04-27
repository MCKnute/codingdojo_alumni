var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
  eventName: String,
  location: String,
  description: String,
  pictureUrl: String,
  rsvp: [{}],
  inviteList: {},
  _user: {type: Schema.ObjectId, ref:'User'},
  posts: [{type: Schema.ObjectId, ref:'Post'}],
  _comments: [{type: Schema.ObjectId, ref:'Comment'}],
  createdAt: { type: Date, default: Date.now }
});

mongoose.model('Event', EventSchema);