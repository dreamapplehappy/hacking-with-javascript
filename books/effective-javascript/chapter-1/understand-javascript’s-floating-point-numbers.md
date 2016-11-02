### 注意JavaScript的浮点数

```javascript
console.log(typeof 36); // number
console.log(typeof 36.36); // number
console.log(typeof -36.36); // number

console.log(0.1 * 3.6); // 0.36000000000000004
console.log(1 * 36); // 36
console.log(1 - 0.6); // 0.4
console.log(25 / 5); // 5
console.log(2.5 / 5); // 0.5
console.log(25 % 4); // 1
console.log(25 % 0.4); // 0.19999999999999862
console.log(8 | 1); // 9

console.log((10).toString(2)); // 1010
console.log(parseInt('1010', 2)); // 10

console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + (0.2 + 0.3)); // 0.6
console.log((0.1 + 0.2) + 0.3); // 0.6000000000000001

console.log(10 + (20 + 30)); // 60
console.log((10 + 20) + 30); // 60
```

[源码](item2/demo.html)

------
### 谨记: 

+ JavaScript的数字是`双精度浮点数`。
+ JavaScript中的`整数`只是双精度浮点数的一个子集,不是一种新的类型。
+ JavaScript中的二进制运算符把数字当做32位的无符号整数来处理。
+ 注意JavaScript中浮点数的精度运算。