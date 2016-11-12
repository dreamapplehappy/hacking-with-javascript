### 认识到`this`变量的隐式绑定问题

```javascript
function CSVReader(separators) {
    this.separators = separators || [','];
    this.regexp = new RegExp(this.separators.map(function(separator) {
        return '\\' + separator[0];
    }).join('|'));
}
CSVReader.prototype.read = function(str) {
    var lines = str.trim().split(/\n/);
    // @1 使用map函数的第二个参数绑定this
    //return lines.map(function(line) {
    //    console.log(this); //
    //    return line.split(this.regexp);
    //}, this); // 如果这里不绑定this的话,上面的this.regexp中的this指的就是window

    // @2 使用变量绑定this
    //var that = this;
    //return lines.map(function(line) {
    //    return line.split(that.regexp);
    //});

    // @3
    return lines.map(function(line) {
        return line.split(this.regexp);
    }.bind(this));
};

var reader = new CSVReader();
console.log(reader.regexp); // /\,/
console.log(reader.read('a,b,c\nd,e,f\n')); // [ [ 'a', 'b', 'c' ], [ 'd', 'e', 'f' ] ]
```
[源码](item37/demo.js)

------

### 谨记
+ **`this`变量的作用域总是由其最近的封闭函数所确定。**
+ **使用一个局部变量(通常命名为`self`,`me`或`that`),使得`this`绑定对于内部函数是可用的。**