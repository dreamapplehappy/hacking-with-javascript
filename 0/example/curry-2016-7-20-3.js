//function sum(x){
//    var y = function(x){
//        return sum(x+y)
//    };
//    y.toString = y.valueOf = function(){
//        return x;
//    };
//    return y;
//}
//
//console.log(sum(1)(2)(3)(4)(5));

//function f1(x, y) {
//    return x + y;
//}
//
//function f2(x) {
//    return x * x;
//}
//
//function func3(func1, func2) {
//    return function() {
//        return func2.call(this, func1.apply(this, arguments));
//    }
//}
//
//var f3 = func3(f1, f2);
//console.log(f3(2, 3)); // 25


// 一个将函数的arguments对象变成一个数组的方法
function array(a, n) {
    return Array.prototype.slice.call(a, n || 0);
}
// 我们要运行的函数
function showMsg(a, b, c){
    return a * (b - c);
}

function partialLeft(f) {
    var args = arguments;
    return function() {
        var a = array(args, 1);
        a = a.concat(array(arguments));
        console.log(a); // 打印实际传递到函数中的参数列表
        return f.apply(this, a);
    }
}

function partialRight(f) {
    var args = arguments;
    return function() {
        var a = array(arguments);
        a = a.concat(array(args, 1));
        console.log(a); // 打印实际传递到函数中的参数列表
        return f.apply(this, a);
    }
}

function partial(f) {
    var args = arguments;
    return function() {
        var a = array(args, 1);
        var i = 0; j = 0;
        for(; i < a.length; i++) {
            if(a[i] === undefined) {
                a[i] = arguments[j++];
            }
        }
        a = a.concat(array(arguments, j));
        console.log(a); // 打印实际传递到函数中的参数列表
        return f.apply(this, a);
    }
}


partialLeft(showMsg, 1)(2, 3); // 实际参数列表: [1, 2, 3] 所以结果是 1 * (2 - 3) = -1
partialRight(showMsg, 1)(2, 3); // 实际参数列表: [2, 3, 1] 所以结果是 2 * (3 - 1) = 4
partial(showMsg, undefined, 1)(2, 3); // 实际参数列表: [2, 1, 3] 所以结果是 2 * (1 - 3) = -4

console.log(partialLeft(showMsg, 1)(2, 3));
console.log(partialRight(showMsg, 1)(2, 3));
console.log(partial(showMsg, undefined, 1)(2, 3));










