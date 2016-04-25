var mongoose = require('mongoose');
var Job = mongoose.model('Job');

module.exports = (function() {
return {
    find: function(req, res) {
       Job.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
            res.json(results);
         }
        })
     },
     findId: function(req, res) {

       Job.findOne({_id: req.body._id}, function(err, user){
        if(err){ 
            console.log(err);
        }   
        else{

            if(user){
            res.json(user);
            } 
                else{:
                //otherwise make a user
                Job.create({name: req.body.name}, function(err, newUser){
                    if(err) { console.log(err); }
                    res.json(newUser);
                })
                }
         }
        })
    }

  
 }
})();