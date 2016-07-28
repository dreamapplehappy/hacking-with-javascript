//function buildList(list) {
//    var result = [];
//    for (var i = 0; i < list.length; i++) {
//        var item = 'item' + i;
//        result.push((function(k) {console.log(item + ' ' + k + ' ' + list[k])})(i));
//    }
//    return result;
//}
//
//function testList() {
//    var fnlist = buildList([1,2,3]);
//    for (var j = 0; j < fnlist.length; j++) {
//        fnlist[j];
//    }
//}
//
//testList();

function sayAlice() {
    var say = function() { console.log(alice); }
    // Local variable that ends up within closure
    var alice = 'Hello Alice';
    return say;
}
sayAlice()();