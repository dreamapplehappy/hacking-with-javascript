### 不要信赖函数的对象的`toString`方法

```javascript
console.log((function(x) {
    return x + 1;
}).toString());
/*
 * 输出结果
 * function (x) {
 *  return x + 1;
 * }
 * */

console.log((function(x) {
    return x + 1;
}).bind(10).toString());
/*
 * function () { [native code] }
 * */

console.log((function(x) {
    return function(y) {
        return x + y;
    }
}).bind(20).toString());
/*
 * function () { [native code] }
 * */
```
[源码](item28/demo.js)

------

### 谨记
+ **当调用函数的`toString`方法时,并没有要求`JavaScript`引擎能够精确地获取到函数的源代码。**
+ **由于在不同的引擎下调用`toString`方法的结果可能不同,所以绝对不要信赖函数源代码的详细细节。**
+ **`toString`方法的执行结果并不会暴露存储在闭包中的局部变量值。**
+ **通常情况下,应该避免使用函数对象的`toString`方法。**