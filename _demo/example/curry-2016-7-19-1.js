// 要解决callee /caller问题
var add = function() {
    var _this = this,
        _args = arguments
    return function() {
        if (!arguments.length) {
            var sum = 0;
            for (var i = 0,
                     c; c = _args[i++];) sum += c
            return sum
        } else {
            Array.prototype.push.apply(_args, arguments)
            return arguments.callee
        }
    }
}
add(1)(2)(3)(4)();//10

function addHelper() {
    var _args = arguments;
    return function() {
        if(!arguments.length) {
            var result = 0;
            for(var i = 0, c; c = _args[i++];) {
                result += c;
            }
            console.log(result);
            return result;
        }
        else {
            Array.prototype.push.apply(_args, arguments);
            return arguments.callee;
        }
    }
}

addHelper(1)(2)(3)(4);
var a = [1, 2];
a.splice(2, 0, 'happy')
console.log(a);