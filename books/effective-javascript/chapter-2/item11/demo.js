// 我们利用闭包构建一个简单的容器
function Container() {
    var store = [];
    return {
        getItem: function(index) {
            return store[index];
        },
        addItem: function(obj) {
            var index = store.push(obj);
            return index - 1;

        },
        length: function() {
            return store.length;
        }
    }
}

var c = Container();
console.log(c.length()); // 0
var index1 = c.addItem({name: 'dreamapple'});
console.log(index1); // 0
console.log(c.length()); // 1
console.log(c.getItem(index1)); // Object {name: "dreamapple"}