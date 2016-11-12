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