function C() {}
C.prototype = null;

var o = new C();
// 我们得到的依然是一个对象
console.log(Object.getPrototypeOf(o) === null); // false
console.log(Object.getPrototypeOf(o)); // Object {}

// 使用Object.create() 可以创建一个没有原型的对象
var o1 = Object.create(null);
console.log(Object.getPrototypeOf(o1) === null); // true
console.log(Object.getPrototypeOf(o1)); // null

// 使用__proto__ 但是要尽量避免使用这个属性
var o2 = {__proto__: null};
console.log(Object.getPrototypeOf(o2) === null); // true
console.log(Object.getPrototypeOf(o2)); // null