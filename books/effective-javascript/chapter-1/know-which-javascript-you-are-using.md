# 明白你现在使用的是哪种模式的JavaScript

+ 在严格模式下,在函数中重复声明`arguments`会报错:
```javascript
'use strict';
function say() {
    var arguments = []; // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
}
```
[示例]()