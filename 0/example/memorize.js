function memorize(fn) {
    var cache = {};
    var _that = this;
    return function() {
        var key = arguments.length + Array.prototype.join.call(arguments, ',');
        if(key in cache) {
            return cache[key];
        }
        else {
            return fn.apply(_that, arguments);
        }
    }
}

function hello() {
    console.log(1);
}

var a = memorize(function(n) {
    return (n <= 1) ? 1 : n * a(n-1);
});

console.log(a(10));