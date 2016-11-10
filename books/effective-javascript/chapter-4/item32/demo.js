function User(name) {
    this.name = name;
}

var user = new User('dreamapple');

console.log(user); // User { name: 'dreamapple' }

console.log(user.__proto__);
/* Object
    constructor:User(name)
    __proto__:Object
*/

// 使用user对象的原型 通过使用Object.create()方法创建一个新的对象
var user1 = Object.create(Object.getPrototypeOf(user));

console.log(user1); // User {}

// 永远不要修改 __proto__ 属性
user1.__proto__ = {}; // X