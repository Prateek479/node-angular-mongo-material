'use strict';

var config = require('./mydb');
var collections = ['variables'];
var mongojs = require('mongojs')
var db = mongojs(config.db, collections);

exports.up = function(next) {
  db.variables.insert({
    "name": "Roles",
    "data": [
      "admin",
      "authenticated"
    ]
  });
  db.variables.insert({
    "name": "permission",
    "data": [{
      "roles": [
        "admin"
      ],
      "permission": "canCreateContent"
    }, {
      "roles": [
        "admin"
      ],
      "permission": "canDeleteContent"
    }, {
      "roles": [
        "admin",
        "authenticated"
      ],
      "permission": "canManagePermission"
    }]
  }, next);
};
exports.down = function(next) {
  next();
};