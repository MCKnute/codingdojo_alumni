var alumniApp = angular.module('alumniApp', ['ngRoute']);

alumniApp.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/login.ejs'
			// controller: "accountController"
		});
		.when('/login',{
			templateUrl: 'views/login.ejs',
			controller: "accountController"
		});
		.when('/dash', {
			templateUrl: 'static/partials/dashboard.html',
			controller: "accountController"
		});
		.when('/gitkit', {
			templateUrl: 'static/partials/gitkit-widget.html',
			controller: "accountController"
		});
		.otherwise({
			redirectTo: '/'
		});
});