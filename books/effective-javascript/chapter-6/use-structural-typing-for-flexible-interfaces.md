### 使用结构类型设计灵活的接口

```javascript
function Rectangle(width, length) {
    this.width = width;
    this.length = length;
}
Rectangle.prototype.getArea = function() {
    return this.width * this.length;
};

// 我们可以使用结构类型
function rectangle1(width, length) {
    var _width = width,
        _length = length;
    return {
        getArea: function() {
            return _width * _length;
        }
    }
}

var r1 = new Rectangle(100, 200);
console.log(r1.getArea()); // 20000
var r2 = rectangle1(100, 200);
console.log(r2.getArea()); // 20000
```
[源码](item57/demo.js)

------

### 谨记
+ **使用结构类型(也称为鸭子类型)来设计灵活的对象接口。**
+ **结构接口更灵活,更轻量,所以应该避免使用继承。**
+ **针对单元测试,使用`mock`对象即接口的替代实现来提供可复验的行为。**