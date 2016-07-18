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
  'ngTouch',
  'ui.select2',
  'ngMaterial'
]).config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider',
  function($stateProvider, $urlRouterProvider, $mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('brown');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('Main', {
      url: "/",
      views: {
        '': {
          templateUrl: 'views/main.html',
        },
        'anonymous': {
          templateUrl: 'views/about.html',
        }
      }
    }).state('manage permission', {
      url: '/manage/users/permissions',
      templateUrl: 'views/admin/manage-permission.html',
      resolve: {
        loggedIn: function(userUtility) {
          return userUtility.checkLoggedin();
        }
      }
    }).state('manage users', {
      url: '/manage/users',
      templateUrl: 'views/admin/manage-users.html',
      resolve: {
        loggedIn: function(userUtility) {
          return userUtility.checkLoggedin();
        }
      }
    }).state('About', {
      url: "/about",
      templateUrl: 'views/about.html',
      resolve: {
        loggedIn: function(userUtility) {
          return userUtility.checkLoggedin();
        }
      }
    }).state('Login', {
      url: "/login",
      views: {
        'anonymous': {
          templateUrl: 'views/users/login.html',
          resolve: {
            loggedOut: function(userUtility) {
              return userUtility.checkLoggedOut();
            }
          }
        }
      }
    });
  }
]);