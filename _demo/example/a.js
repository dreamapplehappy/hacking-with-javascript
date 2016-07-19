function A(name) {
    this.name = name;
}
A.prototype.sayWhat = 'say what...';

var a = new A('dreamapple');
console.log(JSON.stringify(a));