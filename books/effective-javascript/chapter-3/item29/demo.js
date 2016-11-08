function func() {
    //'use strict'; 严格模式下,下面的语句会报错
    console.log(arguments.callee, arguments.caller);
}

function sayHi() {
    func();
}

sayHi(); // [Function: func] undefined

// 简易的栈追踪
function traceStack() {
    var stack = [];
    for(var f = traceStack.caller; f; f = f.caller) {
        stack.push(f);
    }
    return stack;
}

function f1() {
    return traceStack();
}

function f2() {
    return f1();
}

console.log(f2()); // [ [Function: f1], [Function: f2]](chrome浏览器环境下)

// 递归的调用将会进入一个死循环
function f3(n) {
    return n === 0 ? traceStack() : f3(n-1);
}
//console.log(f3(1)); // infinite loop 死循环
