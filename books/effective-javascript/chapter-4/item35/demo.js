function Counter() {
    // count信息只存在于函数的内部,外部无法直接访问
    var count = 0;
    return {
        getCount: function() {
            return count;
        },
        increment: function() {
            count++;
        },
        decrement: function() {
            count--;
        }
    }
}
var counter = Counter();
console.log(counter.getCount()); // 0
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2
counter.decrement();
console.log(counter.getCount()); // 1