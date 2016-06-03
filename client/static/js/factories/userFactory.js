alumniApp.factory('userFactory', function($http) {
  var factory = {};
  var currentUser = null;
  var jobs;
  var users;
  var stacks;
  var update;
  var locations;

  factory.getJobs = function(callback){
      $http.get('/profile').then(function(output){
          jobs = output.data;
          // console.log(jobs);
          callback(jobs);
      })
  }

  factory.getUsers = function(callback){
      $http.get('/user').then(function(output){
          users = output.data;
          // console.log(users);
          callback(users);
      })
  }

   factory.getStacks = function(callback){
      $http.get('/stacks').then(function(output){
          stacks = output.data;
          // console.log(jobs);
          callback(stacks);
      })
  }

  factory.getLocations = function(callback){
      $http.get('/locations').then(function(output){
          locations = output.data;
          // console.log(locations);
          callback(locations);
      })
  }

  factory.getJobStatus = function(callback){
      $http.get('/status').then(function(output){
          stacks = output.data;
          // console.log(jobs);
          callback(stacks);
      })
  }

  factory.createUser = function(data, callback) {
      // console.log(data);
      $http.post('/user', data).then(function(response){
        callback();
      })
  }

  factory.updateUser = function(data, callback) {
      console.log("____userFactory___ this is the data: ", data);
      $http.post('/userUpdate', data).then(function(response){
        currentUser = response.data;
        console.log("_____goign to post now____", currentUser);
        callback(currentUser);
      });
  }

  factory.getUsersDetail = function(id,callback){
    // console.log("____userFactory function getUsersDetail___ ... this is the id: ",id);
      $http.get('/userdetail/' + id).then(function(output){
          users = output.data;
          // console.log("___ userFactory function getUsersDetail___ ... users: ", users);
          callback(users);
      })
  } 
  return factory;
});