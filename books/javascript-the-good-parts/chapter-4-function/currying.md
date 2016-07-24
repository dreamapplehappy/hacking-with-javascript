### 玩一玩JS函数的柯里化

> [Haskell](https://www.haskell.org/)和[scala](http://www.scala-lang.org/)都支持函数的柯里化,JavaScript函数的柯里化还与[JavaScript的函数编程](http://eloquentjavascript.net/1st_edition/chapter6.html)有很大的联系,如果你感兴趣的话,可以在这些方面多下功夫了解,相信收获一定很多.

#### :tangerine:看本篇文章需要知道的一些知识点
+ 函数部分的`call`/`apply`/`arguments`
+ 闭包
+ 高阶函数
+ 不完全函数

文章后面有对这些知识的简单解释,大家可以看看.

#### :tangerine:什么是柯里化?
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

#### :tangerine:为什么要对函数进行柯里化?
+ :apple:可以使用一些小技巧(见下文)
+ :apple:提前绑定好函数里面的某些参数,达到参数复用的效果,提高了适用性.
+ :apple:固定易变因素
+ :apple:延迟计算

总之,函数的柯里化能够让你重新组合你的应用,把你的复杂功能拆分成一个一个的小部分,每一个小的部分都是简单的,便于理解的,而且是容易测试的;


#### :tangerine:如何对函数进行柯里化?
在这一部分里,我们由浅入深的一步步来告诉大家如何对一个多参数的函数进行柯里化.其中用到的知识有`闭包`,`高阶函数`,`不完全函数`等等.

+ **I 开胃菜**

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

  上面我们虽然对对函数`printInfo`进行了柯里化,但是我们可不想在需要柯里化的时候,都像上面那样不断地进行函数的嵌套,那简直是噩梦;
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
  上面的结果表示,我们的这个柯里化的函数是正确的.上面的`curryingHelper`就是一个**高阶函数**,关于高阶函数的解释可以参照下文.
  
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
  

#### :tangerine:柯里化的一些应用场景
说了那么多,其实这部分才是最重要的部分;学习某个知识要一定可以用得到,不然学习它干嘛:joy:

+ 关于函数柯里化的一些小技巧
    - 给`setTimeout`传递地进来的函数添加参数
    
        一般情况下,我们如果想给一个`setTimeout`传递进来的函数添加参数的话,一般会使用之种方法:
        ```javascript
        function hello(name) {
            console.log('Hello, ' + name);
        }
        setTimeout(hello('dreamapple'), 3600); //立即执行,不会在3.6s后执行
        setTimeout(function() {
            hello('dreamapple');
        }, 3600); // 3.6s 后执行
        ```
        我们使用了一个新的匿名函数包裹我们要执行的函数,然后在函数体里面给那个函数传递参数值.
        
        当然,在ES5里面,我们也可以使用函数的[`bind`][2]方法,如下所示:
        ```javascript
        setTimeout(hello.bind(this, 'dreamapple'), 3600); // 3.6s 之后执行函数
        ```
        这样也是非常的方便快捷,并且可以绑定函数执行的上下文.
        
        我们本篇文章是讨论函数的柯里化,当然我们这里也可以使用函数的柯里化来达到这个效果:
        ```javascript
        setTimeout(curryingHelper(hello, 'dreamapple'), 3600); // 其中curryingHelper是上面已经提及过的
        ```
        这样也是可以的,是不是很酷.其实函数的`bind`方法也是使用函数的柯里化来完成的,详情可以看这里[Function.prototype.bind()][5].
    - 写出这样一个函数`multiply(1)(2)(3) == 6`结果为`true`,`multiply(1)(2)(3)(...)(n) == (1)*(2)*(3)*(...)*(n)`结果为`true`
        
      这个题目不知道大家碰到过没有,不过通过函数的柯里化,也是有办法解决的,看下面的代码:
      ```javascript
      function multiply(x) {
          var y = function(x) {
              return multiply(x * y);
          };
          y.toString = y.valueOf = function() {
              return x;
          };
          return y;
      }
      
      console.log(multiply(1)(2)(3) == 6); // true
      console.log(multiply(1)(2)(3)(4)(5) == 120); // true
      ```  
      因为`multiply(1)(2)(3)`的直接结果并不是6,而是一个函数对象`{ [Number: 6] valueOf: [Function], toString: [Function] }`,我们
      之后使用了`==`会将左边这个函数对象转换成为一个数字,所以就达到了我们想要的结果.还有关于为什么使用`toString`和`valueOf`方法
      可以看看这里的解释[Number.prototype.valueOf()][6],[Function.prototype.toString()][7].
      
    - 上面的那个函数不够纯粹,我们也可以实现一个更纯粹的函数,但是可以会不太符合题目的要求.
      我们可以这样做,先把函数的参数存储,然后再对这些参数做处理,一旦有了这个思路,我们就不难写出些面的代码:
      ```javascript
      function add() {
          var args = Array.prototype.slice.call(arguments);
          var _that = this;
          return function() {
              var newArgs = Array.prototype.slice.call(arguments);
              var total = args.concat(newArgs);
              if(!arguments.length) {
                  var result = 1;
                  for(var i = 0; i < total.length; i++) {
                      result *= total[i];
                  }
                  return result;
              }
              else {
                  return add.apply(_that, total);
              }
          }
      }
      add(1)(2)(3)(); // 6
      add(1, 2, 3)(); // 6
      ```
    - 当我们的需要兼容IE9之前版本的IE浏览器的话,我们可能需要写出一些兼容的方案 ,比如事件监听;一般情况下我们应该会这样写:
    
      ```javascript
      var addEvent = function (el, type, fn, capture) {
              if (window.addEventListener) {
                  el.addEventListener(type, fn, capture);
              }
              else {
                  el.attachEvent('on' + type, fn);
              }
          };
      ```
      这也写也是可以的,但是性能上会差一点,因为如果是在低版本的IE浏览器上每一次都会运行`if()`语句,产生了不必要的性能开销.
      我们也可以这样写:
      
      ```javascript
      var addEvent = (function () {
              if (window.addEventListener) {
                  return function (el, type, fn, capture) {
                      el.addEventListener(type, fn, capture);
                  }
              }
              else {
                  return function (el, type, fn) {
                      var IEtype = 'on' + type;
                      el.attachEvent(IEtype, fn);
                  }
              }
          })();
      ```
      这样就减少了不必要的开支,整个函数运行一次就可以了.
     
+ 延迟计算
    
    上面的那两个函数`multiply()`和`add()`实际上就是延迟计算的例子.
        
+ 提前绑定好函数里面的某些参数,达到参数复用的效果,提高了适用性.
    
    我们的`I 开胃菜`部分的`tomLike`和`jerryLike`其实就是属于这种的,绑定好函数里面的第一个参数,然后后面根据情况分别使用不同的函数.
    
+ 固定易变因素
    
    我们经常使用的函数的`bind`方法就是一个固定易变因素的很好的例子.
        

#### :tangerine:关于柯里化的性能
  
  当然,使用柯里化意味着有一些额外的开销;这些开销一般涉及到这些方面,首先是关于函数参数的调用,操作`arguments`对象通常会比操作命名的参数要慢一点;
  还有,在一些老的版本的浏览器中`arguments.length`的实现是很慢的;直接调用函数`fn`要比使用`fn.apply()`或者`fn.call()`要快一点;产生大量的嵌套
  作用域还有闭包会带来一些性能还有速度的降低.**但是,大多数的web应用的性能瓶颈时发生在操作DOM上的,所以上面的那些开销比起DOM操作的开销还是比较小的.**

#### :tangerine:关于本章一些知识点的解释
+ 琐碎的知识点
    
  `fn.length`: 表示的是这个函数中参数的个数.
  
  `arguments.callee`: 指向的是当前运行的函数.`callee`是`arguments`对象的属性。
  在该函数的函数体内,它可以指向当前正在执行的函数.当函数是匿名函数时,这是很有用的,比如没有名字的函数表达式(也被叫做"匿名函数").
  详细解释可以看这里[arguments.callee][3].我们可以看一下下面的例子:
  ```javascript
  function hello() {
      return function() {
          console.log('hello');
          if(!arguments.length) {
              console.log('from a anonymous function.');
              return arguments.callee;
          }
      }
  }
  
  hello()(1); // hello
  
  /*
   * hello
   * from a anonymous function.
   * hello
   * from a anonymous function.
   */
  hello()()();
  ```
  `fn.caller`: 返回调用指定函数的函数.详细的解释可以看这里[Function.caller][4],下面是示例代码:
  ```javascript
  function hello() {
      console.log('hello');
      console.log(hello.caller);
  }
  
  function callHello(fn) {
      return fn();
  }
  
  callHello(hello); // hello [Function: callHello]
  ```
  
  
    
+ 高阶函数(high-order function)
    
  **高阶函数就是操作函数的函数,它接受一个或多个函数作为参数,并返回一个新的函数.**
  我们来看一个例子,来帮助我们理解这个概念.就举一个我们高中经常遇到的场景,如下:
  ```javascript
  f1(x, y) = x + y;
  f2(x) = x * x;
  f3 = f2(f3(x, y));
  ```
  我们来实现`f3`函数,看看应该如何实现,具体的代码如下所示:
  ```javascript
  function f1(x, y) {
      return x + y;
  }
  
  function f2(x) {
      return x * x;
  }
  
  function func3(func1, func2) {
      return function() {
          return func2.call(this, func1.apply(this, arguments));
      }
  }
  
  var f3 = func3(f1, f2);
  console.log(f3(2, 3)); // 25
  ```
  我们通过函数`func3`将函数`f1`,`f2`结合到了一起,然后返回了一个新的函数`f3`;这个函数就是我们期望的那个函数.
  
+ 不完全函数(partial function)

  什么是不完全函数呢?所谓的不完全函数和我们上面所说的柯里化基本差不多;所谓的不完全函数,就是给你想要运行的那个函数绑定一个固定的参数值;
  然后后面的运行或者说传递参数都是在前面的基础上进行运行的.看下面的例子:
  ```javascript
  // 一个将函数的arguments对象变成一个数组的方法
  function array(a, n) {
      return Array.prototype.slice.call(a, n || 0);
  }
  // 我们要运行的函数
  function showMsg(a, b, c){
      return a * (b - c);
  }
  
  function partialLeft(f) {
      var args = arguments;
      return function() {
          var a = array(args, 1);
          a = a.concat(array(arguments));
          console.log(a); // 打印实际传递到函数中的参数列表
          return f.apply(this, a);
      }
  }
  
  function partialRight(f) {
      var args = arguments;
      return function() {
          var a = array(arguments);
          a = a.concat(array(args, 1));
          console.log(a); // 打印实际传递到函数中的参数列表
          return f.apply(this, a);
      }
  }
  
  function partial(f) {
      var args = arguments;
      return function() {
          var a = array(args, 1);
          var i = 0; j = 0;
          for(; i < a.length; i++) {
              if(a[i] === undefined) {
                  a[i] = arguments[j++];
              }
          }
          a = a.concat(array(arguments, j));
          console.log(a); // 打印实际传递到函数中的参数列表
          return f.apply(this, a);
      }
  }
  
  
  partialLeft(showMsg, 1)(2, 3); // 实际参数列表: [1, 2, 3] 所以结果是 1 * (2 - 3) = -1
  partialRight(showMsg, 1)(2, 3); // 实际参数列表: [2, 3, 1] 所以结果是 2 * (3 - 1) = 4
  partial(showMsg, undefined, 1)(2, 3); // 实际参数列表: [2, 1, 3] 所以结果是 2 * (1 - 3) = -4
  ```
#### 一些你可能会喜欢的JS库
JavaScript的柯里化与JavaScript的函数式编程密不可分,下面列举了一些关于JavaScript函数式编程的库,大家可以看一下:

+ [underscore](https://github.com/jashkenas/underscore)
+ [lodash](https://github.com/lodash/lodash/)
+ [ramda](https://github.com/ramda/ramda)
+ [bacon.js](https://github.com/baconjs/bacon.js)
+ [fn.js](https://github.com/CrowdHailer/fn.js)
+ [functional-js](https://github.com/functionaljs/functional-js/)

#### 欢迎提意见
+ [可以在这里提意见](https://github.com/dreamapplehappy/hacking-with-javascript/issues/2)


#### 参考的资料
+ [:mag_right:Gettin’ Freaky Functional w/Curried JavaScript](http://blog.carbonfive.com/2015/01/14/gettin-freaky-functional-wcurried-javascript/)
+ [:mag_right:A Beginner’s Guide to Currying in Functional JavaScript](https://www.sitepoint.com/currying-in-functional-javascript/)
+ [:mag_right:Currying, Spice Up Your Javascript Functions](http://requiremind.com/currying-spice-up-your-javascript-functions/)
+ [函数式JavaScript（4）：函数柯里化](http://blog.jobbole.com/77956/)
+ [前端开发者进阶之函数柯里化Currying](http://www.cnblogs.com/pigtail/p/3447660.html)
+ [:mag_right:JS中的柯里化(currying)](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)
+ [浅析 JavaScript 中的 函数 currying 柯里化](http://www.2cto.com/kf/201412/357997.html)
+ [JS闭包与柯里化](http://www.itxueyuan.org/view/5637.html)
+ [:mag_right:Js函数柯里化](http://www.w3cfuns.com/notes/17507/f742cc715cacdc1a9656c2645aea55a4.html)
+ [:mag_right:深入解析JavaScript中函数的Currying柯里化](http://www.jb51.net/article/81190.htm)
+ [:mag_right:js基础篇之——JavaScript的柯里化函数详解](http://toutiao.com/i6220924016044016129/)
+ [:mag_right:JS函数柯里化及其应用](http://blog.csdn.net/yhjw2bah/article/details/7897032)




[1]: https://zh.wikipedia.org/zh-cn/%E6%9F%AF%E9%87%8C%E5%8C%96
[2]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[3]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/callee
[4]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/caller
[5]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
[6]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/valueOf
[7]: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString
