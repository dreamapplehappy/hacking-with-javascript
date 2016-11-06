var str = 'hello';
function test() {
    var str = 'world';
    return eval('str');
}
console.log(test()); // world

var str1 = 'hello1';
function test1() {
    var str1 = 'world1';
    //var e = eval;
    //return e('str1');
    return (0, eval)('str1'); // 等同于上面注释的部分
}
console.log(test1()); // hello1