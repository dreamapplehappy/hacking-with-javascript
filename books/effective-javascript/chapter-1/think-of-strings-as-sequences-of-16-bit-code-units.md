### 把字符串当做16位编码单元的序列

```javascript
console.log("𝄞 clef".length); // 7
console.log("G clef".length); // 6

console.log("𝄞 clef".charCodeAt(0)); // 55348 (0xd834)
console.log("𝄞 clef".charCodeAt(1)); // 56606 (0xdd1e)

console.log("𝄞 clef".charAt(0));
console.log("𝄞 clef".charAt(1));

console.log("𝄞 clef".charAt(2) === " "); // true
console.log("𝄞 clef".charAt(1) === " "); // false

console.log(/^.$/.test("𝄞")); // false
console.log(/^..$/.test("𝄞")); // true ..表示两个16位编码的字符
```
[源码](item7/demo.js)

------

### 谨记
+ JavaScript的字符串是由16位编码单元组成的,而不是`Unicode`编码。
+ `Unicode`码点是`2e16`或者之后的字符,在JavaScript中是由两个16位编码单元组成,也就是我们所说的`代理对`。
+ `代理对`不遵循字符串的元素计数规则,影响字符串的长度,`charAt`,`charCodeAt`以及正则表达式的模式;比如`.`。
+ 在进行字符串操作的时候,最好使用第三方的库。
+ 当你使用一个库去操作字符串的时候,要详细看看这个库的文档说明,关于它如何处理所有字符的整个码点范围的。