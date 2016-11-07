// 使用apply
function compute() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

function wrapper(arr) {
    return compute.apply(null, arr); // 给compute函数传递多个参数
}

var arr = [1, 2, 3, 4, 5];
console.log(wrapper(arr)); // 15