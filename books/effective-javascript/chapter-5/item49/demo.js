var scores = [1, 2, 3, 4, 5];
var total = 0,
    aver = 0;
for(var score in scores) {
    total += score;
}
console.log(total); // 001234
aver = total / scores.length;
console.log(aver); // 246.8

total = 0;
aver = 0;
// 实际上,我们应该使用for循环不会那么容易出错
var len = scores.length;
for(var i = 0; i < len; i++) {
    total += scores[i];
}
aver = total / scores.length;
console.log(aver); // 3