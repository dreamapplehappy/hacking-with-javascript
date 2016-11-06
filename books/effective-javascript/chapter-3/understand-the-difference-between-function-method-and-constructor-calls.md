### 理解函数调用,方法调用及构造函数调用之间的不同

```javascript
function hello() {
    console.log('Hello, World');
}
// 函数的调用
hello(); // Hello, World

var obj = {
    welcome: function() {
        console.log('Hello, ' + this.name);
    },
    name: 'dreamapple'
};
// 方法调用
obj.welcome(); // Hello, dreamapple

function Student(name, age) {
    this.name = name;
    this.age = age;
    console.log('My name is ' + this.name + ', and my age is ' + this.age);
}
// 构造函数的调用
var s = new Student('dreamapple', 23); // My name is dreamapple, and my age is 23
```
[源码](item18/demo.js)

------

### 谨记
+ **函数调用将全局对象(处于严格模式下则为`undefined`)作为接收者。一般很少使用函数调用语法来调用方法。**
+ **方法调用将被查找方法属性的对象作为调用接受者。**
+ **构造函数需要通过`new`运算符调用,并产生一个新的对象作为其接受者。**