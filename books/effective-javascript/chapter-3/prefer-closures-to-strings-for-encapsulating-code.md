### 使用闭包而不是字符串来封装代码

```javascript
var a = 1;

var code = 'a = 123';

function handle() {
    eval(code);
}

handle();
console.log(a); // 123
```
[源码](item27/demo.js)

------

### 谨记
+ **当将字符串传递给`eval`函数以执行它们的`API`时,绝不要在字符串中包含局部变量引用。**
+ **接收函数调用的`API`优于使用`eval`函数执行字符串的`API`。**