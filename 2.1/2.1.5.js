// Functions

// define new function

// 1
function sum1(a, b) {
  return a + b;
}

// 2
var
  sum2 = function(a, b) {
    return a + b;
  };

console.log(sum1(2, 2), sum2(3, 3));

// 3 anonymous function syntax
(function(a, b) {
  console.log(a + b);
})(10, 10);

// Closures

// Simple example of closure
function getMeAClosure() {
  var
    greeting = 'Hello, world!';

  return function() {
    console.log(greeting);
  }
}

var
  f = getMeAClosure();

f();

// More complex example
var
  nodes = [{}, {}, {}]; // Let's imagine this is a list of DOM nodes

var i;

for (i = 0; i < nodes.length; i++) {
  nodes[i].onclick = function() {
    console.log(i);
  }
}

nodes[1].onclick(); // 3

// Seems to work incorrect? Let's fix that with closure:

for (i = 0; i < nodes.length; i++) {
  nodes[i].onclick = (function(param) {
    return function() {
      console.log(param);
    }
  })(i);
}

nodes[1].onclick(); // 1


// DON'T USE new Function() constructor!
// There are no reasons to do this
// =============================================

// Recursion
function factorial(num) {
  return num ? num + factorial(num - 1) : 0;
}

console.log(factorial(100));

// How to get normal arguments array?
function sliceArguments() {
  console.log(arguments);

  console.log(Array.prototype.slice.call(arguments));
}

sliceArguments("first", "second", 5, {name: "Joe"});
