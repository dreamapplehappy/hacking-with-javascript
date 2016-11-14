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