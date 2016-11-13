### 使用`Object`的直接实例构造轻量级的字典

```javascript
// 使用一个对象作为字典来使用
var dict1 = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
};
var props1 = [];
for(var p in dict1) {
    props1.push(p);
}
console.log(props1); // [ 'key1', 'key2', 'key3' ]

// 使用数组作为一个字典
var dict2 = [];
dict2.key1 = 'value1';
dict2.key2 = 'value2';
dict2.key3 = 'value3';
var props2 = [];
for(var p in dict2) {
    props2.push(p);
}
console.log(props2); // [ 'key1', 'key2', 'key3' ]

// 如果我们污染了dict1或者dict2的原型的话,我们再使用for...in的话就会有问题
//dict1.__proto__ = {
//    toString: function(){},
//    valueOf: function(){}
//};
// 使用Object.getPrototypeOf() 避免使用 __proto__
var dict1P = Object.getPrototypeOf(dict1);
dict1P.say = function(){};
var props3 = [];
for(var p in dict1) {
    props3.push(p);
}
console.log(props3); // [ 'key1', 'key2', 'key3', 'say' ]

Array.prototype.first = function(){};
Array.prototype.last = function(){};

var props4 = [];
for(var p in dict2) {
    props4.push(p);
}
console.log(props4); // [ 'key1', 'key2', 'key3', 'first', 'last' ]
```
[源码](item43/demo.js)

------

### 谨记
+ **使用对象字面量构建轻量级字典。**
+ **轻量级字典应该是`Object.prototype`的直接子类,以使`for...in`循环免受原型污染。**