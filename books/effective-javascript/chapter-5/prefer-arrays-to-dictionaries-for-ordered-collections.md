### 使用数组而不要使用字典来存储有序集合

```javascript
var info = {
    'name': 'dream',
    '1': '10',
    'A': function() {}
};

for(var i in info) {
    console.log(i + ' : ' + info[i]);
}
// 输出结果如下, 并不是按照顺序输出的
// 1 : 10
// name : dream
// A : function () {}

// 按照顺序的输出要使用数组
var info1 = [
    {name: 'dream'},
    {'1': '10'},
    {'A': function() {}}
];

for(var i = 0; i < info1.length; i++) {
    for(var j in info1[i]) {
        if(Object.hasOwnProperty.call(info1[i], j)) {
            console.log(j + ' : ' + info1[i][j]);
        }
    }
}
// 输出的结果是按照顺序的
// name : dream
// 1 : 10
// A : function () {}
```
[源码](item46/demo.js)

------

### 谨记
+ **使用`for...in`循环来枚举对象属性应当与顺序无关。**
+ **如果聚集运算字典中的数据,确保聚集操作与顺序无关。**
+ **使用数组而不是字典来存储有序集合。**