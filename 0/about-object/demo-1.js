var dream = {};
Object.defineProperty(dream, 'name', {
    value: 'dreamapple',
    writable: true
});

console.log(dream.name); // dreamapple
dream.name = 'apple'; // 修改name属性
console.log(dream.name); // apple

Object.defineProperty(dream, 'a', {
    value: 1,
    enumerable: false // 不可枚举
});
Object.defineProperty(dream, 'b', {
    value: 2,
    enumerable: true // 可枚举
});

// 只会输出 b
for(prop in dream) {
    console.log(prop);
}

console.log(Object.keys(dream)); // ['b']

console.log(dream.propertyIsEnumerable('a')); // false
console.log(dream.propertyIsEnumerable('b')); // true

Object.defineProperty(dream, 'c', {
    value: 3,
    configurable: false
});
// //throws a TypeError
//Object.defineProperty(dream, 'c', {
//    configurable: true
//});
// //throws a TypeError
//Object.defineProperty(dream, 'c', {
//    writable: true
//});
// //won't throws a TypeError
//Object.defineProperty(dream, 'c', {
//    writable: false
//});

delete dream.c; // 属性不可以被删除
console.log(dream.c); // 3

//Object.defineProperty(dream, 'c', {
//    writable: true,
//    configurable: true
//});
////Object.defineProperty(dream, 'c', {
////    writable: true
////});
////Object.defineProperty(dream, 'c', {
////    writable: false
////});

