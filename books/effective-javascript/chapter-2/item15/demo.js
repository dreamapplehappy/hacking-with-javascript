function g() {
    return 'outer';
}

function f(flag) {
    var result = [];
    function g() {
        return 'inner';
    }
    if(flag) {
        result.push(g());
    }
    result.push(g());
    return result;
}

console.log(f(true)); // [ 'inner', 'inner' ]
console.log(f(false)); // [ 'inner' ]

function f1(flag) {
    var result = [];
    //function g() {
    //    return 'inner';
    //}
    if(flag) {
        function g() {
            return 'inner';
        }
        result.push(g());
    }
    result.push(g());
    return result;
}

console.log(f1(true)); // [ 'inner', 'inner' ]
// console.log(f1(false)); // g is not a function 产生了局部快作用域

// 下面是比较正确的做法
function f2(flag) {
    var result = [];
    var g1 = g;
    if(flag) {
        g1 = function() {
            return 'inner';
        };
        result.push(g1());
    }
    result.push(g1());
    return result;
}

console.log(f2(true)); // [ 'inner', 'inner' ]
console.log(f2(false)); // [ 'outer' ]