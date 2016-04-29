alumniApp.factory('eventFactory', function($http) {
  var factory = {};
  var events;

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