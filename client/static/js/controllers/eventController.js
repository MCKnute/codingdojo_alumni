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