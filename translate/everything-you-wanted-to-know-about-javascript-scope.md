## 你想知道的关于JavaScript作用域的一切(译)

原文链接: [**Everything you wanted to know about JavaScript scope**](https://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)

原文作者: [**Todd Motto**](https://github.com/toddmotto)

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

很多人以前都使用过`jQuery`,当你写下下面的代码的时候...
```javascript
jQuery('.myClass');
```
我们这时就是通过全局作用域来使用`jQuery`的,我们可以把这种使用叫做`命名空间`.有时命名空间就是一个可以用不同单词来替代的作用域,但是通常指的是最高一级的作用域.
在这个例子中,`jQuery`是在全局作用域中,所以也是我们的命名空间.这个`jQuery`的命名空间是定义在全局作用域上的,它作为这个`jQuery`库的命名空间,
所有在`jQuery`库内的东西都是这个命名空间的派生物.

### 什么是局部作用域
局部作用域指的是那些从全局作用域中定义的许多作用域.JavaScript只有一个全局作用域,每一个定义的函数都有自己的局部(嵌套)作用域.那些定义在别的函数中的函数有一个局部的作用域,
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
作用域链为一个给定的函数建立了作用域.就像我们知道的那样,每一个被定义的函数都有它自己嵌套的作用域,并且任何定义在别的函数中的函数都有一个
连接外部函数的局部作用域,这个连接就是我们所说的作用域链中的链.它常常是在代码中那些能够定义作用域的位置,当我们访问一个变量的时候,
`JavaScript`从最里面的作用域沿着作用域链向外部开始查找,直到找到我们想要的那个变量/对象/函数.

### 闭包
闭包和词法作用域是紧密联系在一起的,关于闭包是如何工作的一个好例子就是当我们返回一个函数的引用的时候,这是一个更实际的用法.
在我们的作用域里,我们可以返回一些东西以便这些东西能够在父作用域里被访问和使用:
```javascript
var sayHello = function (name) {
  var text = 'Hello, ' + name;
  return function () {
    console.log(text);
  };
};
```
我们这里使用的`闭包`概念使我们在`sayHello`的作用域不能够被外部(公共的)作用域访问.单独运行这个函数不会有什么结果因为它只是返回了一个函数:
```javascript
sayHello('Todd'); // nothing happens, no errors, just silence...
```
这个函数返回了一个函数,那就意味着我们需要对它进行赋值,然后对它进行调用:
```javascript
var helloTodd = sayHello('Todd');
helloTodd(); // will call the closure and log 'Hello, Todd'
```
好吧,我撒谎了,你也可以直接调用它,你也许之前已经见到过像这样的函数,这种方式也是可以运行你的闭包:
```javascript
sayHello('Bob')(); // calls the returned function without assignment
```
AngularJS的`$compile`方法使用了上面的技术,你可以将当前作用的引用域传递给这个闭包:
```javascript
$compile(template)(scope);
```
我们可以猜测他们关于这个方法的(简化)代码大概是下面这个样子:
```javascript
var $compile = function (template) {
  // some magic stuff here
  // scope is out of scope, though...
  return function (scope) {
    // access to `template` and `scope` to do magic with too
  };
};
```
当然一个函数不必有返回值也能够被称为一个闭包.只要能够访问外部变量的一个即时的词法作用域就创建了一个闭包.

### 作用域和`this`
每一个作用域都绑定了一个不同值的`this`,这取决于这个函数是如何调用的.我们都使用过`this`关键词,但是并不是所有的人都理解它,还有当它被调用的时候是如何的不同.
默认情况下,`this`指向的是最外层的全局对象`window`.我们可以很容易的展示关于不同的调用方式我们绑定的`this`的值也是不同的:
```javascript
var myFunction = function () {
  console.log(this); // this = global, [object Window]
};
myFunction();

var myObject = {};
myObject.myMethod = function () {
  console.log(this); // this = Object { myObject }
};

var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // this = <nav> element
};
nav.addEventListener('click', toggleNav, false);
```
当我们处理`this`的值的时候我们又遇到了一些问题,举个例子如果我添加一些代码在上面的例子中.就算是在同一个函数内部,作用域和`this`都是会发生改变的:
```javascript
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  console.log(this); // <nav> element
  setTimeout(function () {
    console.log(this); // [object Window]
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
```
所以这里发生了什么?我们创建了一个新的作用域,这个作用域没有被我们的事件处理程序调用,所以默认情况下,这里的`this`指向的是`window`对象.
当然我们可以做一些事情不让这个新的作用域影响我们,以便我们能够访问到这个正确的`this`值.你也许已经见到过我们这样做的方法了,我们可以使用`that`变量缓存当前的`this`值,
然后在新的作用域中使用它.
```javascript
var nav = document.querySelector('.nav'); // <nav class="nav">
var toggleNav = function () {
  var that = this;
  console.log(that); // <nav> element
  setTimeout(function () {
    console.log(that); // <nav> element
  }, 1000);
};
nav.addEventListener('click', toggleNav, false);
```
这是一个小技巧,让我们能够使用到正确的`this`值,并且在新的作用域解决一些问题.

### 使用`.call()`,`.apply()`或者`.bind()`改变作用域
有时,你需要根据你所处理的情况来处理JavaScript的作用域.一个简单的例子展示如何在循环的时候改变作用域:
```javascript
var links = document.querySelectorAll('nav li');
for (var i = 0; i < links.length; i++) {
  console.log(this); // [object Window]
}
```
这里的`this`没有指向我们需要的元素,我们不能够在这里使用`this`调用我们需要的元素,或者改变循环里面的作用域.
让我们来思考一下如何能够改变我们的作用域(好吧,看起来好像是我们改变了作用域,但是实际上我们真正做的事情是去改变我们那个函数的运行上下文).

+ .call()和.apply()
  `.call()`和`.apply()`函数是非常实用的,它们允许你传递一个作用域到一个函数里面,这个作用与绑定了正确的`this`值.
  让我们来处理上面的那些代码吧,让循环里面的`this`指向正确的元素值:
  ```javascript
  var links = document.querySelectorAll('nav li');
  for (var i = 0; i < links.length; i++) {
    (function () {
      console.log(this);
    }).call(links[i]);
  }
  ```
  你可以看到我是如何做的,首先我们创建了一个立即执行的**函数**(*新的函数就表明创建了新的作用域*),
  然后我们调用了`.call()`方法,将数组里面的循环元素`link[i]`当做参数传递给了`.call()`方法,
  然后我们就改变了哪个立即执行的函数的作用域.我们可以使用`.call()`或者`.apply()`方法,但是它们的不同之处是参数的传递形式,
  `.call()`方法的参数的传递形式是这样的`.call(scope, arg1, arg2, arg3)`,`.apply()`的参数的传递形式是这样的`.apply(scope, [arg1, arg2])`.
  
  所以当你需要改变你的函数的作用域的时候,不要使用下面的方法:
  ```javascript
  myFunction(); // invoke myFunction
  ```
  而应该是这样,使用`.call()`去调用我们的方法
  ```javascript
  myFunction.call(scope); // invoke myFunction using .call()
  ```
+ .bind()
  不像上面的方法,使用`.bind()`方法不会调用一个函数,它仅仅在函数调用之前,绑定我们需要的值.就像我们知道的那样,
  我们不能够给函数的引用传递参数.就像下面这样:
  ```javascript
  // works
  nav.addEventListener('click', toggleNav, false);
  
  // will invoke the function immediately
  nav.addEventListener('click', toggleNav(arg1, arg2), false);
  ```
  我们可以解决这个问题,通过在它里面创建一个新的函数:
  ```javascript
  nav.addEventListener('click', function () {
    toggleNav(arg1, arg2);
  }, false);
  ```
  但是这样就改变了作用域,我们又一次创建了一个不需要的函数,这样做需要花费很多,当我们在一个循环中绑定事件监听的时候.
  这时候就需要`.bind()`闪亮登场了,因为我们可以使用他来进行绑定作用域,传递参数,并且函数还不会立即执行:
  ```javascript
  nav.addEventListener('click', toggleNav.bind(scope, arg1, arg2), false);
  ```
  上面的函数没有被立即调用,并且作用域在需要的情况下也会改变,而且函数的参数也是可以通过这个方法传入的.
  
### 私有/共有的作用域

在许多编程语言中,你应该听到过私有作用域或者共有作用域,在JavaScript中,是没有这些概念的.当然我们也可以通过一些手段比如闭包来模拟公共作用域或者是私有作用域.

通过使用JavaScript的设计模式,比如`模块`模式,我们可以创造公共作用域和私有作用域.一个简单的方法创建私有作用域就是使用一个函数去包裹我们自己定义的函数.
就像上面所说的那样,函数创建了一个与全局作用域隔离的一个作用域:
```javascript
(function () {
  // private scope inside here
})();
```
我们可能需要为我们的应用添加一些函数:
```javascript
(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();
```

但是当我们去调用位于函数内部的函数的时候,这些函数在外部的作用域是不可得到的:
```javascript
(function () {
  var myFunction = function () {
    // do some stuff here
  };
})();

myFunction(); // Uncaught ReferenceError: myFunction is not defined
```
成功了,我们创建了私有的作用域.但是问题又来了,我如何在公共作用域内使用我们之前定义好的函数?不要担心,我们的模块设计模式或者说是提示模块模式,
允许我们将我们的函数在公共作用域内发挥作用,它们使用了公共作用域和私有作用域以及对象.在下面我定义了我的全局命名空间,叫做`Module`,
这个命名空间里包含了与那个模块相关的所有代码:
```javascript
// define module
var Module = (function () {
  return {
    myMethod: function () {
      console.log('myMethod has been called.');
    }
  };
})();

// call module + methods
Module.myMethod();
```
上面的`return`声明表明了我们返回了我们的`public`方法,这些方法是可以在全局作用域里使用的,不过需要通过命名空间来调用.
这就表明了我们的那个模块只是存在于哪个命名空间中,它可以包含我们想要的任意多的方法或者变量.我们也可以按照我们的意愿来扩展这个模块:
```javascript
// define module
var Module = (function () {
  return {
    myMethod: function () {

    },
    someOtherMethod: function () {

    }
  };
})();

// call module + methods
Module.myMethod();
Module.someOtherMethod();
```
那么我们的私有方法该如何使用以及定义呢?总是有许多的开发者随意的堆砌他们的方法在那个模块里面,这样的做法污染了全局的命名空间.
那些帮助我们的代码运行并且是不必要出现在全局作用域的方法,就不要导出在全局作用域中,我们只导出那些需要在全局作用域内被调用的函数.
我们可以定义私有的方法,只要不返回它们就行:
```javascript
var Module = (function () {
  var privateMethod = function () {

  };
  return {
    publicMethod: function () {

    }
  };
})();
```
上面的代码意味着,`publicMethod`是可以在全局的命名空间里调用的,但是`privateMethod`是不可以的,因为它是在私有的作用域中被定义的.
这些私有的函数方法一般都是一些帮助性的函数,比如`addClass`,`removeClass`,`Ajax/XHR calls`,`Arrays`,`Objects`等等.

这里有一些概念需要我们知道,就是同一个作用域中的函数变量可以访问在同一个作用域中的函数或者变量,甚至是这些函数已经被作为结果返回.
这意味着,我们的公共函数可以访问我们的私有函数,所以这些私有的函数是仍然可以运行的,只不过他们不可以在公共的作用域里被访问而已.
```javascript
var Module = (function () {
  var privateMethod = function () {

  };
  return {
    publicMethod: function () {
      // has access to `privateMethod`, we can call it:
      // privateMethod();
    }
  };
})();
```
这允许一个非常强大级别的交互,以及代码的安全;JavaScript非常重要的一个部分就是确保安全.这就是为什么我们不能够把所有的函数都放在公共的作用域内,
因为一旦那样做了就会暴漏我们系统的漏洞,让一些心怀恶意的人能够对这些漏洞进行攻击.

下面的例子就是返回了一个对象,然后在这个对象上面调用一些公有的方法的例子:
```javascript
var Module = (function () {
  var myModule = {};
  var privateMethod = function () {

  };
  myModule.publicMethod = function () {

  };
  myModule.anotherPublicMethod = function () {

  };
  return myModule; // returns the Object with public methods
})();

// usage
Module.publicMethod();
```
一个比较规范的命名私有方法的约定是,在私有方法的名字前面加上一个下划线,这可以快速的帮助你区分公有方法或者私有方法:
```javascript
var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
})();
```
这个约定帮助我们可以简单地给我们的函数索引赋值,当我们返回一个匿名对象的时候:
```javascript
var Module = (function () {
  var _privateMethod = function () {

  };
  var publicMethod = function () {

  };
  return {
    publicMethod: publicMethod,
    anotherPublicMethod: anotherPublicMethod
  }
})();
```




















