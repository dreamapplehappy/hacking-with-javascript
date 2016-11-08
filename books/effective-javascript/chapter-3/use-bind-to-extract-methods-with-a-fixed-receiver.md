### 使用`bind`方法提取具有确定接受者的方法

```javascript
var buffer = {
    entries: [],
    add: function(value) {
        this.entries.push(value);
    },
    join: function() {
        return this.entries.join("");
    }
};

var input = ['137', '-', '4526', '-', '3980'];
//input.forEach(buffer.add); // Cannot read property 'push' of undefined

// forEach函数可以让我们添加一个函数的接受者
input.forEach(buffer.add, buffer);
console.log(buffer.join()); // 137-4526-3980

// 最好的办法就是我们直接使用bind
input.forEach(buffer.add.bind(buffer));
console.log(buffer.join()); // 137-4526-3980 (要注释掉上面的部分,不然结果就是: 137-4526-3980137-4526-3980)
```
[源码](item25/demo.js)

------

### 谨记
+ **要注意, 提取一个方法不会将方法的接受者绑定到该方法的对象上。**
+ **当给高阶函数传递对象方法时,使用匿名函数在适当的接受者上调用该方法。**
+ **使用`bind`方法创建绑定到适当接收者的函数。**