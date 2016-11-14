function square(x) {
    // 这里会进行强制的类型转换
    return x * x;
}
console.log(square('3')); //

// 一种比较好的方式,我们在函数内部判断参数是否是一个数字
function square1(x) {
    if('number' === typeof x) {
        return x * x;
    }
    throw new Error('请传递正确的参数类型!');
}
console.log(square1('3')); // Error: 请传递正确的参数类型!