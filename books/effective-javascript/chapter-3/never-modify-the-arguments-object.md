### 永远不要修改`arguments`对象

```javascript
// 尝试修改arguments对象
function callMethod(obj, method) {
    var shift = [].shift;
    shift.call(arguments);
    shift.call(arguments);
    console.log(arguments); // { '0': 1, '1': 2 }
    console.log(arguments[0] === obj, arguments[0] === 1); // true true(当我们的第三个参数是数字1)
    console.log(arguments[1] === method, arguments[1] === 2); // true true(当我们的第四个参数是数字2)
    // 因为obj === arguments[0]
    // 因为method === arguments[1]
    return obj[method].apply(obj, arguments); // 相当于[]
}

var obj = {
    add: function(x, y) {
        return x + y;
    }
};

//callMethod(obj, 'add', 1, 2); // Cannot read property 'apply' of undefined

// 严格模式下
function strictMode(x) {
    'use strict';
    arguments[0] = 'something';
    console.log(x, arguments[0]); // hello something
    return x === arguments[0];
}
// 非严格模式下
function notStrictMode(x) {
    arguments[0] = 'something';
    console.log(x, arguments[0]); // something something
    return x === arguments[0];
}

console.log(strictMode('hello')); // false
console.log(notStrictMode('hello')); // true

// 修复刚开始的方法
function fixCallMethod(obj, method) {
    var args = [].slice.call(arguments, 2);
    return obj[method].apply(obj, args);
}

console.log(fixCallMethod(obj, 'add', 1, 2)); // 3
```
[源码](item23/demo.js)

------

### 谨记
+ **永远不要修改`arguments`对象。**
+ **使用`[].slice.call(arguments)`将`arguments`对象复制到一个真正的数组中再进行修改。**