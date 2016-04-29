alumniApp.controller('alumniController', function(jobFactory, loginFactory, userFactory, $scope, $location, $routeParams){

  $scope.newJob = {};
  $scope.stacks = [];

  function getJobs(){

      jobFactory.getJobs(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.jobs = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
        })

  }
  // getJobs();
// ______ currentUser _______//
  function getCurrentUser(){
    loginFactory.getUser(function(data){
      $scope.currentUser = data;
      // console.log($scope.currentUser)
    })
  }

  getCurrentUser();
// ______ END currentUser _______//

  function getUsers(){

      userFactory.getUsers(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.users = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
        })

  }
  getUsers();

  function getStacks(){

      jobFactory.getStacks(function(data){
          // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
          $scope.stacks = data; 
          // console.log($scope.stacks[0].name)
          $scope.newJob.primaryStack = $scope.stacks[0].name
         
        })
      
  }
  // getStacks();

  $scope.addJob = function(newJob){
    // console.log(newJob);
   // this is form data getting passed through from HTML View
    jobFactory.createJob(newJob,function(){ 
      $scope.newJob = {};    // sets input fields to clear.
       // $location.path('/');
      getJobs();              
    });
  }

    var rpId = $routeParams.id;

  function getUsersDetail(inputId){
    console.log(inputId);
    console.log("___coming from the alumni controller__", rpId);

    userFactory.getUsersDetail(inputId, function(data){
          // console.log(data, "from Factory, back into Controller");
          $scope.users = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
        })

  }
  if($routeParams.id != undefined){
  getUsersDetail(rpId);
}
});