console.log('1.0e0' == {valueOf: function() {return true}}); // true
console.log(1 == {toString: function() {return true}}); // true

var date = new Date('1999/9/19');
var dateStr = date.toString(); // Sun Sep 19 1999 00:00:00 GMT+0800 (CST)
console.log(date == '1999/9/19'); // false
console.log(dateStr == 'Sun Sep 19 1999 00:00:00 GMT+0800 (CST)'); // true

function toYMD(date) {
    var y = date.getYear() + 1900; // year is 1900-indexed
    var m = date.getMonth() + 1; // month is 0-indexed
    var d = date.getDate();
    return y + '/' + (m < 10 ? '0' + m : m) + '/' + (d < 10 ? '0' + d : d);
}

console.log(toYMD(date)); // 1999/09/19

var birthday = new Date('2000/11/11');
console.log(toYMD(birthday) == '2000/11/11'); // true

// 判断两个数据是否相等的时候,首先把它们强制转换为同一种类型的数据,然后再进行比较。
var price = '15';
console.log(+price === 15); // true