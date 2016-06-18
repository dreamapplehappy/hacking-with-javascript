## 函数内的方法与函数`prototype`属性上方法的对比

> 本文的目的是让大家理解什么情况下把函数的方法写在JavaScript的构造函数上,什么时候把方法写在函数的`prototype`属性上;以及这样做的好处.

为了阅读方便,我们约定一下:把方法写在构造函数内的情况我们简称为**函数内方法**,把方法写在`prototype`属性上的情况我们简称为**prototype上的方法**

**首先我们先了解一下这篇文章的重点:**

+ **函数内的方法:** 使用函数内的方法我们可以**访问到函数内部的私有变量**,如果我们通过构造函数`new`出来的对象需要我们操作构造函数内部的私有变量的话,
  我们这个时候就要考虑使用函数内的方法.
+ **prototype上的方法:** 当我们需要**通过一个函数创建大量的对象**,并且这些对象还都有许多的方法的时候;这时我们就要考虑在函数的`prototype`上添加这些方法.
  这种情况下我们代码的**内存占用**就比较小.
+ **在实际的应用中,这两种方法往往是结合使用的;所以我们要首先了解我们需要的是什么,然后再去选择如何使用.**

我们还是根据下面的代码来说明一下这些要点吧,下面是[代码部分][2]:
```javascript
// 构造函数A
function A(name) {
    this.name = name || 'a';
    this.sayHello = function() {
        console.log('Hello, my name is: ' + this.name);
    }
}

// 构造函数B
function B(name) {
    this.name = name || 'b';
}
B.prototype.sayHello = function() {
    console.log('Hello, my name is: ' + this.name);
};

var a1 = new A('a1');
var a2 = new A('a2');
a1.sayHello();
a2.sayHello();

var b1 = new B('b1');
var b2 = new B('b2');
b1.sayHello();
b2.sayHello();
```

我们首先写了两个构造函数,第一个是`A`,这个构造函数里面包含了一个方法`sayHello`;第二个是构造函数`B`,
我们把那个方法`sayHello`写在了构造函数`B`的`prototype`属性上面.

需要指出的是,通过这两个构造函数`new`出来的对象具有一样的属性和方法,但是它们的区别我们可以通过下面的一个图来说明:

![1](http://angular.angular-china.org/49ddd62c-37f5-4e65-9dba-834f2af9c863.jpg)

我们通过使用构造函数`A`创建了两个对象,分别是`a1`,`a2`;通过构造函数`B`创建了两个对象`b1`,`b2`;我们可以发现`b1`,`b2`这两个对象的那个`sayHello`方法
都是指向了它们的构造函数的`prototype`属性的`sayHello`方法.而`a1`,`a2`都是在自己内部定义了这个方法.
**定义在构造函数内部的方法,会在它的每一个实例上都克隆这个方法;定义在构造函数的`prototype`属性上的方法会让它的所有示例都共享这个方法,但是不会在每个实例的内部重新定义这个方法.**
**如果我们的应用需要创建很多新的对象,并且这些对象还有许多的方法,为了节省内存,我们建议把这些方法都定义在构造函数的`prototype`属性上**

当然,在某些情况下,我们需要将某些方法定义在构造函数中,这种情况一般是因为我们需要**访问构造函数内部的私有变量**.


下面我们举一个两者结合的例子,代码如下:
```javascript
function Person(name, family) {
    this.name = name;
    this.family = family;
    
    var records = [{type: "in", amount: 0}];

    this.addTransaction = function(trans) {
        if(trans.hasOwnProperty("type") && trans.hasOwnProperty("amount")) {
           records.push(trans);
        }
    }

    this.balance = function() {
       var total = 0;

       records.forEach(function(record) {
           if(record.type === "in") {
             total += record.amount;
           }
           else {
             total -= record.amount;
           }
       });
    
        return total;
    };
};

Person.prototype.getFull = function() {
    return this.name + " " + this.family;
};

Person.prototype.getProfile = function() {
     return this.getFull() + ", total balance: " + this.balance();
};
```

在上面的代码中,我们定义了一个`Person`构造函数;这个函数有一个内部的私有变量`records`,这个变量我们是不希望通过函数内部以外的方法
去操作这个变量,所以我们把操作这个变量的方法都写在了函数的内部.而把一些可以公开的方法写在了`Person`的`prototype`属性上,比如方法`getFull`和`getProfile`.

**把方法写在构造函数的内部,增加了通过构造函数初始化一个对象的成本,把方法写在`prototype`属性上就有效的减少了这种成本.**
**你也许会觉得,调用对象上的方法要比调用它的原型链上的方法快得多,其实并不是这样的,如果你的那个对象上面不是有很多的原型的话,它们的速度其实是差不多的**










参考的文章或者问答:
+ [Methods Within Constructor vs Prototype in Javascript](http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/ )
+ [Use of 'prototype' vs. 'this' in JavaScript?](http://stackoverflow.com/questions/310870/use-of-prototype-vs-this-in-javascript)
+ [Advantages of using prototype, vs defining methods straight in the constructor? [duplicate]](http://stackoverflow.com/questions/4508313/advantages-of-using-prototype-vs-defining-methods-straight-in-the-constructor)


[2]:
http://pythontutor.com/visualize.html#code=//+%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0A%0Afunction+A%28name%29+%7B%0A++++this.name+=+name+%7C%7C+%27a%27;%0A++++this.sayHello+=+function%28%29+%7B%0A++++++++console.log%28%27Hello,+my+name+is:+%27+++this.name%29;%0A++++%7D%0A%7D%0A%0A//+%E6%9E%84%E9%80%A0%E5%87%BD%E6%95%B0B%0Afunction+B%28name%29+%7B%0A++++this.name+=+name+%7C%7C+%27b%27;%0A%7D%0AB.prototype.sayHello+=+function%28%29+%7B%0A++++console.log%28%27Hello,+my+name+is:+%27+++this.name%29;%0A%7D;%0A%0Avar+a1+=+new+A%28%27a1%27%29;%0Avar+a2+=+new+A%28%27a2%27%29;%0Aa1.sayHello%28%29;%0Aa2.sayHello%28%29;%0A%0Avar+b1+=+new+B%28%27b1%27%29;%0Avar+b2+=+new+B%28%27b2%27%29;%0Ab1.sayHello%28%29;%0Ab2.sayHello%28%29;&mode=display&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&textReferences=false&py=js&rawInputLstJSON=%5B%5D&curInstr=27
---

1.使用`prototype`方法小心 ,改变所有 也是优点
2.变量提升
3.序列化
4.
