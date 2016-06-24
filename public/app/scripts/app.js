'use strict';

/**
 * @ngdoc overview
 * @name intranetMaterialApp
 * @description
 * # intranetMaterialApp
 *
 * Main module of the application.
 */
angular
  .module('intranetMaterialApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/users/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  });