function C(name) {
    this.name = name;
}
// 添加枚举属性的方法
C.prototype.allKeys = function() {
    var result = [];
    for(var key in this) {
        result.push(key);
    }
    return result;
};
console.log(new C('dreamapple').allKeys()); // [ 'name', 'allKeys' ]
// 在原型上添加的方法也会被枚举出来,不是我们想要的结果
// 当然我们可以使用 Object.hasOwnProperty() 方法来实现

// 我们可以使用一个函数替代在Object.prototype上添加方法
function allKeys(obj) {
    var result = [];
    for(var key in obj) {
        result.push(key);
    }
    return result;
}
// 这种方法不会产生污染,达到了我们想要的效果
console.log(allKeys(new C('dream'))); // [ 'name', 'allKeys' ]


// 使用 Object.defineProperty() 方法来定义一个不可枚举的属性方法

var c1 = new C('c1');
Object.defineProperty(c1, 'newAllKeys', {
    value: function() {
        var result = [];
        for(var key in this) {
            result.push(key);
        }
        return result;
    },
    writable: true,
    enumerable: false,
    configurable: true
});

// 没有添加新的属性,达到了我们需要的效果
console.log(c1.newAllKeys()); // [ 'name', 'allKeys' ]

// 当然我们也可以在Object.prototype对象上添加这个方法 达到共用的效果
// Object.defineProperty(Object.prototype, 'newAllKeys', {});
