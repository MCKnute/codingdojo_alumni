alumniApp.factory('loginFactory', function($http, $location) {
  var factory = {};
  var currentUser = null;
  console.log(currentUser);

//a method to get the user if there is one!
  factory.getUser = function(callback){
      if(currentUser) callback(currentUser);
      else{
        //redirect to the root!
        $location.path('/');
      }
  }

  // factory.login = function(user, callback) {
  //   $http.post('/login', user).then(function(response){
  //       console.log(response.data);
  //       currentUser = response.data;
  //       console.log(currentUser);
  //     callback();
  //   })
  // }
  factory.login = function(data, successHandler, failHandler){
    $http.post('/login', data).then(function(res){
      console.log(res.data);
      currentUser = res.data;
      console.log( "This is the current user: ",currentUser);
      successHandler(res);
    }, failHandler);
  }

  factory.getId = function(callback){
      $http.get('/userId').then(function(output){
          
          userId = output.data;
          console.log(userId);
          return
          callback(userId);
      })
  }

  factory.register = function(data, successHandler, failHandler) {
    $http.post('/signup', data).then(successHandler, failHandler);
  }

  return factory;
});