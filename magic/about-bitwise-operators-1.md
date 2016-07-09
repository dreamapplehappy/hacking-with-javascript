### 你肯定不会这样使用JavaScript(1)

在读下面的部分的时候,我们先来回忆一下即将还给大学老师的那些知识,位操作符的基本概念:
 ```javascript
 /*
  * 位运算符的简单解释:
  * ~ 把运算数转换成32位数字 把二进制数转换成它的二进制反码 把二进制数转换成浮点数 实质上是对数字求负，然后减 1
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
而今天我们要告诉你的是,你可以这样写:
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
```




+ [http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp](http://www.w3school.com.cn/js/pro_js_operators_bitwise.asp)
+ [http://graphics.stanford.edu/~seander/bithacks.html](http://graphics.stanford.edu/~seander/bithacks.html)