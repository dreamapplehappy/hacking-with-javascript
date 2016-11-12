// 实现一个简单的树形结构L类
// @1 错误的实现方式
function Tree(value) {
    this.value = value
}
Tree.prototype = {
    children: [],
    addChild: function(value) {
        this.children.push(value);
    }
};
var left = new Tree(1);
left.addChild(2);
left.addChild(3);
console.log(left.children); // [ 2, 3 ]
var right = new Tree(4);
right.addChild(5);
right.addChild(6);
var top = new Tree(7);
top.addChild(left);
top.addChild(right);
console.log(left.children); // [ 2, 3, 5, 6, { value: 1 }, { value: 4 } ]
console.log(top.children); // [ 2, 3, 5, 6, { value: 1 }, { value: 4 } ]

// @2 正确的实现方式 将状态存储在每个实例中
function Tree1(value) {
    this.value = value;
    this.children = []
}
Tree1.prototype = {
    addChild: function(value) {
        this.children.push(value);
    }
};
var left1 = new Tree1(1);
left1.addChild(2);
left1.addChild(3);
console.log(left1.children); // [ 2, 3 ]
var right1 = new Tree1(4);
right1.addChild(5);
right1.addChild(6);
var top1 = new Tree1(7);
top1.addChild(left1);
top1.addChild(right1);
console.log(left1.children); // [ 2, 3 ]
console.log(top1.children); // [ { value: 1, children: [ 2, 3 ] },{ value: 4, children: [ 5, 6 ] } ]
