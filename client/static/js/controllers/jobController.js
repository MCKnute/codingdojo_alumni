alumniApp.controller('jobController', function(jobFactory, $scope, $location, $routeParams, loginFactory){

  $scope.newJob = {};
  $scope.stacks = [];

// ______ currentUser _______//
  function getCurrentUser(){
    loginFactory.getUser(function(data){
      $scope.currentUser = data;
      // console.log($scope.currentUser)
    })
  }

  getCurrentUser();
// ______ END currentUser _______//

  function getJobs(){

      jobFactory.getJobs(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.jobs = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
        })

  }
  getJobs();

  function getStacks(){

      jobFactory.getStacks(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.stacks = data; 
          // console.log($scope.stacks[0].name)
          $scope.newJob.primaryStack = $scope.stacks[0].name
         
        })
      
  }
  getStacks();

  $scope.addJob = function(newJob){

    newJob.user_id = $scope.currentUser._id

    // console.log(newJob);

    jobFactory.createJob(newJob,function(){ 
      $scope.newJob = {};    // sets input fields to clear.
       $locatidon.path('#/dashboard/jobs');
      getJobs();              
    });
  }

  var id = $routeParams.id

  // console.log(id, "coming from the controller")

  function getJobsDetail(inputId){

      jobFactory.getJobsDetail(inputId, function(data){
          console.log(data, "from Factory, back into Controller");
          $scope.jobs = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
        })

  }
  getJobsDetail(id);
});