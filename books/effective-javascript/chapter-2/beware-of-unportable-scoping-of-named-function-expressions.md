### 当心命名函数表达式笨拙的作用域

```javascript
// 命名的函数表达式
var f = function func() {
    // func的作用域只是在本函数内部,在外部不可访问
    console.log(f);
    console.log(func);
};
console.log(f);
// console.log(func); // func is not defined

// 所以尽量使用匿名的函数表达式

function constructor() {
    return null;
}

var func1 = function func2() {
    return constructor();
};

console.log(func1()); // null
```
[源码](item14/demo.js)

### 谨记
+ **在Error对象和调试器中使用命名函数表达式改进栈跟踪。**
+ **在ES3和有问题的JavaScript环境中谨记函数表达式作用域会被Object.prototype污染。**
+ **谨记在错误百出的JavaScript环境中会提升命名函数表达式声明,并导致命名函数表达式的重复存储。**
+ **考虑避免使用命名函数表达式或者在发布前删除函数名。**
+ **如果你将代码发布到正确实现的ES5环境中,那么你没有什么好担心的。**

























