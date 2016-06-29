'use strict';

/**
 * @ngdoc overview
 * @name intranetMaterialApp
 * @description
 * # intranetMaterialApp
 *
 * Main module of the application.
 */
angular.module('intranetMaterialApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ui.router',
  'ngSanitize',
  'ngTouch'
]).config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('Main', {
      url: "/",
      templateUrl: 'views/main.html'
    }).state('About', {
      url: "/about",
      templateUrl: 'views/about.html'
    }).state('Login', {
      url: "/login",
      templateUrl: 'views/users/login.html'
    });
  }
]);