### 避免不必要的状态

```javascript
// 无状态的API
console.log('hello'.toUpperCase()); // HELLO

// 定义一个类名 和一个有状态的方法
function User(name, age) {
    this.name = name;
    this.age = age;
}
User.prototype.setAge = function(age) {
    this.age = age;
};
// 无状态的方法,取决于给对象的age
User.prototype.sayHello = function() {
    if(this.age > 60) {
        console.log('I am old.');
    }
    else {
        console.log('I am young.');
    }
};

var u1 = new User('dream', 20);
u1.sayHello(); // I am young.
u1.setAge(80);
u1.sayHello(); // I am old.
```
[源码](item56/demo.js)

------

### 谨记
+ **尽可能使用无状态的API。**
+ **如果API是有状态的,标示出每个操作与那些状态有关联。**