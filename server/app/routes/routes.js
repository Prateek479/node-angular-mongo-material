'use strict';

/*!
 * Module dependencies.
 */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

const users = require('../controllers/users');
const articles = require('../controllers/articles');
const comments = require('../controllers/comments');
const tags = require('../controllers/tags');
const auth = require('./middlewares/authorization');
const system = require('../controllers/system');
const permissions = require('../controllers/permission')

/**
 * Route middlewares
 */

const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
const commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function(app, passport) {

  // user routes
  app.get('/login', users.login);

  app.get('/signup', users.signup);
  app.get('/logout', users.logout);
  app.post('/users', users.create);
  app.post('/users/session', passport.authenticate('local'), function(req, res) {
    res.send('/')
  });
  app.get('/users/:userId', users.show);

  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.signin);


  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/github',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/github/callback',
    passport.authenticate('github', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.signin);
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/google',
    passport.authenticate('google', {
      failureRedirect: '/login',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }), users.signin);
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/login'
    }), users.authCallback);
  app.get('/auth/linkedin',
    passport.authenticate('linkedin', {
      failureRedirect: '/login',
      scope: [
        'r_emailaddress'
      ]
    }), users.signin);
  app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', {
      failureRedirect: '/login'
    }), users.authCallback);

  app.param('userId', users.load);

  // AngularJS route to check for authentication
  app.get('/api/loggedin', function(req, res, next) {
    if (!req.isAuthenticated()) return res.send('0');
    users.find(req.user._id, function(user) {
      res.send(user ? user : 0);
    });
  });

  // article routes
  app.param('id', articles.load);
  app.get('/articles', articles.index);
  app.get('/articles/new', auth.requiresLogin, articles.new);
  app.post('/articles', auth.requiresLogin, articles.create);
  app.get('/articles/:id', articles.show);
  app.get('/articles/:id/edit', articleAuth, articles.edit);
  app.put('/articles/:id', articleAuth, articles.update);
  app.delete('/articles/:id', articleAuth, articles.destroy);

  // home route
  app.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
      // res.render('index', {
      //   title: 'Intranet - get social with profession '
      // });
    } else {
      res.render('splash', {
        title: 'Intranet - get social with profession '
      });
    }
  }, system.render);
  // articles.index
  // comment routes
  app.param('commentId', comments.load);
  app.post('/articles/:id/comments', auth.requiresLogin, comments.create);
  app.get('/articles/:id/comments', auth.requiresLogin, comments.create);
  app.delete('/articles/:id/comments/:commentId', commentAuth, comments.destroy);

  // tag routes
  app.get('/tags/:tag', tags.index);


  // Permission routes
  // Admin Permission and roles
  app.get('/admin/permission', auth.requiresLogin, permissions.getPermission);
  app.get('/admin/role', auth.requiresLogin, permissions.getRoleList);
  app.put('/config/updateusers', permissions.updateUserInfo);
  app.get('/allusers', permissions.listusers);
  app.get('/users', permissions.mentionUsers);
  app.put('/config/updatepermission', permissions.updatePermissions);
  app.route('/user/:userId')
    .put(auth.requiresLogin, permissions.updatedetail)
    .delete(auth.requiresLogin, permissions.destroy);

  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).render('422', {
        error: err.stack
      });
      return;
    }

    // error page
    res.status(500).render('500', {
      error: err.stack
    });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};