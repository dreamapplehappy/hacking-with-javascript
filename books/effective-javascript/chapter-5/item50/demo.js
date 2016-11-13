// 传统的循环需要我们手动控制循环的条件,易出错
var arr = [1, 2, 3, 5];
for(var i = 0, n = arr.length; i < n; i++) {
    console.log(arr[i]);
}
// 我们可以使用数组的forEach替代,更方便一些
arr.forEach(function(val, index) {
    console.log(val, index);
});
// 我们可以产生一个新的数组
var arr1 = arr.map(function(val, index) {
    return ++val;
});
console.log(arr1); // [ 2, 3, 4, 6 ]

// 我们可以过滤数组中的一些值
var arr2 = arr.filter(function(val) {
    return val > 2;
});
console.log(arr2); // [ 3, 5 ]

// 使用some every方法提前终止循环
console.log(arr.some(function(val, index) {
    console.log(index);
    return val > 2;
}));

console.log(arr.every(function(val, index) {
    console.log(index);
    return val > 2;
}));

// 当然我们可以自己添加自己的方法,比如一个简单的类似map的方法
Array.prototype.likeMap = function(fn) {
    var result = [];
    for(var i = 0, n = this.length; i < n; i++) {
        result[i] = fn(this[i], i);
    }
    return result;
};

var arr3 = arr.likeMap(function(val) {
    return val + 10;
});
console.log(arr3); // [ 11, 12, 13, 15 ]