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

当然更好的一种方法就是使用`Object.defineProperty()`这个函数了,下面我们就来好好的探讨一下这个函数.







