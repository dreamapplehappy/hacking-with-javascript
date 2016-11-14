### 接收关键字参数的选项对象

```javascript
// 定义一个接受参数的选项对象的函数
function Alert(obj) {
    this.level = obj.level;
    this.msg = obj.msg;
}
var ale = new Alert({
    level: 0,
    msg: 'hello'
});
console.log(ale); // Alert { level: 0, msg: 'hello' }

// 当然如果一些参数是必选的话,我们把他们单独拿出来,而且参数的选项对象上的属性不是必选的
function Alert1(level, msg, options) {
    this.level = level;
    this.msg = msg;
    for(var p in options) {
        this[p] = options[p]
    }
}
var ale1 = new Alert1(1, 'find error', {
    count: 8,
    theme: 'default'
});
console.log(ale1); // Alert1 { level: 1, msg: 'find error', count: 8, theme: 'default' }

// 使用extend函数扩展我们的参数对象
function extend(target, source) {
    if(source) {
        for(var p in source) {
            var val = source[p];
            if('undefined' !== typeof val) {
                target[p] = val;
            }
        }
    }
    return target;
}

// 升级原来的构造函数
function Alert2(level, msg, options) {
    var opt = extend({
        level: level,
        msg: msg
    });
    opt = extend(opt, options);
    extend(this, opt);
}
var ale2 = new Alert2(2, 'bug', {
    count: 1,
    theme: 'highlight'
});
console.log(ale2); // Alert2 { level: 2, msg: 'bug', count: 1, theme: 'highlight' }
```
[源码](item55/demo.js)

------

### 谨记
+ **使用选项对象使得`API`更具可读性,更容易记忆。**
+ **所有通过选项对象提供的参数应当被视为可选的。**
+ **使用`extend`函数抽象出从选项对象中提取值的逻辑。**