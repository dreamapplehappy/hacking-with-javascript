### 间接调用`eval`函数优于直接调用

```javascript
var str = 'hello';
function test() {
    var str = 'world';
    return eval('str');
}
console.log(test()); // world

var str1 = 'hello1';
function test1() {
    var str1 = 'world1';
    //var e = eval;
    //return e('str1');
    return (0, eval)('str1'); // 等同于上面注释的部分
}
console.log(test1()); // hello1
```
[源码](item17/demo.js)

------

### 谨记
+ **将`eval`函数同一个无意义的字面量包裹在序列表达式中已达到强制使用间接调用`eval`函数的目的。**
+ **尽可能间接调用`eval`函数,而不要直接调用`eval`函数。**