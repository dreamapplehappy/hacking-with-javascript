### 避免使用轻率的猴子补丁

```javascript
// 为数组添加一个split方法
// @1直接修改原型
Array.prototype.split = function(i) {
    return [this.slice(0, i), this.slice(i)]
};

var a = [1, 2, 3, 4];
console.log(a.split(2)); // [ [ 1, 2 ], [ 3, 4 ] ]

// @2可以通过使用一个函数包裹这个方法,然后导出,让开发者自己决定是否修改原型
function addSplitToArray() {
    Array.prototype.split = function(i) {
        return [this.slice(0, i), this.slice(i)]
    };
}
addSplitToArray(); // 函数执行之后我们就可以使用上面的方法了。

// 为不支持map函数的array环境添加这个方法
if('function' !== typeof Array.prototype.map) {
    Array.prototype.map = function(fn, thisArg) {
        var result  = [];
        for(var i = 0; i < this.length; i++) {
            result[i] = fn.call(thisArg, this[i], i);
        }
        return result;
    }
}
// 将上面的 !== 修改为 === 就可以测试我们的方法了
var b = a.map(function(cur, index) {
    return ++cur;
});

console.log(b); // [ 2, 3, 4, 5 ]
```
[源码](item42/demo.js)

------

### 谨记
+ **避免使用轻率的猴子补丁。**
+ **记录程序库所执行的所有猴子补丁。**
+ **考虑通过将修改置于一个导出函数中,使猴子补丁成为可选。**
+ **使用猴子补丁为缺失的标准`API`提供`polyfills`**