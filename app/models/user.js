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
    this.on('creating', (model, attrs, options) => {
      model.set('username', model.attributes.username);
      bcryptHash(model.attributes.password, null, null)
      .then(hashed => model.set('password', hashed));
    });
  }
});

module.exports = User;