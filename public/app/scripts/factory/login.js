'use strict';


angular.module('intranetMaterialApp').factory('userUtility', ['$rootScope', '$http', '$timeout', '$q', '$cookies', '$location', '$stateParams',
  function($rootScope, $http, $timeout, $q, $cookies, $location, $stateParams) {

    function MeanUserKlass() {}

    var MeanUser = new MeanUserKlass();

    MeanUserKlass.prototype.checkLoggedin = function() {

      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {

        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $cookies.put('redirect', $location.path());
          $timeout(deferred.reject);
          $location.url('login');
        }
      });

      return deferred.promise;
    };

    MeanUserKlass.prototype.checkLoggedOut = function() {
      // Check if the user is not connected
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/api/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') {
          $timeout(deferred.reject);
          $location.url('/');
        }
        // Not Authenticated
        else $timeout(deferred.resolve);
      });

      return deferred.promise;
    };
    return MeanUser;
  }
]);