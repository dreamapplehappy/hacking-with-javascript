### 避免继承标准类

```javascript
// 尝试继承标准类
function Dir(path, entries) {
    this.path = path;
    for(var i = 0; i < entries.length; i++) {
        this[i] = entries[i];
    }
}
Dir.prototype = Object.create(Array.prototype);

var dir = new Dir('/temp/mysite', ['index.html', 'script.js', 'style.css']);
// dir的长度是0 继承没有成功
console.log(dir.length); // 0

// 查看对象属性
console.log(Object.prototype.toString.call(dir)); // [object Object]
console.log(Object.prototype.toString.call([])); // [object Array]

// 重新实现一个
function Dir1(path, entries) {
    this.path = path;
    this.entries = entries;
}
// 将相应的数组的方法委托给entries属性来完成
Dir1.prototype.forEach = function(f, thisArg) {
    if(typeof thisArg === 'undefined') {
        thisArg = this;
    }
    this.entries.forEach(f, thisArg);
};
```
[源码](item40/demo.js)

------

### 谨记
+ **继承标准类往往会由于一些特殊的内部属性(如`[[Class]]`)而被破坏。**
+ **使用属性委托优于继承标准类。**