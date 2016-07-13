'use strict';

/*!
 * Module dependencies.
 */

const fs = require('fs');
const envFile = require('path').join(__dirname, 'env.json');

let env = {};

// Read env.json file, if it exists, load the id's and secrets from that
// Note that this is only in the development env
// it is not safe to store id's in files

if (fs.existsSync(envFile)) {
  env = fs.readFileSync(envFile, 'utf-8');
  env = JSON.parse(env);
  Object.keys(env).forEach(key => process.env[key] = env[key]);
}

/**
 * Expose
 */

module.exports = {
  db: 'mongodb://localhost/dev-intranet',
  facebook: {
    clientID: 488623138014505,
    clientSecret: '07aed49ebe29c09df4db94a1fd205c4b',
    callbackURL: 'http://139.59.9.132:3001/auth/facebook/callback'
  },
  linkedin: {
    clientID: '75k7vgzbxl72q1',
    clientSecret: 'NAlzGkLGpNAMF48o',
    callbackURL: 'http://139.59.9.132:3001/auth/linkedin/callback'
  },
  github: {
    clientID: '71a79af9c165cf24caf4',
    clientSecret: '3bb061b2a2966c02bea115ba01a1c8c2950c8850',
    callbackURL: 'http://139.59.9.132:3001/auth/github/callback'
  },
  google: {
    clientID: 'process.env.GOOGLE_CLIENTID',
    clientSecret: 'process.env.GOOGLE_SECRET',
    callbackURL: 'http://139.59.9.132:3001/auth/google/callback'
  },
  twitter: {
    clientID: 'process.env.TWITTER_CLIENTID',
    clientSecret: 'process.env.TWITTER_SECRET',
    callbackURL: 'http://139.59.9.132:3001/auth/twitter/callback'
  }
};