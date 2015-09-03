'use strict';

var assert = require('assert');
var ldap   = require('../lib');

describe('function searchBy', function () {

  it('should throw an error when no arguments are given', function () {

    assert.throws(function () {
      ldap.searchBy();
    }, Error);

  });
  it('should throw an error when first argument isn\'t a string', function () {

    assert.throws(function () {
      ldap.searchBy(null);
    }, Error);

  });
  it('should throw an error when the first argument, string, is empty', function () {

    assert.throws(function () {
      ldap.searchBy('');
    }, Error);

  });
  it('should return an error when the first argument, string, is empty', function (done) {

    ldap.searchBy('', function (err) {
      assert(err);
      done();
    });

  });
  it('should return an error when the first argument, string, is empty', function (done) {

    ldap.searchBy('', function (err) {
      assert(err);
      done();
    });

  });
  it('should call the callback with successful data or error after completion', function (done) {

    ldap.searchBy('(uid=rhett)', function () {

      assert(true);
      done();

    });

  });
  it('should return Rhett when searching for him by UCINetID', function (done) {

    ldap.searchBy('(uid=rhett)', function (err, data) {

      assert.ifError(err);
      assert(data.length, 1);
      assert(data[0].uid, 'rhett');

      done();

    });

  });

});

describe('function searchByNetID', function () {

  it('should throw an error when no arguments are given', function () {

    assert.throws(function () {
      ldap.searchByNetID();
    }, Error);

  });
  it('should not throw an error when no callback is given', function () {

    assert.doesNotThrow(function () {
      ldap.searchByNetID('rhett');
    }, Error);

  });
  it('should not throw an error when no callback is given, with like flag', function () {

    assert.doesNotThrow(function () {
      ldap.searchByNetID('rhett', true);
    }, Error);

  });
  it('should call the callback with successful data or error after completion', function (done) {

    ldap.searchByNetID('rhett', function () {

      assert(true, true);
      done();

    });

  });
  it('should return Rhett when searching for him by UCINetID', function (done) {

    ldap.searchByNetID('rhett', function (err, data) {

      assert.ifError(err);
      assert(data.length, 1);
      assert(data[0].uid, 'rhett');

      done();

    });

  });
  it('should return Rhett when searching for him by UCINetID with like flag', function (done) {

    ldap.searchByNetID('hett', true, function (err, data) {

      assert.ifError(err);
      assert(data.length > 0, true);
      assert(
        data
          .filter(function (i) {
            return i.uid === 'rhett';
          })
          .length,
        1
      );

      done();

    });

  });
  it('should return an error when looking for NetID with less than 4 chars', function (done) {

    ldap.searchByNetID('het', true, function (err) {

      assert(err);
      done();

    });

  });

});
