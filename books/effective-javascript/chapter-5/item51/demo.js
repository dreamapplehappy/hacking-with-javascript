// 这种形式一般会用于函数的参数arguments属性
function fn() {
    console.log(arguments);
    console.log([].slice.call(arguments, 0));
    console.log(['array'].concat([].slice.call(arguments)));
}
fn(1, 2, 3);
// { '0': 1, '1': 2, '2': 3 }
// [ 1, 2, 3 ]
// [ 'array', 1, 2, 3 ]