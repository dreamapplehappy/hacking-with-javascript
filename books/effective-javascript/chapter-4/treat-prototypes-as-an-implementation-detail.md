### 将原形视为实现的细节

```javascript
function A(attr1) {
    this.attr1 = attr1;
}
A.prototype.method1 = function(){};

function B(attr1, attr2) {
    A.call(this, attr1);
    this.attr2 = attr2;
}
B.prototype = Object.create(A.prototype);
B.prototype.method2 = function(){};

console.log(new B('attr1', 'attr2'));
```
[源码](item41/demo.js)

------

### 谨记
+ **对象是接口,原型是实现。**
+ **避免检查你无法控制的对象的原型结构。**
+ **避免检查实现在你无法控制的对象内部的属性。**