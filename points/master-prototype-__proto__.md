## 掌握JavaScript的`prototype`和`__proto__`

> 这篇文章的的目的试图通过最简单的表述,让大家理解`prototype`和`__proto__`

先把最重要的几点列出来,大家可以带着这几个核心要点阅读下面的文章.
+ `__proto__`是用来在原型链上查找你需要的方法的实际对象,所有的对象都有这个属性.这个属性被`JavaScript`引擎用作继承使用.
根据ECMA的规范,这个属性应该是一个内在的属性,但是大多数的浏览器厂商都允许我们去访问和修改它.

+ `prototype`是函数:sunglasses:**独有的属性**:sunglasses:.当我们使用关键词`new`并且将函数作为构造器来构造对象的时候,
它被用来构建对象的`__proto__`属性.

+ `__proto__`属性和`prototype`属性都是一个对象[代码演示][1]









[1]:http://pythontutor.com/visualize.html#code=console.log%28%7B%7D.__proto__%29;%0Aconsole.log%28%28function%28%29%7B%7D%29.prototype%29;&mode=display&origin=opt-frontend.js&cumulative=false&heapPrimitives=false&textReferences=false&py=js&rawInputLstJSON=%5B%5D&curInstr=2