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

+ **I 先上开胃菜**

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
+ **II 小鸡炖蘑菇**

  上面我们虽然对对函数`printInfo`进行了柯里化,但是我们可不想在需要柯里化的时候对每一个函数都进行柯里化,那简直是噩梦;
  所以我们要创造一些帮助其它函数进行柯里化的函数,我们暂且叫它为`curryingHelper`吧,一个简单的`curryingHelper`函数如下所示:
  ```javascript
  function curryingHelper(fn) {
      var _args = Array.prototype.slice.call(arguments, 1);
      return function() {
          var _newArgs = Array.prototype.slice.call(arguments);
          var _totalArgs = _args.concat(_newArgs);
          return fn.apply(this, _totalArgs);
      }
  }
  ```
  这里解释一点东西,首先函数的`arguments`表示的是传递到函数中的参数对象,它不是一个数组,它是一个类数组对象;
  所以我们可以使用函数的`Array.prototype.slice`方法,然后使用`.call`方法来获取`arguments`里面的内容.
  我们使用`fn.apply(this, _totalArgs)`来给函数`fn`传递正确的参数.
  
  接下来我们来写一个简单的函数验证上面的辅助柯里化函数的正确性, 代码部分如下:
  ```javascript
  function showMsg(name, age, fruit) {
      console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
  }
  
  var curryingShowMsg1 = curryingHelper(showMsg, 'dreamapple');
  curryingShowMsg1(22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  
  var curryingShowMsg2 = curryingHelper(showMsg, 'dreamapple', 20);
  curryingShowMsg2('watermelon'); // My name is dreamapple, I'm 20 years old,  and I like eat watermelon
  ```
  上面的结果表示,我们的这个柯里化的函数是正确的.
  
+ **III 牛肉火锅**
  
  上面的柯里化帮助函数确实已经能够达到我们的一般性需求了,但是它还不够好,我们希望那些经过柯里化后的函数可以每次只传递进去一个参数,
  然后可以进行多次参数的传递,那么应该怎么办呢?我们可以再花费一些脑筋,写出一个`betterCurryingHelper`函数,实现我们上面说的那些
  功能.代码如下:
  ```javascript
  function betterCurryingHelper(fn, len) {
      var length = len || fn.length;
      return function () {
          var allArgsFulfilled = (arguments.length >= length);
  
          // 如果参数全部满足,就可以终止递归调用
          if (allArgsFulfilled) {
              return fn.apply(this, arguments);
          }
          else {
              var argsNeedFulfilled = [fn].concat(Array.prototype.slice.call(arguments));
              return betterCurryingHelper(curryingHelper.apply(this, argsNeedFulfilled), length - arguments.length);
          }
      };
  }
  ```
  其中`curryingHelper`就是上面**II 小鸡炖蘑菇**中提及的那个函数.需要注意的是`fn.length`表示的是这个函数的参数长度.
  接下来我们来检验一下这个函数的正确性:
  ```javascript
  var betterShowMsg = betterCurryingHelper(showMsg);
  betterShowMsg('dreamapple', 22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  betterShowMsg('dreamapple', 22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  betterShowMsg('dreamapple')(22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  betterShowMsg('dreamapple')(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  ```
  其中`showMsg`就是**II 小鸡炖蘑菇**部分提及的那个函数.
  我们可以看出来,这个`betterCurryingHelper`确实实现了我们想要的那个功能.并且我们也可以像使用原来的那个函数一样使用柯里化后的函数.
+ **IV 泡椒凤爪**

  我们已经能够写出很好的柯里化辅助函数了,但是这还不算是最刺激的,如果我们在传递参数的时候可以不按照顺来那一定很酷;当然我们也可以写出这样的函数来,
  这个`crazyCurryingHelper`函数如下所示:
  ```javascript
  var _ = {};
  function crazyCurryingHelper(fn, length, args, holes) {
      length = length || fn.length;
      args   = args   || [];
      holes  = holes  || [];
  
      return function() {
          var _args       = args.slice(),
              _holes      = holes.slice();
  
          // 存储接收到的args和holes的长度
          var argLength   = _args.length,
              holeLength  = _holes.length;
  
          var allArgumentsSpecified = false;
  
          // 循环
          var arg     = null,
              i       = 0,
              aLength = arguments.length;
  
          for(; i < aLength; i++) {
              arg = arguments[i];
  
              if(arg === _ && holeLength) {
                  // 循环holes的位置
                  holeLength--;
                  _holes.push(_holes.shift());
              } else if (arg === _) {
                  // 存储hole就是_的位置
                  _holes.push(argLength + i);
              } else if (holeLength) {
                  // 是否还有没有填补的hole
                  // 在参数列表指定hole的地方插入当前参数
                  holeLength--;
                  _args.splice(_holes.shift(), 0, arg);
              } else {
                  // 不需要填补hole,直接添加到参数列表里面
                  _args.push(arg);
              }
          }
  
          // 判断是否所有的参数都已满足
          allArgumentsSpecified = (_args.length >= length);
          if(allArgumentsSpecified) {
              return fn.apply(this, _args);
          }
  
          // 递归的进行柯里化
          return crazyCurryingHelper.call(this, fn, length, _args, _holes);
      };
  }
  ```
  一些解释,我们使用`_`来表示参数中的那些缺失的参数,如果你使用了[lodash](https://lodash.com/)的话,会有冲突的;那么你可以使用别的符号替代.
  按照一贯的尿性,我们还是要验证一下这个`crazyCurryingHelper`是不是实现了我们所说的哪些功能,代码如下:
  ```javascript
  var crazyShowMsg = crazyCurryingHelper(showMsg);
  crazyShowMsg(_, 22)('dreamapple')('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  crazyShowMsg( _, 22, 'apple')('dreamapple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  crazyShowMsg( _, 22, _)('dreamapple', _, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  crazyShowMsg( 'dreamapple', _, _)(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  crazyShowMsg('dreamapple')(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
  ```
  结果显示,我们这个函数也实现了我们所说的那些功能.
  

#### 柯里化的一些应用场景

#### 关于柯里化的性能

#### 文中其它知识点的简单解释
+ **I**: 























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
