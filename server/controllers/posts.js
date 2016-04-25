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
     }

  
 }
})();