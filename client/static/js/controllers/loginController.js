alumniApp.controller('loginController', function(userFactory, loginFactory, jobFactory, $scope, $http, $location){

  $scope.login = function(data){
      console.log('___in loginController___');
    $scope.flash = {};
    loginFactory.login(data, function(res){
      console.log('__bout to go to your dashboard__',res);
      $location.path('/profile');
    }, function(res){
      $scope.flash.message = res.data.message;
      $scope.loginUser = {}
    })
  }

  $scope.register = function(data){
    $scope.flash = {};
    loginFactory.register(data, function(res){
      $scope.flash.message = res.data.message;
      $scope.newUser = {}
    })
  }

  $scope.newJob = {};
  $scope.newUser = {};
  $scope.stacks = [];
  $scope.locations = [];

  function getCurrentUser(){
    loginFactory.getUser(function(data){
      $scope.currentUser = data;
      console.log($scope.currentUser, "this is coming from updateController")
    })
  }

  getCurrentUser();
  console.log($scope.currentUser);

  function getUsers(){
    userFactory.getUsers(function(data){
      // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
      $scope.users = data; 
    })
  }

  getUsers();

  function getJobs(){
    jobFactory.getJobs(function(data){
      // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
      $scope.jobs = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
    })
  }
  
  // getJobs();
  
  function getStacks(){
    jobFactory.getStacks(function(data){
      // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
      $scope.stacks = data; 
      // console.log($scope.stacks[0].name)
      $scope.newUser.primaryStack = $scope.stacks[0].name
     
    })
  }

  // getStacks();

  function getLocations(){
    userFactory.getLocations(function(data){
      // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
      $scope.locations = data; 
      // console.log($scope.locations)
      // console.log($scope.locations[0].name)
      // console.log($scope.newUser)
      $scope.newUser.primaryLocation = $scope.locations[0].name
     
    })
  }

  // getLocations();

  $scope.addUser = function(newUser){
    console.log(newUser);
   // this is form data getting passed through from HTML View
    userFactory.createUser(newUser,function(){ 
      $scope.newUser = {};    // sets input fields to clear.
       // $location.path('/users');
      getUsers();              
    });

  }

});