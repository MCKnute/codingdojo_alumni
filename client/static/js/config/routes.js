alumniApp.config(function($routeProvider){
	$routeProvider
		// .when('/',{
		// 	templateUrl: './../static/partials/login.html',
		// 	controller: "usersController"
		// })
		.when('/dash', {
			templateUrl: './../static/partials/dashboard.html',
			controller: "command-tool"
		})
		.when('/gitkitWidget', {
			templateUrl: './../static/partials/gitkit-widget.html',
			controller: "gitkitWidgetsController"
		})
		.otherwise({
			templateUrl: '/'
		})
});