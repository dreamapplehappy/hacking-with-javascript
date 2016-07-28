// showMsg
function showMsg(name, age, gender) {
    var msg = 'My name is ' + name + ' ,my age is ' + age + ' ,my gender is ' + gender;
    console.log(msg);
    return msg;
}
// bestCurry
var k = 0;
function curry(fn, length, temp, args) {
    console.log(temp);
    var outerLength = length || fn.length;
    var outerTemp = temp || [];
    var outerArgs = args || [];
    if(!temp){
        for(var i = 0; i < outerLength; i++) {
            outerTemp[i] = false;
        }
    }

    return function() {
        var _argsLen = arguments.length;
        for(var i = 0; i < _argsLen; i++) {
            if(arguments[i] !== _) {
                outerTemp[i] = true;
                outerArgs[i] = arguments[i];
            }
        }
        for(var i = 0; i < outerLength; i++) {
            if(!outerTemp[i]) {
                return curry.call(this, fn, outerLength, outerTemp, outerArgs);
            }
        }

        return fn.apply(this, outerArgs);
    }
}
function ar(a, b, c, d, e, f){
    console.log(a + '->' + b + '->' + c + '->' + d + '->' + e + '->' +f);
}
var _ = {};
var a = curry(ar);
//a(1)(_, 2)(3, 4, 5, 6);
a(1)(2)(3)(4)(5)(6);


