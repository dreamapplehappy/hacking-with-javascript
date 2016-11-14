// 我们应该判断参数是否是undefined来决定是否使用默认值
function Element(width, height) {
    this.width = width === undefined ? 100 : width;
    this.height = height === undefined ? 100 : height;
}

var ele = new Element();
console.log(ele); // Element { width: 100, height: 100 }
var ele1 = new Element(20);
console.log(ele1); // Element { width: 20, height: 100 }
var ele2 = new Element(20, 30);
console.log(ele2); // Element { width: 20, height: 30 }