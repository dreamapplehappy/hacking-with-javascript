function A(attr1) {
    this.attr1 = attr1;
}
A.prototype.method1 = function(){};

function B(attr1, attr2) {
    A.call(this, attr1);
    this.attr2 = attr2;
}
B.prototype = Object.create(A.prototype);
B.prototype.method2 = function(){};

console.log(new B('attr1', 'attr2'));

