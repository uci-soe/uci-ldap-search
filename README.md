# uci-ldap-search
A search tool based on [ldapjs](https://github.com/mcavage/node-ldapjs) which adds UCI's LDAP base and allows non-credentialed search to the extent allowable by OIT. UCI OIT LDAP information located [here](http://www.oit.uci.edu/idm/ldap/).

It's very simple so far and has very little concept of searches, but it is a minor step to make ldap more accessible to those who just need to search quickly for basic information like campus_id, name, email, phone number, etc. only things which one can already get from [the directory](http://directory.uci.edu/) and campus_id.

## Install

```sh
$ npm install --save uci-ldap-search
```

## Usage
It only has two functions presently, `searchBy` which takes a raw filter, and `searchByNetID` with takes a UCINetID.


```js
var Ldap = require('uci-ldap-search');

Ldap.searchByNetID('rhett', function (err, data) {
  if (err) {
    throw err;
  }
  
  console.log(data); // object of ldap data
});

// Use like searching.
var useLike = true;
Ldap.searchByNetID('hett', useLike, function (err, data) {
  if (err) {
    throw err;
  }
 
  console.log(data); // array of objects of ldap data
});

Ldap.searchBy('(&(cn=Rhett *)(uid=rhett))', function (err, data) {
  if (err) {
    throw err;
  }
  
  console.log(data); // object of ldap data
});
```

## Todo
- [ ] Add array input for `searchByNetID`
- [ ] Make functions then-able using promises
- [ ] Add ability to authenticate for non-public usage


## License
See [LICENSE](LICENSE) for full info.

## Contributors
- [Rhett Lowe](https://github.com/rhettl)

## Contributions
By all means, if you know LDAP better than me (which is just about everyone), jump right in with a fork and a pull request\! 
