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