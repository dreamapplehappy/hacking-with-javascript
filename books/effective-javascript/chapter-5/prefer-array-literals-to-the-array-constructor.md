### 数组字面量优于数组构造函数

```javascript
var a1 = new Array(8);
console.log(a1, a1.length); // [ , , , , , , ,  ] 8
var a2 = [8];
console.log(a2, a2.length); // [ 8 ] 1

function fn(Array) {
    return new Array(1, 2, 3);
}
var a3 = fn(String);
console.log(a3); // [String: '1']
```
[源码](item52/demo.js)

------

### 谨记
+ **如果数组构造函数的第一个参数是数字则数组的构造函数行为是不同的。**
+ **使用数组字面量替代数组构造函数。**