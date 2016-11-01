console.log(3 + true); // 4

// 'hello'(2); // "hello" is not a function
// null.x; // Cannot read property 'x' of null

console.log(1 + 1); // 2
console.log('hello' + ' world'); // hello world

console.log(2 + '3'); // 23
console.log('2' + 3); // 23
console.log('2' + '3'); // 23

console.log(1 + '2' + 3); // 123

console.log(2 * '3'); // 6
console.log('8' | '1'); // 9

var x = NaN;
console.log(x === x); // false
var a = {};
console.log(a === a); // true
var b = null;
console.log(b === null); // true

console.log(isNaN(NaN)); // true;

console.log(isNaN({})); // true
console.log(isNaN(undefined)); //true
console.log(isNaN('foo')); // true;
console.log(isNaN({valueOf: 'foo'})); // true

console.log(isNaN({valueOf: function(){return 1}})); // false

console.log('J' + {toString: function(){return 'S'}}); // JS
console.log(1 + {valueOf: function(){return 2}}); // 3

var obj = {
    toString: function() {
        return 'obj';
    },
    valueOf: function() {
        return 1;
    }
};

console.log(1 + obj); // 2
console.log('1' + obj); // 11


// bad
function badPoint(x, y) {
    if(!x) {
        x = 1;
    }
    if(!y) {
        y = 1;
    }
    return {
        x: x,
        y: y
    }
}

// good
function point(x, y) {
    if(typeof x === undefined || y === undefined) {
        return {
            x: x || 1,
            y: y || 1
        }
    }
    return {
        x: x,
        y: y
    }
}

console.log(badPoint(0, 0)); // { x: 1, y: 1 }
console.log(point(0, 0)); // { x: 0, y: 0 }
console.log(point()); // { x: 1, y: 1 }