'use strict';


angular.module('intranetMaterialApp')
  .controller('LoginCtrl', ['$scope', '$http',
    function($scope, $http) {
      $scope.user = {}
      $scope.login = function() {
        $http.post('/users/session', {
          email: $scope.user.email,
          password: $scope.user.password,
        })
      };
    }
  ])