// basic
function describe(fruit) {
    return function (name) {
        var msg = name + ' like eat ' + fruit + '.';
        console.log(msg);
        return msg;
    }
}

var appleLiker = describe('apple');
appleLiker('Dreamapple');
appleLiker('Tom');

// advanced
function curryHelper(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var newArgs = Array.prototype.slice.call(arguments);
        var allArgs = args.concat(newArgs);
        return fn.apply(this, allArgs);
    }
}

function show(name, fruit, where) {
    var msg = name + ' like ' + where + ' ' + fruit + '!';
    console.log(msg);
    return msg;
}

// the same output
curryHelper(show, 'Jarry')('apple', 'Hangzhou');
curryHelper(show, 'Jarry', 'apple')('Hangzhou');
curryHelper(show, 'Jarry', 'apple', 'Hangzhou')();

// the better curry
function betterCurry(fn, length) {
    length = length || fn.length;
    return function () {
        var allArgumentsSpecified = (arguments.length >= length);
        if (allArgumentsSpecified) {
            return fn.apply(this, arguments);
        }
        console.log([fn], 1);
        var partial = [fn].concat(Array.prototype.slice.call(arguments));
        console.log(partial, 2);
        return betterCurry(curryHelper.apply(this, partial), length - arguments.length);
    };
}

betterCurry(show)('a')('b')('c');
betterCurry(show)('a', 'b')('c');
betterCurry(show)('a')('b', 'c');



