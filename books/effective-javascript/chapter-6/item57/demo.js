function Rectangle(width, length) {
    this.width = width;
    this.length = length;
}
Rectangle.prototype.getArea = function() {
    return this.width * this.length;
};

// 我们可以使用结构类型
function rectangle1(width, length) {
    var _width = width,
        _length = length;
    return {
        getArea: function() {
            return _width * _length;
        }
    }
}

var r1 = new Rectangle(100, 200);
console.log(r1.getArea()); // 20000
var r2 = rectangle1(100, 200);
console.log(r2.getArea()); // 20000