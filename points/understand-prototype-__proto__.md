## 理解JavaScript的`prototype`和`__proto__`

> 这篇文章的的目的试图通过最简单的表述,让大家理解`prototype`和`__proto__`

**先把最重要的几点列出来,大家可以带着这几个核心要点阅读下面的文章.**
+ `__proto__`是用来在原型链上查找你需要的方法的实际对象,所有的对象都有这个属性.这个属性被`JavaScript`引擎用作继承使用.
根据ECMA的规范,这个属性应该是一个内在的属性,但是大多数的浏览器厂商都允许我们去访问和修改它.

+ `prototype`是函数:sunglasses:**独有的属性**:sunglasses:.当我们使用关键词`new`并且将函数作为构造函数来构造对象的时候,
它被用来构建对象的`__proto__`属性.

+ `__proto__`属性和`prototype`属性都是一个对象[代码演示][1].

+ `(new A()).__proto__ === A.prototype`的结果为`true`,`(new A()).prototype === undefined`的结果也为`true`,其中`A`表示一个函数(也就是构造函数).

**接下来我们来使用一些代码来解释上面所说的那些要点:**

```javascript
    // 这是一个普通函数,我们把它用来当做构造函数,也当做一个[父类]
    function Car(name) {
        this.name = name;
    }
    Car.prototype.introduce = function() {
      console.log('[From Car.prototype.introduce] ' + 'Hello, my name is: ' + this.name);
    };
    
    var car = new Car('porsche');
    console.log(car.name); // porsche
    car.introduce(); // [From Car.prototype.introduce] Hello, my name is: porsche
    
    
    // 我们开始构建另外一个函数,我们把这个函数当做一个[子类],暂时这么说.
    function MiniCar(name, color) {
        this.name = name;
        this.color = color;
    
        this.getColor = function() {
            console.log('My color is: ' + this.color);
        }
    }
    MiniCar.prototype = new Car();
    
    var miniCar = new MiniCar('benz', 'black');
    console.log('\n');
    console.log('name: ' + miniCar.name + ';color: ' + miniCar.color); // name: benz;color: black
    miniCar.introduce(); // [From Car.prototype.introduce] Hello, my name is: benz
    miniCar.getColor(); // My color is: black
    
    // 如果使用A表示一个构造函数,那么 (new A()).__proto__ === A.prototype
    console.log((new MiniCar()).__proto__ === MiniCar.prototype); // true
    
    // 如果使用a表示A的一个示例的话,那么 a.__proto__ === A.prototype
    console.log(miniCar.__proto__ === MiniCar.prototype); // true
    
    // 一个对象是没有prototype属性的
    console.log(miniCar.prototype === undefined); // true
```

如果你练习了上面的代码,对这两个属性的理解应该会有一定的帮助,也许你已经理解了;如果没有太懂的话,那也没关系;
我们下面来好好的说一说上面的代码(开始长篇大论了:joy:).

首先,在`JavaScript`中是没有`类`这个概念的,如果你学过`Java`或者`C++`的话,应该知道,要是想创建一个对象,必须先有一个`类`;
但是`JavaScript`中没有`类`,那怎么办?模仿喽:see_no_evil:,所以`JavaScript`创造了`__proto__`这个属性用来连接`子类`和`父类`.
创造了`prototype`属性去用来在构建`子类`时候构建`__proto__`这个属性.

*这里先暂停上面的线程,我们来说说`prototype`这个属性,这个属性是只属于`Function`函数的,那么这个属性的作用是什么呢?
这个属性的作用是为了让使用`Function`作为构造函数`new`出来的对象实例都能够共享一些函数.*

```javascript
    function Car(name) {
            this.name = name;
        }
    Car.prototype.introduce = function() {
      console.log('[From Car.prototype.introduce] ' + 'Hello, my name is: ' + this.name);
    };
```
*上面的代码中,只要是使用`Car`这个构造函数`new`出来的对象都具有方法`introduce`.*

