### 熟练掌握高阶函数

```javascript
// 学会使用高阶函数
var arr = [1, 9, 3, 4, 2];
// 返回一个排序的结果
var arr1 = arr.sort(function(x, y) {
    if(x > y) {
        return 1;
    }
    else {
        return -1;
    }
});
console.log(arr1); // [ 1, 2, 3, 4, 9 ]

var arr2 = arr.map(function(x) {
    return x * 2 + 1;
});
console.log(arr2); // [ 3, 5, 7, 9, 19 ]

var aIndex = 'a'.charCodeAt(0);
// 使用高阶函数
function createStr(n, cb) {
    var str = '';
    for(i = 0; i < n; i++) {
        str += cb(i);
    }
    return str;
}
// 创建一个随机数
var str1 = createStr(10, function() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + aIndex);
});
console.log(str1); // cwvceaffki

// 创建一组随机数字
var str2 = createStr(6, function() {
    return Math.floor(Math.random() * 10);
});
console.log(str2); // 341119
```
[源码](item19/demo.js)

------

### 谨记
+ **高阶函数是那些将函数作为参数或返回值的函数。**
+ **熟悉掌握现有库中的高阶函数。**
+ **学会发现可以被高阶函数所取代的常见的编码模式。**