function curryingHelper(fn) {
    var _args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var _newArgs = Array.prototype.slice.call(arguments);
        var _totalArgs = _args.concat(_newArgs);
        return fn.apply(this, _totalArgs);
    }
}

function showMsg(name, age, fruit) {
    console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
}
//
//var curryingShowMsg1 = curryingHelper(showMsg, 'dreamapple');
//curryingShowMsg1(22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
//
//var curryingShowMsg2 = curryingHelper(showMsg, 'dreamapple', 20);
//curryingShowMsg2('watermelon'); // My name is dreamapple, I'm 20 years old,  and I like eat watermelon

function betterCurryingHelper(fn, len) {
    var length = len || fn.length;
    return function () {
        var allArgsFulfilled = (arguments.length >= length);

        if (allArgsFulfilled) {
            return fn.apply(this, arguments);
        }
        else {
            var argsNeedFulfilled = [fn].concat(Array.prototype.slice.call(arguments));
            return betterCurryingHelper(curryingHelper.apply(this, argsNeedFulfilled), length - arguments.length);
        }
    };
}

var betterShowMsg = betterCurryingHelper(showMsg);
betterShowMsg('dreamapple', 22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
betterShowMsg('dreamapple', 22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
betterShowMsg('dreamapple')(22, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
betterShowMsg('dreamapple')(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple


//function add(a, b) {
//    return a + b;
//}
//
//function curryingAdd(a) {
//    return function(b) {
//        return a + b;
//    }
//}
//
//add(1, 2); // 3
//curryingAdd(1)(2); // 3


//function printInfo(name, song) {
//    console.log(name + '喜欢的歌曲是: ' + song);
//}
//printInfo('Tom', '七里香');
//printInfo('Jerry', '雅俗共赏');
//
//
//function curryingPrintInfo(name) {
//    return function(song) {
//        console.log(name + '喜欢的歌曲是: ' + song);
//    }
//}
//var tomLike = curryingPrintInfo('Tom');
//tomLike('七里香');
//var jerryLike = curryingPrintInfo('Jerry');
//jerryLike('雅俗共赏');