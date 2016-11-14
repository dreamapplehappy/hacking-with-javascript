### 保持一致的约定

```javascript
// 函数名尽量能够表达我们的意思
// 参数的顺序,名字符合习惯的约定
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

var rect = new Rectangle(10, 20);
console.log(rect); // Rectangle { width: 10, height: 20 }
```
[源码](item53/demo.js)

------

### 谨记
+ **在变量名和函数签名中使用一直的约定。**
+ **不要偏离用户在他们的开发平台中很可能遇到的约定。**