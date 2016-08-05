### 理解JavaScript的Object.defineProperty()函数

在进入今天的内容之前,我们可以先考虑这么一个场景,在你的项目中你有这么一个对象如下所示:
```javascript
var dreamapple = {
    firstName: 'dream',
    lastName: 'apple'
};
```
我们的要求就是你要给`dreamapple`添加一个`fullName`属性,当`dreamapple`的`firstName`或者`lastName`
发生变化的时候,`fullName`也要随之变化;
而且当我们设置了`fullName`的值的时候,那么相应的它的`firstName`和`lastName`也随之发生变化; 
那么我们应该怎么做呢?

如果你使用过`Vue.js`的话,那么你可以使用它的`计算属性`来达到这个目的,大概的代码应该是下面这个样子:
```javascript
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

如果你使用过`Angular 1.x`的话,那么你可能会使用`$watch`来达到这个目的,大概的代码应该是下面这个样子:
```javascript
// 在控制器中使用 var vm = this;
$scope.$watch('vm.firstName', function() {
    vm.fullName = vm.firstName + ' ' + vm.lastName;
});
$scope.$watch('vm.lastName', function() {
    vm.fullName = vm.firstName + ' ' + vm.lastName;
});
$scope.$watch('vm.fullName', function() {
    var names = vm.fullName.trim().split(' ');
    if(2 === names.length) {
        vm.firstName = names[0];
        vm.lastName = names[1];
    }
    else {
        // TODO
    }
});
```

那我们使用原生的`JavaScript`可不可以达到这个目的呢?当然可以了;那么我们需要怎么做呢?比较简单的做法就是给这个
对象的属性`fullName`设置一个`getter`和一个`setter`,因为这是`ES5`的特性所以较低版本的浏览器不支持这种特性,但是基本所有的
现代浏览器都已经支持.我们只需要写出下面的代码就可以了:

```javascript
var dreamapple = {
    firstName: 'dream',
    lastName: 'apple',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    },
    set fullName(fullName) {
        var names = fullName.trim().split(' ');
        if(2 === names.length) {
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
};

dreamapple.firstName = 'Dream';
dreamapple.lastName = 'Apple';
console.log(dreamapple.fullName); // Dream Apple

dreamapple.fullName = 'Jams King';
console.log(dreamapple.firstName); // Jams
console.log(dreamapple.lastName); // King
```
是不是很方便呢?我们通过给`dreamapple`这个对象设置了属性`fullName`的`getter`和`setter`方法,就达到了我们想要的那种效果.

当然更好的一种方法就是使用[`Object.defineProperty()`][1]这个函数了,下面我们就来好好的探讨一下这个函数.
这个方法的作用就是直接在一个对象上定义一个新属性,或者修改一个已经存在的属性,并返回这个对象;我们先来看一下怎么使用这个方法:
```javascript
Object.defineProperty(obj, prop, descriptor)
```
其中参数`obj`表示的是需要定义属性的那个对象,参数`prop`表示需要被定义或者修改的属性名,
参数`descriptor`就是我们定义的那个属性`prop`的描述;我们接下来主要讲解这个`descriptor`.
它是一个对象,它有许多的属性,我们接下来来分析这些属性都是干什么用的:

+ **value** 该属性对应的值,可以是任何有效的JavaScript值(数值,对象,函数等),默认为`undefined`.我们可以看下面的一个小例子:
```javascript
var dream = {};
Object.defineProperty(dream, 'name', {
    value: 'dreamapple'
});

console.log(dream.name); // dreamapple
dream.name = 'apple'; // 修改name属性
console.log(dream.name); // 并不是apple,依旧是dreamapple
```
从上面的代码中我们可以看到,我们给`dream`定义了一个新的属性`name`,然后我们打印出这个属性就是我们预期的那样,得到的是`dreamapple`;
但是,当我们尝试改变这个属性的时候,却发现这个属性并没有改变,还以第一次我们赋给它的值;这是为什么呢?
原来,只有当我们这个属性的`writable`修饰为`true`时,我们这个属性才可以被修改.

+ **writable** 当且仅当仅当该属性的`writable`为`true`时,该属性才能被赋值运算符改变;它的默认值为false.我们来修改一下上面的代码,
让属性`name`可以被修改:
```javascript
Object.defineProperty(dream, 'name', {
    value: 'dreamapple',
    writable: true
});

console.log(dream.name); // dreamapple
dream.name = 'apple'; // 修改name属性
console.log(dream.name); // apple
```
我们可以看到,当我们把`writable`修改为`true`时,我们就可以修改`name`属性了.

+ **enumerable** 这个特性决定了我们定义的属性是否是可枚举的类型,默认是`false`;只有我们把它设置为`true`的时候这个属性才可以使用`for(prop in obj)`和`Object.keys()`
中枚举出来.就像下面这样:
```javascript
Object.defineProperty(dream, 'a', {
    value: 1,
    enumerable: false // 不可枚举
});
Object.defineProperty(dream, 'b', {
    value: 2,
    enumerable: true // 可枚举
});

// 只会输出 b
for(prop in dream) {
    console.log(prop);
}

console.log(Object.keys(dream)); // ['b']

console.log(dream.propertyIsEnumerable('a')); // false
console.log(dream.propertyIsEnumerable('b')); // true
```
所以当我们想给你个对象添加一个不可枚举的属性的时候,就应该把`enumerable`设置为`false`.

+ **configurable** 这个特性决定了对象的属性是否可以被删除,以及除`writable`特性外的其它特性是否可以被修改;并且`writable`特性值只可以是`false`
我们可以写一个代码示例来演示一下这个特性:
```javascript
Object.defineProperty(dream, 'c', {
    value: 3,
    configurable: false
});
 //throws a TypeError
Object.defineProperty(dream, 'c', {
    configurable: true
});
 //throws a TypeError
Object.defineProperty(dream, 'c', {
    writable: true
});
 //won't throws a TypeError
Object.defineProperty(dream, 'c', {
    writable: false
});
delete dream.c; // 属性不可以被删除
console.log(dream.c); // 3 
```
+ **get** 一个给属性提供`getter`的方法,如果没有`getter`则为`undefined`;该方法返回值被用作属性值,默认为undefined.
+ **set** 一个给属性提供`setter`的方法,如果没有`setter`则为`undefined`;该方法将接受唯一参数,并将该参数的新值分配给该属性,默认为undefined.
知道了这些之后我们就可以使用更标准的一种方式去解决我们在文中开头的问题了:
```javascript
Object.defineProperty(dreamapple, 'fullName', {
    enumerable: true,
    get: function () {
        return this.firstName + ' ' + this.lastName;
    },
    set: function (fullName) {
        var names = fullName.trim().split(' ');
        if (2 === names.length) {
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
});
```
还有一点需要注意的是,`value`和`get,set`是不可以共存的,就是说你定义了`value`后就不能够再定义`get,set`特性了.

好啦,今天的文章就写到这里了,相信大家对于`Object.defineProperty(obj, prop, descriptor)`这个方法应该掌握了;还有一点需要提及的是
其实`Vue.js`的`计算属性`也是在这个函数的基础上进行的一些改进,详情可以看这里[计算属性的奥秘][2].

如果你对这篇文章有什么意见或者建议可以在这里提出来[issues][3]


[1]:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
[2]:http://cn.vuejs.org/guide/reactivity.html#计算属性的奥秘
[3]:https://github.com/dreamapplehappy/hacking-with-javascript/issues/3
