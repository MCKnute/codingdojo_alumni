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
            res.json(results);

         }
        })
     },
     findId: function(req, res) {
      //need to add user id to this so we can add personal messaging  before searching for job detail. 

      console.log(req.params.id, "this is in server side controller")

       Job.findOne({_id: req.params.id}, function(err, job){
        if(err){ 
            console.log(err);
        }   
        else{

              console.log(job);
            res.json(job);
            } 
               
        })
    },

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