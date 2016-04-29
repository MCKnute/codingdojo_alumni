var mongoose = require('mongoose');
var User = mongoose.model('User');
var Location = mongoose.model('Location');

module.exports = (function() {
return {
    find: function(req, res) {
       User.findOne({firstName: req.body.firstName}, function(err, user){
        if(err){ 
            console.log(err);
        }   
        else{
      //is there a user?
            if(user){
            res.json(user);
            } 
                else{
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
      console.log("");
       User.findOneAndUpdate({_id: req.body.user_id}, {$set: req.body}, function(err, user){
        if(err){ 
            // console.log(err, "this didn't find anybody");
        }   
        else{
            // console.log(user, "RETURN FROM DATABASE")

            res.json(user);
         }
        })
    },

    findId: function(req, res) {
      //need to add user id to this so we can add personal messaging  before searching for job detail. 

      console.log(req.params.id, "this is in server side controller")

       User.findOne({_id: req.params.id}, function(err, user){
        if(err){ 
            console.log(err);
        }   
        else{

              console.log(user);
            res.json(user);
            } 
               
        })
    },

    findLocation: function(req, res) {
       Location.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
          console.log(results);
            res.json(results);
         }
        })
     },
    findAll: function(req, res) {
       User.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
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

        }
        
        else res.json(true);

    })
    }
}
})();