// 命名的函数表达式
var f = function func() {
    // func的作用域只是在本函数内部,在外部不可访问
    console.log(f);
    console.log(func);
};
console.log(f);
// console.log(func); // func is not defined

// 所以尽量使用匿名的函数表达式

function constructor() {
    return null;
}

var func1 = function func2() {
    return constructor();
};

console.log(func1()); // null