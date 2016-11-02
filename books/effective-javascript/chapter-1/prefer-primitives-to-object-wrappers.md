### 使用原始类型替代对象包裹

```javascript
var s = new String('hello');
console.log(s); // String {0: "h", 1: "e", 2: "l", 3: "l", 4: "o", length: 5, [[PrimitiveValue]]: "hello"}

var str = s + ' world';
console.log(str); // hello world

console.log(str[4]); // o

console.log(typeof 'hello'); // string
console.log(typeof s); // object

var s1 = new String('hello');
var s2 = new String('hello');
console.log(s1 === s2); // false
console.log(s1 == s2); // false

console.log(str.toUpperCase()); // HELLO WORLD

str.someProperty = 'some';
console.log(str.someProperty); // undefined
```
[源码](item4/demo.js)

------
### 谨记

+ 对象包装的原始类型和原始类型在比较相等的时候,它们具有不同的表现行为。
+ 在原始类型上获取或者设置属性相当于隐形的创建了一个对象包裹。
