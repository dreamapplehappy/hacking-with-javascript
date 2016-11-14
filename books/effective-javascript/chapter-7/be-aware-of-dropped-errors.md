### 当心丢弃错误

```javascript
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
```
[源码](item63/demo.js)

------

### 谨记
+ **通过编写共享的错误处理函数来避免复制和粘贴错误处理代码。**
+ **确保明确地处理所有的错误条件以避免丢弃错误。**