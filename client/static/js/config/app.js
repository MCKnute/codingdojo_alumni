var alumniApp = angular.module('alumniApp', ['ngRoute']);

alumniApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: '../partials/landing.html'
    })
    // .when('/signup', {
    //     templateUrl: "./partials/signup.html",
    //     controller: "profileController"
    // })
    .when('/login', {
        templateUrl: "../partials/signup.html",
        controller: "signupController"
     })
    .when('/signup', {
        templateUrl: "../partials/signup.html",
        controller: "signupController"
    })
    .when('/dashboard',{
        templateUrl: '../partials/dashboard.html'
    })

    .when('/dashboard/my-profile',{
        templateUrl: '../partials/my_profile.html',
        controller: "profileController"

    })
    .when('/dashboard/my-profile/edit',{
       templateUrl: "../partials/userupdatetest.html",
       controller: "profileController"
    })
    .when('/dashboard/messages',{
        templateUrl: '../partials/messages.html',
        controller: "alumniController"
    })
    .when('/dashboard/alumni',{
        templateUrl: '../partials/alumni.html',
        controller: "alumniController"
    })
    .when('/dashboard/alumni/detail/:id',{
        templateUrl: '../partials/alumniDetail.html',
        controller: "alumniController"
    })
    .when('/dashboard/users', {
       templateUrl: "../partials/userprofilestest.html",
       controller: "profileController"
    })
    .when('/dashboard/jobs',{
        templateUrl: '../partials/jobs.html',
        controller: "jobController"
    })
    .when('/dashboard/jobs/new', {
       templateUrl: "../partials/addjobtest.html",
       controller: "jobController"
    })
    .when('/dashboard/jobs/detail/:id', {
       templateUrl: "../partials/jobDetail.html",
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