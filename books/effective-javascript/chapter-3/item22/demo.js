// 多参数函数
function multArgsFunc() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

console.log(multArgsFunc(1, 2, 3, 4)); // 10
console.log(multArgsFunc(1, 2, 3, 4, 5)); // 15

