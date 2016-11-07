### 使用`apply`方法通过不同数量的参数调用函数

```javascript
// 使用apply
function compute() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

function wrapper(arr) {
    return compute.apply(null, arr); // 给compute函数传递多个参数
}

var arr = [1, 2, 3, 4, 5];
console.log(wrapper(arr)); // 15
```
[源码](item21/demo.js)

------

### 谨记
+ **使用`apply`方法指定一个可计算的的参数数组来调用可变参数的函数。**
+ **使用`apply`方法的第一个参数给可变参数的的方法提供一个接收者。**