function hello() {
    console.log('Hello, World');
}
// 函数的调用
hello(); // Hello, World

var obj = {
    welcome: function() {
        console.log('Hello, ' + this.name);
    },
    name: 'dreamapple'
};
// 方法调用
obj.welcome(); // Hello, dreamapple

function Student(name, age) {
    this.name = name;
    this.age = age;
    console.log('My name is ' + this.name + ', and my age is ' + this.age);
}
// 构造函数的调用
var s = new Student('dreamapple', 23); // My name is dreamapple, and my age is 23
