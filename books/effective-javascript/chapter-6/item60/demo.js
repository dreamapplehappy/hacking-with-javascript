// 有状态的方法
function Counter(value) {
    this.value = value;
}
Counter.prototype.increment = function() {
    this.value++;
    return this;
};

var c = new Counter(0);
c.increment()
 .increment()
 .increment();

console.log(c.value); // 3

// 无状态的方法
Array.prototype.myMap = function(fn) {
    if('function' === typeof fn) {
        var result = [];
        for(var i = 0; i < this.length; i++) {
            result[i] = fn(this[i])
        }
        return result;
    }
};

function testMyMap(val) {
    return val + 3;
}

var arr1 = [1, 2, 3].myMap(testMyMap)
                    .myMap(testMyMap)
                    .myMap(testMyMap);
console.log(arr1); // [ 10, 11, 12 ]
