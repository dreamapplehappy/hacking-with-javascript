var b = 12;
function f() {}

// 当@1和@2连在一起不能够解析的时候,分号才会自动插入
var a = b // @1
f() // @2

// 当@3和@4连在一起能够解析(虽然可能会解析失败)的时候,分号就不会自动插入了
// var c = b // @3
// (f()) // @4

// 在以`[`,`(`,`+`,`-`,`/`开头的语句前,永远不要省略分号
var d = 8;
var e = 3
+d

console.log(e); // 11

// 当连接不同的脚本的时候,要在不同的脚本之间插入分号。
(function() {
    console.log('hello')
})();(function() {
    console.log('world')
})()

// 不然就会解析出错
//(function() {
//    console.log('hello')
//})()(function() {
//    console.log('world')
//})()

// 参数之前含有`return`,`throw`,`break`,`continue`,`++`,`--`的,参数与它们之间不要换行。
function demoFunc() {
    return
    1
}
console.log(demoFunc()) // undefined 没有返回预期的结果

// 在循环语句的头部,分号不是用来当分隔符或者空语句使用的。
for(var i = 0; i < 3; i++) {
    console.log(i);
}

// 解析出错
//for(var i = 0
//        i < 3
//        i++) {
//    console.log(i);
//}