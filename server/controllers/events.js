var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports = (function() {
return {
    find: function(req, res) {
       Event.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
            res.json(results);
         }
        })
     },
    //  findId: function(req, res) {

    //    Event.findOne({_id: req.body._id}, function(err, user){
    //     if(err){ 
    //         console.log(err);
    //     }   
    //     else{

<<<<<<< HEAD
            if(user){
            res.json(user);
            } 
                else{
                //otherwise make a user
                Event.create({name: req.body.name}, function(err, newUser){
                    if(err) { console.log(err); }
                    res.json(newUser);
                })
                }
         }
        })
    },
=======
    //         if(user){
    //         res.json(user);
    //         } 
    //             else{
    //             //otherwise make a user
    //             Event.create({name: req.body.name}, function(err, newUser){
    //                 if(err) { console.log(err); }
    //                 res.json(newUser);
    //             })
    //             }
    //      }
    //     })
    // },
>>>>>>> mikeBranch
         create: function(req,res){
         Event.create(req.body, function(err, topic){
            if(err){
            console.log(err);
            res.json({errors: err.errors});

        }
        
        else res.json(true);

    })
  }

  
 }
})();