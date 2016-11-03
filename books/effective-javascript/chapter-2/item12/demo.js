// 因为变量提升 所以不会有报错
console.log(test); // undefined

// 相当于把 var test提升到顶部 赋值部分 test = 1 还是在原来的位置;
// 如果把下面这句话注释掉的话,上面的语句就会报错。
var test = 1;