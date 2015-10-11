'use strict';

/*
Console
 */
console.log('Hello world!');

var
  a = 5,
  str = 'Hello',
  obj = {
    tree: 'apple',
    height: 4.5
  };

console.log('%d %s %o', a, str, obj);

// levels
console.info('Just information');
console.warn('Warnings');
console.error('This is the error');


var
  big = 100000000;

console.time('Execution time');
while (big--) {}
console.timeEnd('Execution time');

//console.dir(document.documentElement);


/*
 Case sensitive
 */
var
  aa = 1, Aa = 2;

console.log(aa, Aa);

/*
Primitive and reference values
 */
var
  c = 5, f,
  o = {
    name: 'Peter'
  }, o1 = o;

f = c;

f++;

console.log(c);

o1.name = 'Joe';

console.log(o);


/*
Logical && and ||
*/

// && - returns the first not true operand or the last one
console.log(1 && 2 && 3 && false && 10);  // => false
console.log(1 && 2 && 3 && 4 && 10); // => 10

// U can use it everywhere:
var
  user = {
    active: true, // try change to false
    firstname: 'John',
    lastname: 'Malkovich'
  };

console.log(user.active && user.firstname + ' ' + user.lastname);

// || - returns the first true operand or the last one
console.log(1 || 2 || false);
console.log(0 || undefined || false);

// using:
// TODO Think up the sample