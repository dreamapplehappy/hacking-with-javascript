### 不要重用父类的属性名

```javascript
// 定义一个父类
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.id = 0;
}

Person.prototype.sayHello = function() {
    console.log('My name is ' + this.name + ' and my age is ' + this.age);
};

// 定义我们的子类
function Student(name, age, school) {
    Person.call(this, name, age);
    this.school = school;
    this.id = 10;
}
// 将子类与父类的原型关联
Student.prototype = Object.create(Person.prototype);
// 定义子类的公用方法
Student.prototype.getSchool = function() {
    console.log('My school is ' + this.school);
};
// 子类的方法会覆盖掉父类的方法
Student.prototype.sayHello = function() {
    console.log('hello');
};

var stu = new Student('dreamapple', 22, 'Happy');
stu.getSchool(); // My school is Happy
// 父类的方法被覆盖
stu.sayHello(); // hello
// 属性覆盖
console.log(stu.id); // 10
```
[源码](item39/demo.js)

------

### 谨记
+ **留意父类使用的属性名。**
+ **不要再子类中重用父类的属性名,除非你想重写那个属性或者方法。**