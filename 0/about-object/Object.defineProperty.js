var age = 33;
var obj = {};
obj.name = 'dreamapple';

//Object.prototype.get = function(){}; 重点

Object.defineProperty(obj, 'age', {
    //value: null,
    enumerable: true,
    configurable: false,
    //writable: false,
    get: function() {
        return age;
    },
    set: function(value) {
        console.log('set', value);
        age = value + 1;
    }
});

console.log(obj);

delete obj.name;
obj.age = 30;

delete obj.age;

console.log(obj, obj.age);

