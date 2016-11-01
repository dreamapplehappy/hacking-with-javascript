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