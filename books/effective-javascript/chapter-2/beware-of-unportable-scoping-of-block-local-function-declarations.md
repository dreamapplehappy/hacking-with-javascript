### 当心局部块函数声明笨拙的作用域

```javascript
function g() {
    return 'outer';
}

function f(flag) {
    var result = [];
    function g() {
        return 'inner';
    }
    if(flag) {
        result.push(g());
    }
    result.push(g());
    return result;
}

console.log(f(true)); // [ 'inner', 'inner' ]
console.log(f(false)); // [ 'inner' ]

function f1(flag) {
    var result = [];
    //function g() {
    //    return 'inner';
    //}
    if(flag) {
        function g() {
            return 'inner';
        }
        result.push(g());
    }
    result.push(g());
    return result;
}

console.log(f1(true)); // [ 'inner', 'inner' ]
// console.log(f1(false)); // g is not a function 产生了局部快作用域

// 下面是比较正确的做法
function f2(flag) {
    var result = [];
    var g1 = g;
    if(flag) {
        g1 = function() {
            return 'inner';
        };
        result.push(g1());
    }
    result.push(g1());
    return result;
}

console.log(f2(true)); // [ 'inner', 'inner' ]
console.log(f2(false)); // [ 'outer' ]
```
[源码](item15/demo.js)

------

### 谨记
+ **始终将函数声明置于程序或被包含的函数的最外层以避免不可移植的行为。**
+ **使用`var`声明和有条件的赋值语句替代有条件的函数声明。**