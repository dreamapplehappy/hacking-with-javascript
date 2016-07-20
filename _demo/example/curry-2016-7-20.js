//function add(a, b) {
//    return a + b;
//}
//
//function curryingAdd(a) {
//    return function(b) {
//        return a + b;
//    }
//}
//
//add(1, 2); // 3
//curryingAdd(1)(2); // 3


function printInfo(name, song) {
    console.log(name + '喜欢的歌曲是: ' + song);
}
printInfo('Tom', '七里香');
printInfo('Jerry', '雅俗共赏');


function curryingPrintInfo(name) {
    return function(song) {
        console.log(name + '喜欢的歌曲是: ' + song);
    }
}
var tomLike = curryingPrintInfo('Tom');
tomLike('七里香');
var jerryLike = curryingPrintInfo('Jerry');
jerryLike('雅俗共赏');