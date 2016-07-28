// showMsg
function showMsg(name, age, gender) {
    var msg = 'My name is ' + name + ' ,my age is ' + age + ' ,my gender is ' + gender;
    console.log(msg);
    return msg;
}

// 初级柯里化
curryHelper(showMsg)('dreamapple' ,22, 'man');
curryHelper(showMsg, 'dreamapple')(22, 'man');
curryHelper(showMsg, 'dreamapple', 22)('man');
curryHelper(showMsg, 'dreamapple', 22, 'man')();

betterCurry(showMsg)('dreamapple')(22)('man');
//betterCurry(showMsg)('dreamapple', 22)('man');
//betterCurry(showMsg)('dreamapple', 'man')(22);

// curryHelper
function curryHelper(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
        var newArgs = Array.prototype.slice.call(arguments);
        var totalArgs = args.concat(newArgs);
        return fn.apply(this, totalArgs);
    }
}
// betterCurry
function betterCurry(fn, len) {
    len = len || fn.length;
    return function() {
        var argsEqual = (arguments.length >= len);
        if(argsEqual) {
            return fn.apply(this, arguments);
        }
        var args = Array.prototype.slice.call(arguments);
        var newArgs = [fn].concat(args);
        return betterCurry(curryHelper.apply(this, newArgs), len - arguments.length);
    }
}
// bestCurry
var k = 0;
function curry(fn, length, args, holes) {
    length = length || fn.length;
    args   = args   || [];
    holes  = holes  || [];

    return function() {
        var _args       = args.slice(),
            _holes      = holes.slice();

        // Store the length of the args and holes received
        var argLength   = _args.length,
            holeLength  = _holes.length;

        var allArgumentsSpecified = false;

        // Loop vars
        var arg     = null,
            i       = 0,
            aLength = arguments.length;
        //console.log('xxxxxxxxxxxxxxx-->' + k++, aLength, holeLength, argLength, '参数长度!');

        for(; i < aLength; i++) {
            arg = arguments[i];

            if(arg === _ && holeLength) {
                holeLength--;
                var _h = _holes.shift();
                _holes.push(_h);
            } else if (arg === _) {
                _holes.push(argLength + i);
            } else if (holeLength) {
                holeLength--;
                var _hc = _holes.shift();
                _args.splice(_hc, 0, arg);
            } else {
                _args.push(arg);
            }
        }

        allArgumentsSpecified = (_args.length >= length);
        if(allArgumentsSpecified) {
            console.log(_args, 'all');
            return fn.apply(this, _args);
        }

        // keep currying
        return curry.call(this, fn, length, _args, _holes);
    };
}
function ar(a, b, c, d, e, f){}
var _ = {};
var a = curry(showMsg);
a('man')('dreamapple',_,_)(_,22,_);
a(_,22,_)(_,_,'man')('dreamapple',_,_);
//a('dreamapple',_,_)(_,22,_)(_,_,'man');
//a('dreamapple',22,_)(_,_,'man');
//a('dreamapple')(_,22)(_,_,'man');
//a(_,22)('dr')(_,_,'man');
