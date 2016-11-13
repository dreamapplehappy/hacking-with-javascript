### 数组迭代要优先使用`for`循环而不是`for...in`循环

```javascript
var scores = [1, 2, 3, 4, 5];
var total = 0,
    aver = 0;
for(var score in scores) {
    total += score;
}
console.log(total); // 001234
aver = total / scores.length;
console.log(aver); // 246.8

total = 0;
aver = 0;
// 实际上,我们应该使用for循环不会那么容易出错
var len = scores.length;
for(var i = 0; i < len; i++) {
    total += scores[i];
}
aver = total / scores.length;
console.log(aver); // 3
```
[源码](item49/demo.js)

------

### 谨记
+ **迭代数组的索引属性应当总是使用`for`循环而不是`for..in`循环。**
+ **考虑在循环之前将数组的长度存储在一个局部变量中以避免重新计算数组长度。**