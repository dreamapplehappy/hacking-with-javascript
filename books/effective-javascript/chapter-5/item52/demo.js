var a1 = new Array(8);
console.log(a1, a1.length); // [ , , , , , , ,  ] 8
var a2 = [8];
console.log(a2, a2.length); // [ 8 ] 1

function fn(Array) {
    return new Array(1, 2, 3);
}
var a3 = fn(String);
console.log(a3); // [String: '1']
