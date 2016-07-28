//function multiply(x) {
//    var y = function(x) {
//        return multiply(x * y);
//    };
//    y.toString = y.valueOf = function() {
//        return x;
//    };
//    return y;
//}
//
////console.log(multiply(1)(2)(3)); // true
////console.log(multiply(1)(2)(3)(4)(5) == 120); // true
//
//function add() {
//    var args = Array.prototype.slice.call(arguments);
//    var _that = this;
//    return function() {
//        var newArgs = Array.prototype.slice.call(arguments);
//        var total = args.concat(newArgs);
//        if(!arguments.length) {
//            var result = 1;
//            for(var i = 0; i < total.length; i++) {
//                result *= total[i];
//            }
//            return result;
//        }
//        else {
//            return add.apply(_that, total);
//        }
//    }
//}
//add(1)(2)(3)(); // 6
//add(1, 2, 3)(); // 6
//
//console.log(add(1)(2)(3)());
//console.log(add(1.1)(2.2)(3.3)());
//console.log(add(1, 2, 3)());

var curry = function(fn) {
    var _args = []
    return function cb() {
        if (arguments.length == 0) {
            return fn.apply(this, _args)
        }
        Array.prototype.push.apply(_args, arguments);
        return cb;
    }
}

function add() {
    var res = 0;
    for(var i = 0; i < arguments.length; i++) {
        res += arguments[i];
    }
    return res;
}

console.log(curry(add)(1)(2)(3)());