alumniApp.factory('userFactory', function($http) {
  var factory = {};
  var currentUser = null;
  // {
  //   firstName = "Mike",
  //   lastName = "Bogosian"
  // }

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
          console.log(jobs);
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
          console.log(jobs);
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
      // console.log(data);
      $http.post('/userUpdate', data).then(function(response){
          update = response.data
          console.log(update, "returned databse updated object");

        callback();
      })
  }

  factory.getUsersDetail = function(id,callback){
    // console.log(id);
      $http.get('/userdetail/' + id).then(function(output){
          
          users = output.data;

          // console.log(users, "in Factory, from server side Controller");
          callback(users);
      })
  } 
  return factory;
});