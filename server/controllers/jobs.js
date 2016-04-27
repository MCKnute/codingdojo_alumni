var mongoose = require('mongoose');
var Job = mongoose.model('Job');
var Stack = mongoose.model('Stack');

module.exports = (function() {
return {
    find: function(req, res) {
       Job.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
          // console.log(results);
            res.json(results);
         }
        })
     },
     findStack: function(req, res) {
       Stack.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
          // console.log(results);
            res.json(results);
         }
        })
     },
    //  findId: function(req, res) {

    //    Job.findOne({_id: req.body._id}, function(err, user){
    //     if(err){ 
    //         console.log(err);
    //     }   
    //     else{

    //         if(user){
    //         res.json(user);
    //         } 
    //             else{
    //             //otherwise make a user
    //             Job.create({name: req.body.name}, function(err, newUser){
    //                 if(err) { console.log(err); }
    //                 res.json(newUser);
    //             })
    //             }
    //      }
    //     })
    // },

    create: function(req,res){
    Job.create(req.body, function(err, topic){
        if(err){
            console.log(err);
            res.json({errors: err.errors});

        }
        
        else res.json(true);

    })
  }

  // remove: function(req,res){
  //   Job.remove({_id: req.body}, function(err, job){
  //       res.json(job)
  //     })

  //   }

  
 }
})();