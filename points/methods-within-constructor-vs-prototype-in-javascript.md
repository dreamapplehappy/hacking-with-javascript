## 函数内的方法与函数`prototype`属性上方法的对比

> 本文的目的是让大家理解什么情况下把函数的方法写在JavaScript的构造函数上,什么时候把方法写在函数的`prototype`属性上;以及这样做的好处.

为了阅读方便,我们约定一下:把方法写在构造函数内的情况我们简称为*函数内方法*,把方法写在`prototype`属性上的情况我们简称为*prototype上的方法*

**首先我们先了解一下这篇文章的重点:**

+ 函数内的方法: 使用函数内的方法我们可以访问到函数内部的私有变量,如果我们通过构造函数`new`出来的对象需要我们操作构造函数内部的私有变量的话,
  我们这个时候就要考虑使用函数内的方法.
+ prototype上的方法: 当我们需要通过一个函数创建大量的对象,并且这些对象还都有许多的方法的时候;这时我们就要考虑在函数的`prototype`上添加这些方法.
  这种情况下我们代码的内存占用就比较小.
+ **在实际的应用中,这两种方法往往是结合使用的;所以我们要首先了解我们需要的是什么,然后再去选择如何使用.**






参考的文章或者回答:
+ [Methods Within Constructor vs Prototype in Javascript](http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/ )
+ [Use of 'prototype' vs. 'this' in JavaScript?](http://stackoverflow.com/questions/310870/use-of-prototype-vs-this-in-javascript)
+ [Advantages of using prototype, vs defining methods straight in the constructor? [duplicate]](http://stackoverflow.com/questions/4508313/advantages-of-using-prototype-vs-defining-methods-straight-in-the-constructor)