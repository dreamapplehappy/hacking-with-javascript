### 使用`arguments`创建可变参数的函数

```javascript
// 多参数函数
function multArgsFunc() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log(multArgsFunc(1, 2, 3, 4)); // 10
console.log(multArgsFunc(1, 2, 3, 4, 5)); // 15
```
[源码](item22/demo.js)

------

### 谨记
+ **使用隐式的`arguments`对象实现可变参数的函数。**
+ **考虑对可变参数的函数提供一个额外的固定元数的版本,从而使使用者无需借助`apply`方法。**