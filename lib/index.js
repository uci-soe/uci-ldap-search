'use strict';

var Ldap = require('ldapjs');
var client = new Ldap.createClient({ //eslint-disable-line new-cap
  url           : 'ldap://ldap.service.uci.edu',
  version       : 3,
  starttls      : false,
  connecttimeout: 1,
  reconnect     : true
});


var base = 'ou=University of California Irvine,o=University of California, c=US';
var noop = function () {
};

var searchBy = function (filter, cb) {
  if (arguments.length === 0) {
    throw new Error('No arguments given');
  } else if (typeof filter !== 'string') {
    throw new Error('First argument must be of type String');
  } else if (!filter) {
    var newErr = new Error('Filter string must not be empty');
    if (cb) {
      return cb(newErr);
    } else {
      throw newErr;
    }
  }

  cb = cb || noop;

  client.search(base, {
    scope     : 'sub',
    filter    : filter,
    attributes: ''
  }, function (serchErr, res) {
    /* istanbul ignore if: Cannot figure out how to write test for this */
    if (serchErr) {
      return cb(serchErr);
    }

    var data = [];

    res.on('searchEntry', function (entry) {
      data.push(entry.object);
      //console.log('entry: ' + JSON.stringify(entry.object));
    });

    res.on('searchReference', function (referral) {
      /* istanbul ignore next: Cannot figure out how to write test for this */
      console.log('referral: ' + referral.uris.join());
    });

    res.on('error', function (err) {
      /* istanbul ignore next: Cannot figure out how to write test for this */
      cb(err);
    });
    res.on('end', function () {
    //res.on('end', function (result) {
      //console.log('status: ' + result.status);
      cb(null, data);
    });
  });

};

module.exports = {
  searchBy     : searchBy,
  searchByNetID: function (str, like, cb) {

    if (arguments.length === 0) {
      throw new Error('No arguments given');
    } else if (arguments.length === 1) {
      like = false;
      cb = noop;
    } else if (arguments.length === 2) {
      if (typeof arguments[1] === 'function') {
        cb = arguments[1];
        like = false;
      } else {
        cb = noop;
      }
    }

    if (like) {
      if (str.length < 4) {
        return cb(new Error('Search string must be > 3 characters to use like feature'));
      }

      str = '*' + str + '*';
    }

    return searchBy('(uid=' + str + ')', cb);
  }
}
;
