'use strict';

var
  a = new Array(),
  b = new Array(10),
  c = new Array('one', 'two'),
  d = [1],
  e = [1, 2, 3, 4, 5];

console.log(d, d.length);

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


// Objects
var
  o = {}, // empty object
  user = {
    name: 'Joe',
    lasName: 'Smith',
    age: 30
  },

  // comp objects
  pc = {
    motherboard: 'ASUS  H81M-K',
    CPU: 'Intel Core i3-4330',
    memory: {
      type: 'DIMM',
      freq: 1600,
      size: 16
    }
  };

console.log(pc.motherboard);
console.log(pc.memory.type);

// access like associate array
console.log(pc['memory']);

// add new property
pc.disk = {
  vendor: 'Seagate',
  size: 465
};

// another way:
pc.disk['version'] = 'KC48';

console.log(pc);

// delete property
delete pc.memory;

console.log(pc);