'use strict';

var
  a = new Array(),
  b = new Array(10),
  c = new Array('one', 'two'),
  d = [],
  e = [1, 2, 3, 4, 5];

// Search in simple arrays
var
  simpleArray = [124, 45, 458, 12, -567, 1000];

console.log(simpleArray.indexOf(12));

console.log(simpleArray.indexOf(100));

var
  // collection
  complexArray = [
    {
      name: 'Peter',
      lastName: 'Belinsky',
      age: 22
    },
    {
      name: 'Joe',
      lastName: 'Smith',
      age: 18
    }
  ];

// find all people with age more than 20
console.log(complexArray.filter(function(user) {
  return user.age > 20;
}));

// what about find one element?
console.log(complexArray.reduce(function(found, user) {
  return found || (user.name === 'Peter' ? user : false);
}, false));

// change the each collection element
console.log(complexArray.map(function(user) {
  return user.name + ' ' + user.lastName;
}));

// add element
complexArray.push({
  name: 'Sara',
  lastName: 'Connor',
  age: 32
});

console.log(complexArray);