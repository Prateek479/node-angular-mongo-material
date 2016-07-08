'use strict';

var Variable = require('mongoose').model('Variable');

exports.render = function(req, res) {

  function isAdmin() {
    return req.user && req.user.roles.indexOf('admin') !== -1;
  }

  function listPermissions(allPermission) { // checking for user role and permission
    var permission = [];
    allPermission[0].data.forEach(function(value) {
      value.roles.forEach(function(role) {
        if (req.user.roles.indexOf(role) > -1)
          permission.push(value.permission);
      });
    });
    return permission;
  }

  // Send some basic starting info to the view
  var query = Variable.find({
    name: 'permission'
  });
  query.exec(function(err, allPermission) {
    res.render('index', {
      user: req.user ? {
        name: req.user.name,
        _id: req.user._id,
        username: req.user.username,
        permission: listPermissions(allPermission),
        roles: req.user.roles
      } : {},
      isAdmin: isAdmin
    });
  });
};