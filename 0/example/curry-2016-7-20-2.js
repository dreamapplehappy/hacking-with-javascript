var _ = {};
function crazyCurryingHelper(fn, length, args, holes) {
    length = length || fn.length;
    args   = args   || [];
    holes  = holes  || [];

    return function() {
        var _args       = args.slice(),
            _holes      = holes.slice();

        // 存储接收到的args和holes的长度
        var argLength   = _args.length,
            holeLength  = _holes.length;

        var allArgumentsSpecified = false;

        // 循环
        var arg     = null,
            i       = 0,
            aLength = arguments.length;

        for(; i < aLength; i++) {
            arg = arguments[i];

            if(arg === _ && holeLength) {
                // 循环holes的位置
                holeLength--;
                _holes.push(_holes.shift());
            } else if (arg === _) {
                // 存储hole就是_的位置
                _holes.push(argLength + i);
            } else if (holeLength) {
                // 是否还有没有填补的hole
                // 在参数列表指定hole的地方插入当前参数
                holeLength--;
                _args.splice(_holes.shift(), 0, arg);
            } else {
                // 不需要填补hole,直接添加到参数列表里面
                _args.push(arg);
            }
        }

        // 判断是否所有的参数都已满足
        allArgumentsSpecified = (_args.length >= length);
        if(allArgumentsSpecified) {
            return fn.apply(this, _args);
        }

        // 递归的进行柯里化
        return crazyCurryingHelper.call(this, fn, length, _args, _holes);
    };
}

function showMsg(name, age, fruit) {
    console.log('My name is ' + name + ', I\'m ' + age + ' years old, ' + ' and I like eat ' + fruit);
}

var crazyShowMsg = crazyCurryingHelper(showMsg);
crazyShowMsg(_, 22)('dreamapple')('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg( _, 22, 'apple')('dreamapple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg( _, 22, _)('dreamapple', _, 'apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg( 'dreamapple', _, _)(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple
crazyShowMsg('dreamapple')(22)('apple'); // My name is dreamapple, I'm 22 years old,  and I like eat apple