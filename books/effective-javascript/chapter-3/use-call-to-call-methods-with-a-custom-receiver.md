### 使用`call`方法自定义接受者来调用方法

```javascript
// 使用call
var obj1 = {
    sayHello: function(msg) {
        console.log('Hello,' + this.name + ' ' + msg);
    },
    name: 'dreamapple'
};

var obj2 = {
    name: 'dream'
};


// 第一个参数是方法的调用者,剩余的参数就是原函数的参数
obj1.sayHello.call(obj2, 'haha'); // Hello,dream haha

// 高阶函数使用call
function compute(arg) {
    var sum = 0;
    for(var i = 0; i < arg.length; i++) {
        sum += arg[i];
    }
    return sum;
}

function highFunc() {
    return compute.call(null, arguments);
}

console.log(highFunc(1, 2, 3, 4, 5)); // 15
```
[源码](item20/demo.js)

------

### 谨记
+ **使用`call`方法自定义接受者来调用函数。**
+ **使用`call`方法可以调用在给定的对象中不存在的方法。**
+ **使用`call`方法定义高阶函数允许使用者给回掉函数指定接收者。**