### 理解JS的柯里化,这一篇就够了

#### 什么是柯里化?
我们先来看看[维基百科][1]中是如何定义的:**在计算机科学中，柯里化（英语：Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。**

我们可以举个简单的例子,如下函数`add`是一般的一个函数,就是将传进来的参数`a`和`b`相加;函数`curryingAdd`就是对函数`add`进行柯里化的函数;
这样一来,原来我们需要直接传进去两个参数来进行运算的函数,现在需要分别传入参数`a`和`b`,函数如下:

```javascript
function add(a, b) {
    return a + b;
}

function curryingAdd(a) {
    return function(b) {
        return a + b;
    }
}

add(1, 2); // 3
curryingAdd(1)(2); // 3
```

看到这里你可能会想,这样做有什么用?为什么要这样做?这样做能够给我们的应用带来什么样的好处?先别着急,我们接着往下看.

#### 为什么要对函数进行柯里化?
+ 参数复用/函数柯里化用来创建已经设置好一个或多个参数的函数/提高适用性/固定易变因素
+ 提前返回
+ 延迟计算
+ 函数柯里化允许和鼓励你分隔复杂功能变成更小更容易分析的部分。这些小的逻辑单元显然是更容易理解和测试的，然后你的应用就会变成干净而整洁的组合，由一些小单元组成的组合。

#### 如何对函数进行柯里化?
在这一部分里,我们由浅入深的一步步来告诉大家如何对一个多参数的函数进行柯里化.

+ **先上开胃菜**

假如我们要实现一个功能,就是输出语句`name`喜欢`song`,其中`name`和`song`都是可变参数;那么一般情况下我们会这样写:
```javascript
function printInfo(name, song) {
  console.log(name + '喜欢的歌曲是: ' + song);
}
printInfo('Tom', '七里香');
printInfo('Jerry', '雅俗共赏');
```
对上面的函数进行柯里化之后,我们可以这样写: 
```javascript
function curryingPrintInfo(name) {
  return function(song) {
      console.log(name + '喜欢的歌曲是: ' + song);
  }
}
var tomLike = curryingPrintInfo('Tom');
tomLike('七里香');
var jerryLike = curryingPrintInfo('Jerry');
jerryLike('雅俗共赏');
```
+ **升级套餐**

  啊实打实的
+ **大餐**

  啊实打实的
+ **超级大餐**

  啊实打实

#### 柯里化的一些应用场景

#### 关于柯里化的性能























[1]: https://zh.wikipedia.org/zh-cn/%E6%9F%AF%E9%87%8C%E5%8C%96


#### 参考的资料
+ [Currying, Spice Up Your Javascript Functions](http://requiremind.com/currying-spice-up-your-javascript-functions/)
+ [函数式JavaScript（4）：函数柯里化](http://blog.jobbole.com/77956/)
+ [前端开发者进阶之函数柯里化Currying](http://www.cnblogs.com/pigtail/p/3447660.html)
+ [JS中的柯里化(currying)](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)
+ [浅析 JavaScript 中的 函数 currying 柯里化](http://www.2cto.com/kf/201412/357997.html)
+ [JS闭包与柯里化](http://www.itxueyuan.org/view/5637.html)
+ [Js函数柯里化](http://www.w3cfuns.com/notes/17507/f742cc715cacdc1a9656c2645aea55a4.html)
+ [深入解析JavaScript中函数的Currying柯里化](http://www.jb51.net/article/81190.htm)
+ [js基础篇之——JavaScript的柯里化函数详解](http://toutiao.com/i6220924016044016129/)







00: http://blog.csdn.net/yhjw2bah/article/details/7897032
1.http://requiremind.com/currying-spice-up-your-javascript-functions/
2.callee/caller
3.http://www.cnblogs.com/pigtail/p/3447660.html
4.fn.length
5.http://www.zhangxinxu.com/wordpress/2013/02/js-currying/
6.http://blog.jobbole.com/77956/
7.http://www.jb51.net/article/81190.htm
8.http://www.cnblogs.com/neuscx/p/5163750.html
9.http://sjpsega.iteye.com/blog/1700320
10.http://www.w3cfuns.com/notes/17507/f742cc715cacdc1a9656c2645aea55a4.html
11.http://www.jb51.net/article/83275.htm
12.http://www.2cto.com/kf/201412/357997.html
13.http://blog.carbonfive.com/2015/01/14/gettin-freaky-functional-wcurried-javascript/
14.http://javascript.crockford.com/www_svendtofte_com/code/curried_javascript/
15.https://www.sitepoint.com/currying-in-functional-javascript/
16.http://blog.carbonfive.com/2015/01/14/gettin-freaky-functional-wcurried-javascript/
17.http://blog.carbonfive.com/2015/01/05/tidying-up-a-javascript-application-with-higher-order-functions/
18.http://blog.carbonfive.com/2015/01/29/composing-synchronous-and-asynchronous-functions-in-javascript/
19.http://www.ibm.com/developerworks/cn/web/1006_qiujt_jsfunctional/

1.https://codepen.io/Universalist/post/currying-functions-in-javascript
2.http://www.drdobbs.com/open-source/currying-and-partial-functions-in-javasc/231001821


1.http://stackoverflow.com/questions/113780/javascript-curry-what-are-the-practical-applications
2.http://stackoverflow.com/questions/36314/what-is-currying

1.什么是柯里化
2.如何进行柯里化
3.有什么作用
4.扩展的函数库
5.isuee 提出
