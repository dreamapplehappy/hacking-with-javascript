### 尽量少用全局变量

```javascript
// 显式的声明全局变量
var g = 'global';
// 隐藏的全局变量
gl = 'it is not good';

function func() {
    // 隐藏的全局变量
    inner = 'inner';
    // 显式的生命局部变量
    var gg = 'inner gg';
}

console.log(window.g === g, g === this.g, g); // true true "global"

// 运行过函数func后inner变量就被添加到了window对象上了, 但是gg变量只存在于函数func中,所以不是全局变量,不会污染全局作用域。
func();
console.log(window.inner, window.gg); // inner undefined
```
[源码](item8/demo.js)

------

### 谨记
+ **避免声明全局变量**
+ **尽量声明局部变量**
+ **避免对全局对象添加属性**
+ **使用全局对象来做平台特性监测**