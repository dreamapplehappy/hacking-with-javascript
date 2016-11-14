function test() {
    // arguments 是类数组对象
    console.log(arguments); // { '0': 1, '1': 2, '2': 3 }
    // 判断arguments的类型
    console.log(typeof arguments); // object
    // 判断是否是数组
    console.log(Array.isArray(arguments)); // false
    // 判断arguments是什么类型的对象
    console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
}
test(1, 2, 3);