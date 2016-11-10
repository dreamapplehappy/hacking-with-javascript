function sayHello(name, words) {
    console.log('Hello, ' + name + words);
}

// 将函数与其参数的一个子集绑定的技术称为函数的柯里化
function sayHelloToDr(words) {
    //sayHello('dreamapple', words);
    // 使用bind
    sayHello.bind(null, 'dreamapple', words)();
}

sayHello('dreamapple', ' happy'); // Hello, dreamapple happy
sayHello('dreamapple1', ' happy1'); // Hello, dreamapple1 happy1

sayHelloToDr(' a nice day'); // Hello, dreamapple a nice day
sayHelloToDr(' nice to meet you'); // Hello, dreamapple nice to meet you