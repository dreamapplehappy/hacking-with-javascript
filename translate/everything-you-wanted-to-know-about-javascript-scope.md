## 你想知道的关于JavaScript作用域的一切(译)

原文链接: [Everything you wanted to know about JavaScript scope](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
原文作者: [Todd Motto](https://github.com/toddmotto),好厉害的说.

JavaScript中有许多章节是关于`scope`的,但是对于初学者来说(甚至是一些有经验的JavaScript开发者),这些有关作用域的章节既不直接也不容易理解.
这篇文章的目的就是为了帮助那些想更深一步学习了解JavaScript作用域的开发者,尤其是当他们听到一些关于作用域的单词的时候,
好比:`作用域(scope)`,`闭包(closure)`,`this`,`命名空间(namespace)`,`函数作用域(function scope)`,`全局作用域(global scope)`,`词法作用域(lexical)`,`公有变量(public scope)`,`私有变量(private scope)`.
希望通过这篇文章你可以知道下面这些问题的答案:

+ 什么是作用域?
+ 什么是全局(局部)作用域?
+ 什么是命名空间,它和作用域有什么不同?
+ `this`关键字是什么,作用于又是怎么影响它的?
+ 什么是函数/词法作用域?
+ 什么是闭包?
+ 什么是共有/私有作用域?
+ 我怎么样才能够理解/创建/实践上面所有的情况

### 什么是作用域?
在JavaScript中,作用域指的是你代码的当前上下文环境.作用域可以被全局或者局部地定义.理解JavaScript的作用域是让你写出稳健的代码并且成为一个更好的开发者的关键.
你将会理解那些变量或者函数是可以访问的,并且有能力去改变你代码的作用域进而有能力去写出运行速度更快,更容易维护,当然调试也非常容易的代码.
别把作用域想的太复杂,那么我们现在是在`A作用域`还是`B作用域`?

### 什么是全局作用域
当你在开始书写JavaScript代码的时候,你所处的作用域就是我们所说的`全局作用域`.如果我们定义了一个变量,那么它就是被全局定义的:
```javascript
// global scope
var name = 'Todd';
```
全局作用域是你最好的朋友也是你最坏的噩梦;学会去掌控你的作用域是容易的,如果你那样做了,你将不会遇到一些关于全局作用域的问题(通常是关于命名空间的冲突).
你也许会经常听到有人在说*全局作用域是不好的*,但是你从来没有考虑过他们那样说的真正原因.全局作用域当然没有他们说的那样,相反全局作用域是很好的,
你需要使用它去创建能够在别的作用域访问的模块还有接口(APIs),你要在使用它的优点的同时确保不产生新的问题.

很多人以前都是用过`jQuery`,当你写下下面的代码的时候...
```javascript
jQuery('.myClass');
```
我们这时就是通过全局作用域来使用`jQuery`的,我们可以把这种使用叫做`命名空间`.有时命名空间就是代表一个作用域的可以转换的单词,但是通常指的是最高一级的作用域.
在这个例子中,`jQuery`在全局作用域中,所以也是我们的命名空间.这个`jQuery`的命名空间是定义在全局作用域上的,它作为这个`jQuery`库的命名空间,
所有在`jQuery`库内的东西都是这个命名空间的派生物.

### 什么是局部作用域
局部作用域指的是那些从全局作用域中定义的许多作用域.JavaScript只有一个全局作用域,每一个定义的函数都有自己的局部(嵌套)作用域.那些定义在别的函数中的函数有一个局部的作用,
并且这个作用域是指向外部的函数.

如果我定义了一个函数,并且在里面创建了一些变量,这些变量的作用域就是局部的.

把下面的当做一个例子:
```javascript
// Scope A: Global scope out here
var myFunction = function () {
  // Scope B: Local scope in here
};
```
任何局部的东西在全局是不可见的,除非这些东西被导出;这句话的意思是这样的,如果我在一个新的作用域里定义了一些函数或者变量的话,这些变量或者函数在当前的作用域之外是不可以访问的.
下面的代码是关于上面所说的那些的一个小例子:
```javascript
var myFunction = function () {
  var name = 'Todd';
  console.log(name); // Todd
};
// Uncaught ReferenceError: name is not defined
console.log(name);
```
变量`name`是局部的变量,它并没有暴露在父作用域上,因此它是没有被定义的.

### 函数作用域
JavaScript中所有的作用域在创建的时候都只伴随着`函数作用域`,循环语句像`for`或者`while`,条件语句像`if`或者`switch`都不能够产生新的作用域.
`新的函数 = 新的作用域`这就是规则.下面一个简单的例子用来解释作用域的创建:
```javascript
// Scope A
var myFunction = function () {
  // Scope B
  var myOtherFunction = function () {
    // Scope C
  };
};
```
所以说很容易创建新的作用域和局部的变量/函数/对象.

### 词法作用域
每当你看到一个函数里面存在着另一个函数,那么内部的函数能够访问外部函数的作用域,这就叫做词法作用域或者闭包;也被认为是静态作用域,下面的代码是最简单的方法再一次去解释我们所说的内容:
```javascript
// Scope A
var myFunction = function () {
  // Scope B
  var name = 'Todd'; // defined in Scope B
  var myOtherFunction = function () {
    // Scope C: `name` is accessible here!
  };
};
```
你也许注意到`myOtherFunction`没有在这里被调用,它只是简单地被定义.当然它的调用顺序也会影响到作用域里面变量的表现,
在这里我定义了`myOtherFunction`并且在`console`语句之后调用了它:
```javascript
var myFunction = function () {
  var name = 'Todd';
  var myOtherFunction = function () {
    console.log('My name is ' + name);
  };
  console.log(name);
  myOtherFunction(); // call function
};

// Will then log out:
// `Todd`
// `My name is Todd`
```
很容易理解和使用词法作用域,任何被定义在它的父作用域上的变量/对象/函数,在作用域链上都是可以访问到的.例如:
```javascript
var name = 'Todd';
var scope1 = function () {
  // name is available here
  var scope2 = function () {
    // name is available here too
    var scope3 = function () {
      // name is also available here!
    };
  };
};
```
需要记住的一个重要地方是,词法作用域是不可逆的,我们可以从下面的例子中看到结果:
```javascript
// name = undefined
var scope1 = function () {
  // name = undefined
  var scope2 = function () {
    // name = undefined
    var scope3 = function () {
      var name = 'Todd'; // locally scoped
    };
  };
};
```
当然我们可以返回一个指向`name`的引用,但是永远不会是`name`变量本身.

### 作用域链































