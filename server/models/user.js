var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  // 	type: String,
  // 	unique: true,
  // 	required: true
  // },
  password: String,
  // 	type: String,
  // 	required: true
  // },
  currentJob: String,
  primaryLocation: String,
  primaryStack: String,
  gradDate: {},
  summary: String,
  linkedin: String,
  github: String,
  beltComplete: {},
  status: String,

  posts: [{type: Schema.ObjectId, ref:'Post'}],

  _comments: [{type: Schema.ObjectId, ref:'Comment'}],
  _messages: [{type: Schema.ObjectId, ref:'Message'}],
  _jobs: [{type: Schema.ObjectId, ref:'Job'}],
  createdAt: { type: Date, default: Date.now }
});

// UserSchema.pre('save', function(next) {
// 	var user = this;
// 	if(this.isModified('password') || this.isNew) {
// 		bcrypt.genSalt(10, function (err, salt) {
// 			if(err) {
// 				return next(err);
// 			}
// 			bcrypt.hash(user.password, salt, function(err, hash) {
// 			if(err) {
// 				return next(err);
// 			}
// 			user.password = hash;
// 			next();
// 		});
// 	});
// 	} else {
// 		return next();
// 	}
// });

UserSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);