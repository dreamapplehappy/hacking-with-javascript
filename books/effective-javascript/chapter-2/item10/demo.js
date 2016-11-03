// 使用with往往是比较慢的
console.time('use with');
with(Math) {
    console.log(min(1, 2));
    console.log(max(3, 2));
    console.log(ceil(2.5));
}
console.timeEnd('use with');

// 直接使用
console.time('without with');
console.log(Math.min(1,2));
console.log(Math.max(3,2));
console.log(Math.ceil(2.5));
console.timeEnd('without with');

// 运行结果如下 可以看到使用with速度慢了好多倍
// 1
// 3
// 3
// use with: 3.76ms
// 1
// 3
// 3
// without with: 0.397ms