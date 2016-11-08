var a = 1;

var code = 'a = 123';

function handle() {
    eval(code);
}

handle();
console.log(a); // 123