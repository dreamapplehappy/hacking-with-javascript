var buffer = {
    entries: [],
    add: function(value) {
        this.entries.push(value);
    },
    join: function() {
        return this.entries.join("");
    }
};

var input = ['137', '-', '4526', '-', '3980'];
//input.forEach(buffer.add); // Cannot read property 'push' of undefined

// forEach函数可以让我们添加一个函数的接受者
input.forEach(buffer.add, buffer);
console.log(buffer.join()); // 137-4526-3980

// 最好的办法就是我们直接使用bind
input.forEach(buffer.add.bind(buffer));
console.log(buffer.join()); // 137-4526-3980 (要注释掉上面的部分,不然结果就是: 137-4526-3980137-4526-3980)