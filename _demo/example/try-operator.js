//var a = 64.3;
//var isPowerOf2 = a && !(a & (a - 1));



//var b = 7.2;
//var max = a ^ ( (a ^ b) & -(a < b) );
//var min = b ^ ( (a ^ b) & -(a < b) );
//console.log(max, min);

//
//var c = 3.1415926;
//var d = c | 0;
//var e = ~~c;
//console.log(d === Math.floor(c), e === d);

//var bgColor = {
//    r: 234,
//    g: 36,
//    b: 122
//};
//var hexColor = RGB2HEX(bgColor.r, bgColor.g, bgColor.b);
//console.log(hexColor); // #ea247a
//
//function RGB2HEX(r, g, b) {
//    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1);
//}
//
//a ^= b;
//b ^= a;
//a ^= b;
//console.log(a, b); // 6, 3





//function compare(a, b) {
//    if(a > b) {
//        return a;
//    }
//    else {
//        return b;
//    }
//}

//function compare(a, b) {
//    return a > b ? a : b;
//}

//console.log(isPowerOf2);

//var n = 3;
//var result = 1 << n;
//console.log(result); // 8
//console.log(result === Math.pow(2, 3)); // true

//console.log(0x1);


var a = 1.1;
var b = 2.2;
function compare(a, b) {
    return a > b ? a: b;
}
console.time('use func');
console.log(compare(a, b));
console.timeEnd('use func');
console.time('use bitwise operators');
a = a | 0;
b = b | 0;
console.log(a ^ ( (a ^ b) & -(a < b) ));
console.timeEnd('use bitwise operators');


