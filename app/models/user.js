'use strict';

var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
// const hash = Promise.promisifyAll(require('bcrypt-nodejs').hash());
var bcryptHash = Promise.promisify(bcrypt.hash);




var User = db.Model.extend({
  tableName: 'users',

  // create New User if it doesnt exist
  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  hashPassword: function() {
    let username = this.get('username');
    let password = this.get('password');
    this.set('username', username);
    return bcryptHash(this.get('password'), null, null).bind(this)
          .then(function(hashed) {
            this.set('password', hashed);
          });
  },

  comparePassword: function(attemptPassword, callback) {
    bcrypt.compare(attemptPassword, this.get('password'), (err, match) => {
      callback(match);
    });
  }
});

module.exports = User;