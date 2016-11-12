### 使用闭包存储私有数据

```javascript
function Counter() {
    // count信息只存在于函数的内部,外部无法直接访问
    var count = 0;
    return {
        getCount: function() {
            return count;
        },
        increment: function() {
            count++;
        },
        decrement: function() {
            count--;
        }
    }
}
var counter = Counter();
console.log(counter.getCount()); // 0
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
counter.decrement();
console.log(counter.getCount()); // 1
```
[源码](item35/demo.js)

------

### 谨记
+ **闭包的变量是私有的,只能通过局部的引用获取。**
+ **将局部变量作为私有数据从而通过方法实现信息隐藏。**