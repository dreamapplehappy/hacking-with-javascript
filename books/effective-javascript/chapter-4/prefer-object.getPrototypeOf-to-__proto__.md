### 使用`Object.getPropertyOf`函数而不要使用`__proto__`属性

```javascript
var obj = Object.create(null);
console.log('__proto__' in obj); // false
console.log(Object.getPrototypeOf(obj)); // null

// 可以使用 __proto__属性来模仿 Object.getPropertyOf() 函数
if('undefined' === typeof Object.getPrototypeOf) {
    Object.getPrototypeOf = function(obj) {
        var t = typeof obj;
        if(!obj || (t !== 'object' && t !== 'function')) {
            throw new Error('not an object');
        }
        return obj.__proto__;
    }
}
```
[源码](item31/demo.js)

------

### 谨记
+ **使用符合标准的`Object.getPrototypeOf`函数而不要使用非标准的`__proto__`属性。**
+ **在支持`__proto__`属性的非`ES5`环境中实现`Object.getPrototypeOf`函数。**