### 使用`hasOwnProperty`方法以避免原型污染

```javascript
// 一般情况下我们可以使用 hasOwnProperty 来检测一个对象自身的属性而不是它原型链上的属性
var d1 = {};
d1.key = 'value';
console.log('toString' in d1); // true
// 使用 hasOwnProperty 方法
console.log(d1.hasOwnProperty('toString')); // false
// 但是如果不巧的话我们给d1添加了一个 hasOwnProperty 属性
d1.hasOwnProperty = function() {};
// 我们自定义的属性覆盖了原来的方法,就会导致一些问题
console.log(d1.hasOwnProperty('toString')); // undefined
// 为了安全起见,我们使用call方法来进行属性的确定; 就算我们覆盖了 hasOwnProperty 属性,我们也会达到一个正确的结果
console.log(Object.hasOwnProperty.call(d1, 'toString')); // false

// 实现一个简单的字典类
function Dict(elements) {
    this.elements = elements || [];
}
Dict.prototype.has = function(key) {
    return Object.hasOwnProperty.call(this.elements, key);
};
Dict.prototype.get = function(key) {
    return this.elements.has(key) ? this.elements[key] : undefined;
};
Dict.prototype.set = function(key, value) {
    this.elements[key] = value;
};
Dict.prototype.remove = function(key) {
    delete this.elements[key];
};
// 测试我们的字典类
var dict = new Dict({
    foo: 'fooValue',
    bob: 'bob'
});
console.log(dict.has('foo')); // true
dict.set('name', 'dream');
console.log(dict.has('name')); // true
dict.remove('foo');
console.log(dict.has('foo')); // false

// 我们这个字典类还不够强壮, 如果我们访问__proto__属性,或者修改__proto__属性的话,就会引起一些不必要的问题
// 考虑到__proto__的情况

console.log('__proto__' in dict); // true

function Dict1(elements) {
    this.elements = elements || [];
    this.hasSpecialProto = false;
    this.specialProto = undefined;
}
Dict1.prototype.has = function(key) {
    if('__proto__' === key) {
        return this.hasSpecialProto;
    }
    return Object.hasOwnProperty.call(this.elements, key);
};
Dict1.prototype.get = function(key) {
    if('__proto__' === key) {
        return this.specialProto;
    }
    return this.elements.has(key) ? this.elements[key] : undefined;
};
Dict1.prototype.set = function(key, value) {
    if('__proto__' === key) {
        this.hasSpecialProto = true;
        this.specialProto = value;
    }
    else {
        this.elements[key] = value;
    }
};
Dict1.prototype.remove = function(key) {
    if('__proto__' === key) {
        this.hasSpecialProto = false;
        this.specialProto = undefined;
    }
    else {
        delete this.elements[key];
    }
};

// 测试我们的Dict1字典类
var dict1 = new Dict1({});
console.log(dict1.has('__proto__')); // false
dict1.set('__proto__', {
    getName: function() {}
});
console.log(dict1.has('__proto__')); // true
dict1.remove('__proto__');
console.log(dict1.has('__proto__')); // false
```
[源码](item45/demo.js)

------

### 谨记
+ **使用`hasOwnPrototype`方法避免原型污染。**
+ **使用词法作用域和`call`方法避免覆盖`hasOwnPrototype`方法。**
+ **考虑在封装`hasOwnPrototype`测试样板代码的类中实现字典操作。**
+ **使用字典类避免将`__proto__`作为`key`来使用。**