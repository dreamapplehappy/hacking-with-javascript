// 强大的eval函数
function f() {
    eval('var a = 2');
    return a;
}

console.log(f()); // 2

// 在函数内部使用eval很危险,这赋予了外部的调用者改变函数内部的作用域的能力
function g(str) {
    var a = 1;
    eval(str);
    return a;
}

console.log(g('var a = 12')); // 12
console.log(g('var a = 0')); // 0

// 解决的办法就是使用一个立即执行的函数进行包裹,创建一个独立的作用域

function g1(str) {
    var a = 1;
    (function() {
        eval(str);
    })();
    return a;
}
console.log(g1('var a = 12')); // 1
console.log(g1('var a = 0')); // 1