继续上面的线程,我们按照代码的执行顺序来说明这件事情:
+ 首先我们定义了两个函数`Car`和`MiniCar`,如下图所示:
  ![1](http://angular.angular-china.org/f7396089-aeb0-43a3-b53c-14353b7f745a.jpg)
+ 然后我们给Car的原型上添加了一个方法`introduce`,如下图所示:
  ![2](http://angular.angular-china.org/cbe213bb-6f1e-4fc5-84d4-fa082bf50a89.jpg)
+ 接下来`var car = new Car('porsche')`这一行代码可不像它看起来那样,它内部的实现还是有许多值得玩味的;
  首先,函数`Car`创建了一个新的对象(a),**这个对象有一个隐藏的属性`__proto__`,这个属性和`Car`的原型都指向同一个对象.**
  然后`Car`函数内部的`this`指向哪个新创建的对象(a).如下图所示:
  ![3](http://angular.angular-china.org/6441a0ee-2acd-4667-82b7-8d8a7b57f188.jpg)
+ 然后我们给这个对象添加了一个属性`name`,并且为其赋值.**还要注意的一点是,我们这个`Car`函数是有返回值的,虽然没有使用`return`关键字
  把这个值显式的返回**,这个返回值是一个引用,然后变量`car`就可以用来操作那个对象了(a).
  ![4](http://angular.angular-china.org/0d7b4f2a-8261-4b2d-8d24-cf4383281811.jpg)
+ 然后上面的语句运行完之后,场面上是下图这个样子:
  ![5](http://angular.angular-china.org/b285b41a-dfbe-4873-be5c-b1ca1af5461b.jpg)
+ 接下来我们输出了这个对象的名字,然后调用了这个对象(的构造函数的原型上的)的`introduce`方法.输出的结果如下图:
  ![6](http://angular.angular-china.org/85bec1c9-bf2a-4c7b-bdbc-4b94a886a6b3.jpg)
+ 然后我们有定义了一个函数`MiniCar`,我们把它当做`Car`(父类)的一个`子类`;
  我使用代码`MiniCar.prototype = new Car()`来实现这个功能,这段代码更值得好好分析一下.
  ![7](http://angular.angular-china.org/a6320832-aee7-484a-9e8c-3b3e19994223.jpg)
  首先如上图所示,`MiniCar`这个函数的`prototype`是函数`Car`使用`new`关键字创建的一个对象(b),
  **所以`MiniCar`的实例具有这个对象(b)能够使用的任何属性和方法**.
+ 让我们更进一步吧,这一步我们开始运行`var miniCar = new MiniCar('benz', 'black')`这段代码,
  首先我们先要运行函数`MiniCar`函数,所以通过`new`操作,我们新创建了一个对象(c),我们首先给这个对象
  添加了了两个属性,分别是`name`和`color`,然后分别赋值`benz`和`black`,*其实我们可以只添加一个属性,因为`name`属性在`Car`上是已经存在的.*
  我们还给它添加了一个`getColor`方法,**它的`__proto__`属性指向`MiniCar.prototype`, 而`MiniCar.prototype`是一个对象,这个对象也有一个`__proto__`属性,
  这个属性指向`Car.prototype`,如此一来这个伪继承就实现了.**然后我们将这个对象(c)的索引赋值给`miniCar`,所以通过`miniCar`可以操作对象(c).
  ![8](http://angular.angular-china.org/de786c99-ff50-42d1-9240-972193ccad89.jpg)
+ 然后接下来的一切应该都顺理成章了:joy:.


















------
参考的文章或者问答:
+ [How does __proto__ differ from constructor.prototype?](http://stackoverflow.com/questions/650764/how-does-proto-differ-from-constructor-prototype)
+ [__proto__ VS. prototype in JavaScript](http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript)
+ [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
+ [JavaScript difference between __proto__ and prototype](https://coderwall.com/p/j1khtg/javascript-difference-between-__proto__-and-prototype)
+ [Understanding "Prototypes" in JavaScript](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
+ [JavaScript Prototype in Plain Language](http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language)
+ [Object.prototype.__proto__](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)
+ [Function.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)
+ [js中__proto__和prototype的区别和关系？](https://www.zhihu.com/question/34183746?sort=created)
+ [prototype与__proto__的联系与区别](http://www.th7.cn/web/js/201503/88712.shtml)
+ [简单粗暴地理解js原型链--js面向对象编程](http://www.cnblogs.com/qieguo/p/5451626.html)











[1]:http://pythontutor.com/visualize.html#code=console.log%28%7B%7D.__proto__%29;%0Aconsole.log%28%28function%28%29%7B%7D%29.prototype%29;&mode=display&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&textReferences=false&py=js&rawInputLstJSON=%5B%5D&curInstr=2