### 区分数组对象和类数组对象

```javascript
function test() {
    // arguments 是类数组对象
    console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
    // 判断arguments的类型
    console.log(typeof arguments); // object
    // 判断是否是数组
    console.log(Array.isArray(arguments)); // false
    // 判断arguments是什么类型的对象
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
test(1, 2, 3);
```
[源码](item58/demo.js)

------

### 谨记
+ **绝不重载与其它类型有重叠的结构类型。**
+ **当重载一个结构类型与其它类型时,先测试其它类型。**
+ **当重载其它对象类型时,接受真数组而不是类数组对象。**
+ **文档标注你的API是否接受真数组或类数组值。**
+ **使用ES5提供的`Array.isArray`方法测试真数组。**