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