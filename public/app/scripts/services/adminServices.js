'use strict';

angular.module('intranetMaterialApp').factory('Permission', ['$resource',

  function($resource) {
    return $resource('config/updatepermission', {

    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]).factory('Global', [

  function() {
    var Global = {
      'user': window.user
    };
    return Global
  }
]).factory('ManagePermission', ['Global',

  function(Global) {
    var permission = function(permissionName) {
      return Global.user.permission.indexOf(permissionName) > -1 || Global.user.roles.indexOf('admin') > -1 ? true : false;
      return true;
    };
    return permission;
  }
]).factory('UpdateRole', ['$resource',

  function($resource) {
    return $resource('/config/updateusers', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]).factory('UpdateUser', ['$resource',

  function($resource) {
    return $resource('user/:userId', {
      userId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);