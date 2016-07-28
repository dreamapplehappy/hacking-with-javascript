if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                console.log('override the method!');
                return fToBind.apply(this instanceof fNOP
                        ? this
                        : oThis || this,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();

        return fBound;
    };
}

function hello() {
    console.log(this.name);
}

var dreamapple = {
    name: 'dreamapple',
    getName: function() {
        console.log(this.name);
    }
};

//dreamapple.getName();
//var getName = dreamapple.getName;
//getName.bind(dreamapple)();

hello.bind(dreamapple)();