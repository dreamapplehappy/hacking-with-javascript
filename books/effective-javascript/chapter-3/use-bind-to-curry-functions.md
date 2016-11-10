### 使用`bind`方法实现函数的柯里化

```javascript
function sayHello(name, words) {
    console.log('Hello, ' + name + words);
}

// 将函数与其参数的一个子集绑定的技术称为函数的柯里化
function sayHelloToDr(words) {
    //sayHello('dreamapple', words);
    // 使用bind
    sayHello.bind(null, 'dreamapple', words)();
}

sayHello('dreamapple', ' happy'); // Hello, dreamapple happy
sayHello('dreamapple1', ' happy1'); // Hello, dreamapple1 happy1

sayHelloToDr(' a nice day'); // Hello, dreamapple a nice day
sayHelloToDr(' nice to meet you'); // Hello, dreamapple nice to meet you
```
[源码](item26/demo.js)

------

### 谨记
+ **使用`bind`方法实现函数的柯里化,即创建一个固定需求参数子集的委托函数。**
+ **传入`null`或者`undefined`作为接收者的参数来实现函数的柯里化,从而忽略其接收者。**