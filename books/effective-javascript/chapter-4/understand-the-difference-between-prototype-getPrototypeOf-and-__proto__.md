### 理解`prototype`,`getPrototypeOf`和`__proto__`之间的不同

```javascript
// 创建一个类
function Student(name, age) {
    this.name = name;
    this.age = age;
}
// 创建原型
Student.prototype.info = function() {
    console.log('My name is ' + this.name + ' and my age is ' + this.age);
};
// C.prototype == new C().__proto_   C.prototype == Object.getPrototypeOf(new C())

var s = new Student('dreamapple', 22);
s.info(); // My name is dreamapple and my age is 22

console.log(Student.prototype === s.__proto__); // true
console.log(Student.prototype === Object.getPrototypeOf(s)); // true
```
[源码](item30/demo.js)

------

### 谨记
+ **`C.prototype属性是`new C()`创建的对象的原型。**
+ **`Object.getPrototypeOf(obj)`是`ES5`中检索对象原型的标准函数。**
+ **`obj.__proto__`是检索对象原型的非标准方法。**
+ **类是由一个构造函数和一个关联的原型组成的一种设计模式。**