alumniApp.controller('eventController', function(loginFactory, eventFactory, $scope){
  // ______ currentUser _______//
  function getCurrentUser(){
    loginFactory.getUser(function(data){
      $scope.currentUser = data;
      // console.log($scope.currentUser)
    })
  }

  getCurrentUser();
// ______ END currentUser _______//

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