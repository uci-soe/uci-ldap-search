# uci-node-ldap
A search tool based on [ldapjs](https://github.com/mcavage/node-ldapjs) which adds UCI's LDAP base and allows non-credentialed search to the extent allowable by OIT.
It is very simple so far and has very little concept of searches, but it is a minor step to make ldap more accessible to those who just need to search quickly for basic information like campus_id, name, email, phone number, etc. only things which one can already get from [the directory](http://directory.uci.edu/).

## Install
Unfortunately, until NPM fixes its handling of SSH Keys, the best way to install using NPM is this:


```sh
$ GIT_SSH_COMMAND='ssh -i ~/.ssh/id_rsa.pub' npm install git+ssh://git@github.oit.uci.edu:education/node-ldap.git
```

Of course, replace `~/.ssh/id_rsa.pub` with the file location of the RSA Key you generated for Github.oit.uci.edu.
There is an issue already placed regarding this bug, in NPM, but it has yet to be resolved.


## Usage
It only has two functions presently, `searchBy` which takes a raw filter, and `searchByNetID` with takes a UCINetID.


```js
var Ldap = require('uci-node-ldap');

uciNodeLdap.searchByNetID('rhett', function (err, data) {
  if (err) {
    throw err;
  }
  
  console.log(data); // object of ldap data
});

uciNodeLdap.searchBy('(&(cn=Rhett *)(uid=rhett))', function (err, data) {
  if (err) {
    throw err;
  }
  
  console.log(data); // object of ldap data
});
```

## Todo
- [ ] Add array input for `searchByNetID`
- [ ] Make functions then-able using promises


## License
Still working on this. See [LICENSE](LICENSE) for full info.

## Contributors
- [Rhett Lowe](https://github.oit.uci.edu/rhett)

## Contributions
By all means, if you know LDAP better than me (which is just about everyone), jump right in with a fork and a pull request\! 
