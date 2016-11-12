### 在原型中存储方法

```javascript
function User(name, age) {
    // 一般属性
    this.name = name;
    this.age = age;
    // 在实例属性上的方法
    this.getName = function() {
        console.log('My name is ' + this.name);
        return this.name;
    }
}
// 在原型上的方法
User.prototype.getAge = function() {
    console.log('My age is ' + this.age);
    return this.age;
};

var user = new User('dreamapple', 22);
// 方法 getAge 在User的原型上
console.log(user); // User { name: 'dreamapple', age: 22, getName: [Function] }

user.getName(); // My name is dreamapple
user.getAge(); // My age is 22
```
[源码](item34/demo.js)

------

### 谨记
+ **将方法存储在实例对象中将创建函数的多个副本,因为每个实例对象都有一份副本。**
+ **将方法存储于原型中优于存储在实例对象中。**