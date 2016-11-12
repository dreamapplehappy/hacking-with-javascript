// 创建一个类
function Student(name, age) {
    this.name = name;
    this.age = age;
}
// 创建原型
Student.prototype.info = function() {
    console.log('My name is ' + this.name + ' and my age is ' + this.age);
};
// C.prototype == new C().__proto_   C.prototype == Object.getPrototypeOf(new C())

var s = new Student('dreamapple', 22);
s.info(); // My name is dreamapple and my age is 22

console.log(Student.prototype === s.__proto__); // true
console.log(Student.prototype === Object.getPrototypeOf(s)); // true
