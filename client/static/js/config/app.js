var alumniApp = angular.module('alumniApp', ['ngRoute']);

alumniApp.config(function ($routeProvider) {
      $routeProvider
        .when('/',{
            templateUrl: '../partials/landing.html'
        })
        .when('/login', {
            templateUrl: "../partials/loginTest.html",
            controller: "loginController"
         })
        .when('/dashboard',{
            templateUrl: '../partials/dashboard.html'
        })
        .when('/dashboard/my-profile',{
            templateUrl: '../partials/my_profile.html'
        })
        .when('/dashboard/my-profile/edit',{
           templateUrl: "../partials/userupdatetest.html",
           controller: "updateController"
        })
        .when('/dashboard/messages',{
            templateUrl: '../partials/messages.html'
        })
        .when('/dashboard/alumni',{
            templateUrl: '../partials/alumni.html'
        })
        .when('/dashboard/users', {
           templateUrl: "../partials/userprofilestest.html",
           controller: "profileController"
        })
        .when('/dashboard/jobs',{
            templateUrl: '../partials/jobs.html'
        })
        .when('/dashboard/jobs/new', {
           templateUrl: "../partials/addjobtest.html",
           controller: "jobController"
        })
        .when('/dashboard/events',{
            templateUrl: '../partials/events.html'
        })
        .when('/dashboard/events/new', {
           templateUrl: "../partials/addeventtest.html",
           controller: "eventController"
        })
        .when('/dashboard/about-us',{
            templateUrl: '../partials/about_us.html'
        })
        .otherwise({
          redirectTo: '/'
        });         
});

// Factories :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
alumniApp.factory('loginFactory', function($http, $location) {
        var factory = {};
        var currentUser = null;
        console.log(currentUser);

      //a method to get the user if there is one!
        factory.getUser = function(callback){
            if(currentUser) callback(currentUser);
            else{
              //redirect to the root!
              // $location.path('/');
            }
        }

        factory.login = function(user, callback) {
            $http.post('/login', user).then(function(response){
                console.log(response.data);
                currentUser = response.data;
                console.log(currentUser);
              callback();
            })
        } 

        factory.getId = function(callback){
            $http.get('/userId').then(function(output){
                
                userId = output.data;
                console.log(userId);
                return
                callback(userId);
            })
        }    

    return factory;
    });

alumniApp.factory('userFactory', function($http) {
        var factory = {};
        // var currentUser = {
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
            console.log(data);
            $http.post('/user', data).then(function(response){
                

              callback();
            })
        } 


    return factory;
    });

alumniApp.factory('jobFactory', function($http) {
        var factory = {};

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
            console.log(data);
            $http.post('/job', data).then(function(response){
                

              callback();
            })
        } 


    return factory;
    });

alumniApp.factory('eventFactory', function($http) {
        var factory = {};

        factory.getEvents = function(callback){
            $http.get('/event').then(function(output){
                
                events = output.data;
                console.log(events);
                callback(events);
            })
        }

        factory.createEvent = function(data, callback) {
            console.log(data);
            $http.post('/event', data).then(function(response){

              callback();
            })
        } 


    return factory;
    });

// Controllers :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
alumniApp.controller('loginController', function(loginFactory, $location, $scope){
        $scope.login = function(user){
            loginFactory.login(user, function(){

            loginFactory.getUser(function(user){
            // console.log(user);
            $location.path('/userUpdate');

            })

         })

        }

    });

alumniApp.controller('loginController', function(userFactory, loginFactory, jobFactory, $scope, $location){

      $scope.newJob = {};
      $scope.newUser = {};
      $scope.stacks = [];
      $scope.locations = [];
      console.log($scope.login);

      function getCurrentUser(){
        loginFactory.getUser(function(data){
          $scope.currentUser = data;
          console.log($scope.currentUser, "this is coming from updateController")
        })
      }

      getCurrentUser();

      console.log($scope.currentUser)

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
      getJobs();
      function getStacks(){

          jobFactory.getStacks(function(data){
              // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
              $scope.stacks = data; 
              // console.log($scope.stacks[0].name)
              $scope.newUser.primaryStack = $scope.stacks[0].name
             
            })
          
      }
      getStacks();

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
      getLocations();

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

alumniApp.controller('profileController', function(userFactory, loginFactory, jobFactory, $scope, $location){

      $scope.newJob = {};
      $scope.newUser = {};
      $scope.stacks = [];
      $scope.locations = [];

      function getUsers(){

          userFactory.getUsers(function(data){
              console.log(data, "this is coming from my factory var customers, it's my hard coded object");
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
      getJobs();

      function getStacks(){

          jobFactory.getStacks(function(data){
              // console.log(data, "this is coming from my factory var customers, it's my hard coded object");
              $scope.stacks = data; 
              console.log($scope.stacks[0].name)
              $scope.newUser.primaryStack = $scope.stacks[0].name
             
            })
          
      }
      getStacks();

      function getLocations(){

          userFactory.getLocations(function(data){
              console.log(data, "this is coming from my factory var customers, it's my hard coded object");
              $scope.locations = data; 
              console.log($scope.locations)
              console.log($scope.locations[0].name)
              console.log($scope.newUser)
              $scope.newUser.primaryLocation = $scope.locations[0].name
             
            })
          
      }
      getLocations();

      $scope.addUser = function(newUser){
          console.log(newUser);
           // this is form data getting passed through from HTML View
            userFactory.createUser(newUser,function(){ 
              $scope.newUser = {};    // sets input fields to clear.
               $location.path('/users');
              getUsers();              
            });
    
          }
      });

      // $scope.login = function(user){
      //       loginFactory.login(user, function(){

      //       loginFactory.getUser(function(user){
      //       console.log(user);
      //       // $location.path('/userUpdate');

      //       })

      //    })
      //   }

      // loginFactory.getUser(function(user){
      //       // console.log(user);
      //       $scope.currentUser = user;
      //   })

      //  console.log($scope.currentUser)

alumniApp.controller('jobController', function(jobFactory, $scope, $location){

      $scope.newJob = {};
      $scope.stacks = [];

      function getJobs(){

          jobFactory.getJobs(function(data){
              console.log(data, "this is coming from my factory var customers, it's my hard coded object");
              $scope.jobs = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
            })

      }
      getJobs();

      function getStacks(){

          jobFactory.getStacks(function(data){
              console.log(data, "this is coming from my factory var customers, it's my hard coded object");
              $scope.stacks = data; 
              console.log($scope.stacks[0].name)
              $scope.newJob.primaryStack = $scope.stacks[0].name
             
            })
          
      }
      getStacks();

      $scope.addJob = function(newJob){
          console.log(newJob);
           // this is form data getting passed through from HTML View
            jobFactory.createJob(newJob,function(){ 
              $scope.newJob = {};    // sets input fields to clear.
               // $location.path('/');
              getJobs();              
            });
          }
      });
    
alumniApp.controller('eventController', function(eventFactory, $scope){
      function getEvents(){

          eventFactory.getEvents(function(data){
              console.log(data, "this is coming from my factory var customers, it's my hard coded object");
              $scope.events = data; // $scope.users makes 'users' object available to be used in the html with ng-repeat. This also gets updated anytime a new user is added.
            })

      }
      getEvents();

      $scope.addEvent = function(newEvent){
          console.log(newEvent);
           
            jobFactory.createEvent(newEvent,function(){ 
              $scope.newEvent = {};  
               // $location.path('/');
              getEvents();              
            });
    
          }
    });