console.log((function(x) {
    return x + 1;
}).toString());
/*
 * 输出结果
 * function (x) {
 *  return x + 1;
 * }
 * */

console.log((function(x) {
    return x + 1;
}).bind(10).toString());
/*
 * function () { [native code] }
 * */

console.log((function(x) {
    return function(y) {
        return x + y;
    }
}).bind(20).toString());
/*
 * function () { [native code] }
 * */