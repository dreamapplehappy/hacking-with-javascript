### 避免使用eval创建局部变量

```javascript
// 强大的eval函数
function f() {
    eval('var a = 2');
    return a;
}

console.log(f()); // 2

// 在函数内部使用eval很危险,这赋予了外部的调用者改变函数内部的作用域的能力
function g(str) {
    var a = 1;
    eval(str);
    return a;
}

console.log(g('var a = 12')); // 12
console.log(g('var a = 0')); // 0

// 解决的办法就是使用一个立即执行的函数进行包裹,创建一个独立的作用域

function g1(str) {
    var a = 1;
    (function() {
        eval(str);
    })();
    return a;
}
console.log(g1('var a = 12')); // 1
console.log(g1('var a = 0')); // 1
```
[源码](item16/demo.js)

------

### 谨记
+ **避免使用eval函数创建的变量污染调用者的作用域。**
+ **如果eval函数代码可能创建全局变量,将此调用封装到嵌套的函数中以防止作用域污染。**