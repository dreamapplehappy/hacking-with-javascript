### 使用`null`原型以防止原型污染

```javascript
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
```
[源码](item44/demo.js)

------

### 谨记
+ **在ES5环境中,使用`Object.create(null)`创建的自由原型的空对象是不太容易被污染的。**
+ **在一些较老的环境中,考虑使用`{__proto__: null}`。**
+ **但要注意`__proto__`既不标准,也不是完全可移植的,并且可能会在未来的`JavaScript`环境中去除。**
+ **绝不要使用`__proto__`名作为字典中的`key`,因为一些环境将其作为特殊的属性对待。**