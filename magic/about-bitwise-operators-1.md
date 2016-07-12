### 你肯定不会这样使用JavaScript: 0x1

**[@卢生](http://gold.xitu.io/user/57830bad1532bc005f557f4b), 指出了一些不严谨的地方,在此表示感谢;主要是下面的一些场景适合整数而不是适合小数.**
**我重新的理了一下思路,把相关需要注意的地方都做了标注,也希望大家注意一下.**

**[@卢生](http://gold.xitu.io/user/57830bad1532bc005f557f4b)再次指出我的测试不严谨,因为使用三目运算符的时候,调用了函数,所以结果会有较大的偏差.**
**他给出的[测试用例](https://jsfiddle.net/ombgk4ka/)表明使用位运算符是最慢的:joy:,好吧,我自己又亲自测试了一遍,测试代码和结果如下:**
```javascript
var a = 1;
var b = 2;
var c;

console.time('use bitwise');
for(var i = 0; i < 1000; i++) {
    a = Math.random() * 2 | 0;
    b = Math.random() * 9 | 0;
    c = a ^ ( (a ^ b) & -(a < b) );
}
console.timeEnd('use bitwise');

console.time('use triple');
for(var i = 0; i < 1000; i++) {
    a = Math.random() * 2 | 0;
    b = Math.random() * 9 | 0;
    c = a > b ? a : b;
}
console.timeEnd('use triple');

console.time('use bitwise once');
a = Math.random() * 2 | 0;
b = Math.random() * 9 | 0;
c = a ^ ( (a ^ b) & -(a < b) );
console.timeEnd('use bitwise once');

console.time('use triple once');
a = Math.random() * 2 | 0;
b = Math.random() * 9 | 0;
c = a > b ? a : b;
console.timeEnd('use triple once');
```
在`Node.js`环境和浏览器环境中的结果分别如下:
```javascript
// node.js
use bitwise: 1.562ms
use triple: 0.159ms
use bitwise once: 0.094ms
use triple once: 0.011ms
```
```javascript
// chrome
use bitwise: 0.922ms
use triple: 0.393ms
use bitwise once: 0.027ms
use triple once: 0.017ms
```
**以上表明,在`JavaScript`中,使用位运算符在这种情况下并不比使用三目运算符快;还有这只是在JavaScript中,在别的语言中就不知道了,没深入研究过...**

**以下测试有偏差**

我特地测试了一下速度问题,在`Node.js`环境中和浏览器环境中,如果是两个**整数**比较大小的话,使用位运算符的速度比使用函数速度快太多了,
详情可以看下面一个代码例子:
```javascript
var a = 1;
var b = 2;
function compare(a, b) {
    return a > b ? a: b;
}
console.time('use func');
console.log(compare(a, b));
console.timeEnd('use func');
console.time('use bitwise operators');
console.log(a ^ ( (a ^ b) & -(a < b) ));
console.timeEnd('use bitwise operators');
```
`Node.js`环境中运行结果如下:
```javascript
2
use func: 2.366ms
2
use bitwise operators: 0.198ms
```
浏览器(chrome)运行结果如下:
```javascript
2
use func: 10.642ms
2
use bitwise operators: 0.801ms
```
虽然每次的时间都不太一样,但是结果基本一致,使用位运算符要快很多.

在读下面的部分的时候,我们先来回忆一下即将还给大学老师的那些知识,位操作符的基本概念:
 ```javascript
 /*
  * 位运算符的简单解释:
  * ~ 把运算数转换成32位数字 把二进制数转换成它的二进制反码 把二进制反码转换成浮点数 实质上是对数字求负，然后减 1
  *
  * | 对两个数字先转换成二进制的数字 然后对他们的每一位进行按位或的操作
  *
  * & 对两个数字先转换成二进制的数字 然后对他们的每一位进行按位与的操作
  *
  * ^ 对两个数字先转换成二进制的数字 然后对他们的每一位进行按位与或的操作
  *
  * << 对一个数字转化成二进制 然后将它的所有数位整体向左移动 保留符号
  *
  * >> 对一个数字转化成二进制 然后将它的所有数位整体向右移动 保留符号
  */
 var a = 3;
 var b = 9;
 var c = -3;
 var d = -12;
 
 // ~ 取反
 console.log(~a); // -(3)-1
 
 // | 按位或
 console.log(a|b); // 11
 
 // & 按位与
 console.log(a&b); // 1
 
 // ^ 按位与或
 console.log(a^b); // 10
 
 // << 左移运算符
 console.log(a << 2); // 12
 
 // >> 右移运算符
 console.log(d >> 1); // -6
 ```
 
废话不多说,让我们开始进入正题,看看使用位操作符能够给我们的程序带来多少便利:
 
#### **求最大值,最小值**

看到这里你的脑子里是不是出现了下面这种写法:
```javascript
function compare(a, b) {
    if(a > b) {
        return a;
    }
    else {
        return b;
    }
}
```
或者更好一点的,你也许会使用三目运算符,那就是下面这种写法:
```javascript
function compare(a, b) {
    return a > b ? a : b;
}
```
而今天我们要告诉你的是,你可以这样写(**注意,这里只适合整数**):
```javascript
var max = a ^ ( (a ^ b) & -(a < b) ); // 取最大值
var min = b ^ ( (a ^ b) & -(a < b) ); // 取最小值
```

#### 求一个数是否是2的幂次方
看到这个题目,一般的同学会想到使用一个循环,然后不断地除以2,如果结果是1就是2的幂次方,如果不是1就不是2的幂次方.
当然这样也可以,我们这里给出另一种方案,快速而高效:
```javascript
var a = 64;
var isPowerOf2 = a && !(a & (a - 1)); // true
```

#### 向下取整
我们常常使用`Math.floor()`,当然我们可以使用下面的方法,更快速高效:
```javascript
var c = 3.1415926;
var d = c | 0; // d === Math.floor(c)
var e = ~~c; // e === d
```

#### 颜色转换RGB转换为HEX
我们可以使用位操作符来写这么一个函数,方便快速的达到我们的目的:
```javascript
var bgColor = {
    r: 234,
    g: 36,
    b: 122
};
var hexColor = RGB2HEX(bgColor.r, bgColor.g, bgColor.b);
console.log(hexColor); // #ea247a

function RGB2HEX(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1);
}
```

#### 交换变量值
当然现在如果使用ES6的一些语法的话,也是很方便的就可以替换两个变量的值:
```javascript
let a = 3;
let b = 6;
[a, b] = [b, a];
console.log(a, b) // 6, 3
```
当然你也可以这样做(**注意,这里只适合整数**):
```javascript
a ^= b;
b ^= a;
a ^= b;
console.log(a, b); // 6, 3
```
#### 求2的幂次方
一般情况下我们会使用`Math.pow(2, n)`求2的n次幂,当然我们也可以使用下面的方法来进行运算(**这里的`n`适用于整数**):
```javascript
var n = 3;
var result = 1 << n;
console.log(result); // 8
console.log(result === Math.pow(2, 3)); // true
```

**当然这些相关的例子还有很多,欢迎大家来提issue或者pull request:grinning:**

#### 参考的文章:

+ [ECMAScript 位运算符](http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)
+ [Bit Twiddling Hacks](http://graphics.stanford.edu/~seander/bithacks.html)
+ [JavaScript: The less known parts. Bitwise Operators.](http://michalbe.blogspot.jp/2013/03/javascript-less-known-parts-bitwise.html)
+ [Bitwise operators](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
