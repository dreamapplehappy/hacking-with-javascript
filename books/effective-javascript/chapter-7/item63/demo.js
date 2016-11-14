try {
    (function(){
        setTimeout(function() {
            console.log(a + b);
        }, 3000)
    })();
    (function(){
        setTimeout(function() {
            console.log(c + b);
        }, 3000)
    })();
} catch(e) {
    console.log(e); // 在chrome浏览器中可以捕获到错误
}