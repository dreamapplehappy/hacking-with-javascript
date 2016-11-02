### 混合类型避免使用`==`比较是否相等

+ `==`符号的强制转换规则

  | Argument Type 1        | Argument Type 2          |Coercions |
  | ------------- |-------------| -----|
  |   null    | undefined | None; always true |
  | null or undefined      | Any other than null or undefined      |   None; always false |
  | Primitive string, number, or boolean | Date object      |    Primitive => number, Date object => primitive (try toString and then valueOf) |
  | Primitive string, number, or boolean | Non-Date object      |    Primitive => number, non-Date object => primitive (try valueOf and then toString) |
  | Primitive string, number, or boolean | Primitive string, number, or boolean      |    Primitive => number |
  
  (翻译版)
  
  | 第一个参数        | 第二个参数         | 强制转换 |
  | ------------- |-------------| -----|
  |   null    | undefined | 没有转换,总是相等的 |
  | null or undefined      | Any other than null or undefined      |   没有转换,总是不相等的 |
  | 原始的字符串,数字,和布尔类型 | 日期类型的对象      |   原始类型的数据转换为数字,日期对象转换为原始类型数据(转换先使用`toString`方法,如果没有就使用`valueOf`方法)  |
  | 原始的字符串,数字,和布尔类型 | 非日期类型的对象      |    原始类型的数据转换为数字,非日期类型的对象转换为原始类型数据(转换先使用`valueOf`方法,如果没有就使用`toString`方法) |
  | 原始的字符串,数字,和布尔类型 | 原始的字符串,数字,和布尔类型     |    原始类型的数据转换为数字 |
  
+ 代码示例:
  
  ```javascript
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
  ```
  [源码](item5/demo.js)
  
------

### 谨记
+ 当使用`==`操作符进行相等的比较操作的时候,如果它的两个参数的类型是不一样的;
  那么`==`会把它们先强制转换为相同类型参数,然后再进行比较。
+ 使用`===`表明你的比较不会涉及任何的隐形的类型转换。
+ 当对不同类型的数据进行比较的时候,你要首先把它们进行显示的类型转换;
  然后再进行比较,这样会使你的程序更加清晰。  