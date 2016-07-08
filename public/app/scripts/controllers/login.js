'use strict';


angular.module('intranetMaterialApp')
  .controller('LoginCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
      $scope.user = {}
      $scope.type = 'signin'
      $scope.login = function() {
        $http.post('/users/session', {
          email: $scope.user.email,
          password: $scope.user.password,
        }).success(function(result) {
          window.location.reload();
        }).error(function(result) {
          if (result === 'Unauthorized')
            $scope.loginerror = 'Please Enter Correct Email/Password';

        });
      };
      $scope.setType = function(value) {
        $scope.type = value;
      }
    }
  ])