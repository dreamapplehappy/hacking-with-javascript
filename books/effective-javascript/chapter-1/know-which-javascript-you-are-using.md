### 知道你现在使用的是哪种模式的JavaScript

+ 在严格模式下,在函数中重复声明`arguments`会报错:
    ```javascript
    'use strict';
    function say() {
        var arguments = []; // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
    }
    ```
    [源码](item1/file1.js)
    
+ 在非严格模式下,在函数中重复声明`arguments`不会报错:
    ```javascript
    function sayWithNoStrict() {
        var arguments = [];
    }
    ```
    [源码](item1/file2.js)

+ 如果连接两个不同模式的JavaScript文件的话,如果是严格模式的文件放在开始的话,那么整个文件都是处于严格模式的:
    ```javascript
    // file1.js
    'use strict';
    function say() {
        var arguments = []; // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
    }
    
    // file2.js
    function sayWithNoStrict() {
        var arguments = []; // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
    }
    ```
    [源码](item1/file3.js)

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
    [源码](item1/file4.js)

+ **因为`file1.js`和`file2.js`如果合并到一个文件中的话,那么它们处于同一个作用域中;
    这个时候如果在文件的顶部使用`use strict`的话,那么整个文件都是使用的严格模式;
    在文件中间使用`use strict`是没有作用的。**
    
+ **我们当然也有应对这种情况的解决方案,那就是使用一个立即调用的函数来包裹我们的代码;
    达到分离作用域的目的,然后在这个立即执行的函数上方标注我们要使用的模式;如果你想使用严格模式的话,
    那就添加`use strict`;如果不想使用严格模式的话,那就什么也不添加。**
    
    ```javascript
    (function() {
        // file1.js 使用了严格模式
        'use strict';
        function say() {
    
        }
    })();
    
    (function() {
        // file2.js 使用非严格模式
        function sayWithNoStrict() {
            var arguments = [];
        }
    })();
    ```
    [源码](item1/file5.js)