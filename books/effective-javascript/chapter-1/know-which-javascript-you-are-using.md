# 明白你现在使用的是哪种模式的JavaScript

+ 在严格模式下,在函数中重复声明`arguments`会报错:
```javascript
'use strict';
function say() {
    var arguments = []; // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
}
```
[示例](demos/demo1.html)

+ 在非严格模式下,在函数中重复声明`arguments`不会报错:
```javascript
function sayWithNoStrict() {
    var arguments = [];
}
```
[示例](demos/demo2.html)

+ 如果连接两个不同模式的JavaScript文件的话,如果是严格模式的文件放在开始的话,那么整个文件都是处于严格模式的:
```javascript
// file1.js
'use strict';
function say() {
    var arguments = [];
}

// file2.js
function sayWithNoStrict() {
    var arguments = [];
}
```
[示例](demos/demo3.html)

+ 如果连接两个不同模式的JavaScript文件的话,如果是非严格模式的文件放在开始的话,那么整个文件都是处于非严格模式的:
```javascript
// file2.js
function sayWithNoStrict() {
    var arguments = [];
}

// file1.js
'use strict';
function say() {
    var arguments = [];
}
```
[示例](demos/demo4.html)

+ **因为`file1.js`和`file2.js`如果合并到一个文件中的话,那么它们处于同一个作用域中;
    这个时候如果在文件的顶部使用`use strict`的话,那么整个文件都是使用的严格模式;
    在文件中间使用`use strict`是没有作用的。**
    
+ 
