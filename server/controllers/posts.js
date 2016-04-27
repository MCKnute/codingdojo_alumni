var mongoose = require('mongoose');
var Post = mongoose.model('Post');

module.exports = (function() {
return {
    find: function(req, res) {
       Post.find({}, function(err, results){
        if(err){ 
            console.log(err);
        }   
        else{
            res.json(results);
         }
        })
     },
    create: function(req, res){
    var post = {
    _users: req.body.userId,
    content: req.body.content
    }
      Post.create(post, function(err, newPost){
        User.findOneAndUpdate({_id:req.body.userId}, {$push:{"posts":newPost._id}}).exec(function(err, user){
          res.json(newPost);
    })
  })

    }

  
 }
})();