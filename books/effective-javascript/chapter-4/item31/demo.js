var obj = Object.create(null);
console.log('__proto__' in obj); // false
console.log(Object.getPrototypeOf(obj)); // null

// 可以使用 __proto__属性来模仿 Object.getPropertyOf() 函数
if('undefined' === typeof Object.getPrototypeOf) {
    Object.getPrototypeOf = function(obj) {
        var t = typeof obj;
        if(!obj || (t !== 'object' && t !== 'function')) {
            throw new Error('not an object');
        }
        return obj.__proto__;
    }
}