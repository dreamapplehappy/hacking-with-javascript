// 函数名尽量能够表达我们的意思
// 参数的顺序,名字符合习惯的约定
function Rectangle(width, height) {
    this.width = width;
    this.height = height;
}

var rect = new Rectangle(10, 20);
console.log(rect); // Rectangle { width: 10, height: 20 }