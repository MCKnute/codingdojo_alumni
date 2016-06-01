alumniApp.factory('loginFactory', function($http, $location) {
  // console.log('in login fac');
  var factory = {};
  var currentUser = null;
  var userId;

//a method to get the user if there is one!
  factory.getUser = function(callback){
      if(currentUser){
        // console.log('__loginFactory, getUser __ this is the currentUser: ', currentUser);
        callback(currentUser);
      }
      else{
        //redirect to the root!
        $location.path('/');
      }
  }

  factory.login = function(data, successHandler, failHandler){
    // console.log(data);
    $http.post('/login', data).then(function(res){
      // console.log(res.data);
      currentUser = res.data;
      // console.log( "This is the current user: ",currentUser);
      successHandler(res);
    }, failHandler);
  }

  factory.register = function(data, successHandler, failHandler) {
    $http.post('/signup', data).then(successHandler, failHandler);
  }

  return factory;
});