var mongoose = require('mongoose');
var User = mongoose.model('User');
var Location = mongoose.model('Location');

module.exports = (function() {
  return {
    find: function(req, res) {
       User.findOne({firstName: req.body.firstName}, function(err, user){
        if(err){ 
            console.log(err);
        }else{
        //is there a user?
          if(user){
          res.json(user);
          }else{
              //otherwise make a user:
            User.create({firstName: req.body.firstName, lastName: req.body.lastName}, function(err, newUser){
              if(err) { console.log(err); }
              res.json(newUser);
            })
          }
        }
      })
    },
    userUpdate: function(req, res) {
      console.log("____users.js function userUpdates___", req.body);
      User.findOneAndUpdate({_id: req.body._id}, {$set: req.body}, {new:true}, function(err, user){
        if(err){ 
          console.log("this didn't find anybody", err);
        } else {
          console.log("____users.js function userUpdates___RETURN FROM DATABASE user: ", req.body);
          res.json(req.body);
        }
      })
    },
    findId: function(req, res) {
      //need to add user id to this so we can add personal messaging  before searching for job detail. 
      console.log("___ server... users.js___ req.params", req.params);
      User.findOne({_id: req.params.id}, function(err, user){
        if(err){ 
          console.log(err);
        }else{
          console.log(user);
          res.json(user);
        } 
      })
    },
    findLocation: function(req, res) {
      Location.find({}, function(err, results){
        if(err){ 
          console.log(err);
        }else{
          console.log(results);
          res.json(results);
        }
      })
    },
    findAll: function(req, res) {
       User.find({}, function(err, results){
        if(err){ 
          console.log(err);
        }else{
          // console.log(results);
          res.json(results);
        }
      })
    },
    create: function(req,res){
      User.create(req.body, function(err, topic){
        if(err){
          console.log(err);
          res.json({errors: err.errors});
        }else{ 
          res.json(true);
        }
      })
    }
  }
})();