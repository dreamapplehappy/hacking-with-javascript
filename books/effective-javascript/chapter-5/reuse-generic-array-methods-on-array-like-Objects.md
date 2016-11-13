### 在类数组对象上复用通用的数组方法

```javascript
// 这种形式一般会用于函数的参数arguments属性
function fn() {
    console.log(arguments);
    console.log([].slice.call(arguments, 0));
    console.log(['array'].concat([].slice.call(arguments)));
}
fn(1, 2, 3);
// { '0': 1, '1': 2, '2': 3 }
// [ 1, 2, 3 ]
// [ 'array', 1, 2, 3 ]
```
[源码](item51/demo.js)

------

### 谨记
+ **对于类数组对象,通过提取方法对象并使用其`call`方法来复用通用的`Array`方法。**
+ **任意一个具有索引属性和恰当`length`属性的对象都可以使用通用的`Array`方法。**