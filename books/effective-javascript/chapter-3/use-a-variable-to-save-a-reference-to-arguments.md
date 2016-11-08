### 使用变量保存`arguments`的引用

```javascript
// 一个迭代器 错误的版本
function iterator() {
    var i = 0;
    var n = arguments.length;
    return {
        hasNext: function() {
            return i < n;
        },
        next: function() {
            if(i >= n) {
                throw new Error('end of iteration!');
            }
            return arguments[i++];
        }
    }
}

// 正确的版本
function iterator1() {
    var i = 0;
    var n = arguments.length;
    var args = arguments;
    return {
        hasNext: function() {
            return i < n;
        },
        next: function() {
            if(i >= n) {
                throw new Error('end of iteration!');
            }
            return args[i++];
        }
    }
}

var item = iterator(1, 2, 3, 4);
var item1 = iterator1(1, 2, 3, 4);

console.log(item.hasNext()); // true
console.log(item.next()); // undefined

console.log(item1.next()); // 1
console.log(item1.hasNext()); // true
console.log(item1.next()); // 2
console.log(item1.hasNext()); // true
```
[源码](item24/demo.js)

------

### 谨记
+ **当引用`arguments`时当心函数嵌套层级。**
+ **绑定一个明确作用域的引用到`arguments`变量,从而可以在嵌套的函数中引用它。**