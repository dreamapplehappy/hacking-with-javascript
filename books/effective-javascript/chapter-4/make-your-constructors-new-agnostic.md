### 使构造函数与操作符`new`无关

```javascript
// 一步一步来实现一个不需要通过使用new操作符来创建对象的函数
// @1
function User1(name) {
    //'use strict';
    this.name = name;
}
// 使用new
var user1 = new User1('dreamapple');
console.log(user1); // User1 { name: 'dreamapple' }
// 不使用new 那么就没有创建一个新的对象 函数中的this指向window 所以name属性也就添加到了全局中
var u1 = User1('dreamapple');
console.log(u1); // undefined
console.log(this.name); // dreamapple
// 如果我们给构造函数使用严格模式的话,那它会提早报错,可以更早的发现错误。

// 修改我们的函数
// @2
function User2(name) {
    if(this instanceof User2) {
        this.name = name;
    }
    else {
        return new User2(name);
    }
}
// 我们可以不使用new操作符
var user2 = User2('dreamapple');
console.log(user2); // User2 {name: "dreamapple"}
var u2 = new User2('dreamapple');
console.log(u2); // User2 {name: "dreamapple"}
console.log(u2 instanceof User2, user2 instanceof User2); // true true
// 上面虽然实现了我们想要的目的,但是它需要额外的函数调用,因此代价有点高

// @3 不使用额外的函数调用,通过会用Object.create()
function User3(name) {
    var self = this instanceof User3 ? this : Object.create(User3.prototype);
    self.name = name;
    return self;
}
var user3 = new User3('dreamapple3');
console.log(user3); // User3 {name: "dreamapple3"}
var u3 = User3('dreamapple3');
console.log(u3); // User3 {name: "dreamapple3"}

// @4 在不支持Object.create()的环境中使用
if('undefined' === typeof Object.create) {
    Object.create = function(prototype) {
        function O() {}
        O.prototype = prototype;
        return new O();
    }
}
function User4(name) {
    var self = this instanceof User4 ? this : Object.create(User4.prototype);
    self.name = name;
    return self;
}

var user4 = new User4('dreamapple');
console.log(user4); // User4 {name: "dreamapple"}
var u4 = User4('dreamapple');
console.log(u4); // User4 {name: "dreamapple"}
```
[源码](item33/demo.js)

------

### 谨记
+ **通过使用`new`操作符或`Object.create()`方法在构造函数定义中调用自身使得该构造函数与调用语法无关。**
+ **当一个函数期望使用`new`操作符调用时,清晰地文档化该函数。**