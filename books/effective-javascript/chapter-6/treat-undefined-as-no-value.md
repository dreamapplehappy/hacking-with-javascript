### 将`undefined`看做"没有值"

```javascript
// 我们应该判断参数是否是undefined来决定是否使用默认值
function Element(width, height) {
    this.width = width === undefined ? 100 : width;
    this.height = height === undefined ? 100 : height;
}

var ele = new Element();
console.log(ele); // Element { width: 100, height: 100 }
var ele1 = new Element(20);
console.log(ele1); // Element { width: 20, height: 100 }
var ele2 = new Element(20, 30);
console.log(ele2); // Element { width: 20, height: 30 }
```
[源码](item54/demo.js)

------

### 谨记
+ **避免使用`undefined`表示任何非特定值。**
+ **使用描述性的字符串值或命名布尔属性的对象,而不要使用`undefined`或`null`来表示特定应用标志。**
+ **提供参数默认值应当采用测试`undefined`的方式,而不是检查`arguments.length`。**
+ **在允许0,NaN或空字符串为有效参数的地方,绝不要通过真值测试来实现参数默认值。**