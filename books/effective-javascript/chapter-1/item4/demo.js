var s = new String('hello');
console.log(s); // String {0: "h", 1: "e", 2: "l", 3: "l", 4: "o", length: 5, [[PrimitiveValue]]: "hello"}

var str = s + ' world';
console.log(str); // hello world

console.log(str[4]); // o

console.log(typeof 'hello'); // string
console.log(typeof s); // object

var s1 = new String('hello');
var s2 = new String('hello');
console.log(s1 === s2); // false
console.log(s1 == s2); // false

console.log(str.toUpperCase()); // HELLO WORLD

str.someProperty = 'some';
console.log(str.someProperty); // undefined