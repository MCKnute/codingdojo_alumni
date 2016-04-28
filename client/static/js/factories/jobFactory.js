alumniApp.factory('jobFactory', function($http) {
  var factory = {};

  factory.getJobsDetail = function(id,callback){
    // console.log(id);
      $http.get('/jobdetail/' + id).then(function(output){
          
          jobs = output.data;
          // console.log(jobs, "in Factory, from server side Controller");
          callback(jobs);
      })
  }

  factory.getJobs = function(callback){
      $http.get('/job').then(function(output){
          
          jobs = output.data;
          // console.log(jobs);
          callback(jobs);
      })
  }

   factory.getStacks = function(callback){
      $http.get('/stacks').then(function(output){
          
          stacks = output.data;
          // console.log(jobs);
          callback(stacks);
      })
  }

  factory.createJob = function(data, callback) {
      // console.log(data);
      $http.post('/job', data).then(function(response){
          

        callback();
      })
  } 

  // factory.createJob = function(data, callback) {
  //     console.log(data);
  //     $http.post('/job' + id, data).then(function(response){
          

  //       callback();
  //     })
  // } 
  return factory;
});