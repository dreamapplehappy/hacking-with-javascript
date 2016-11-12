### 在子类的构造函数中调用父类的构造函数

```javascript
// 定义一个父类
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayHello = function() {
    console.log('My name is ' + this.name + ' and my age is ' + this.age);
};

// 定义我们的子类
function Student(name, age, school) {
    Person.call(this, name, age);
    this.school = school;
}
// 将子类与父类的原型关联
Student.prototype = Object.create(Person.prototype);
// 定义子类的公用方法
Student.prototype.getSchool = function() {
    console.log('My school is ' + this.school);
};

var stu = new Student('dreamapple', 22, 'Happy');
stu.getSchool(); // My school is Happy
stu.sayHello(); // My name is dreamapple and my age is 22
```
[源码](item38/demo.js)

------

### 谨记
+ **在子类的构造函数中显式地传入`this`作为显式的接受者调用父类构造函数。**
+ **使用`Object.create()`函数来构造子类的原型对象以避免调用父类的构造函数。**