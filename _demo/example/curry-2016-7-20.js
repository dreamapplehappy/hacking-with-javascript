function add(a, b) {
    return a + b;
}

function curryingAdd(a) {
    return function(b) {
        return a + b;
    }
}

add(1, 2); // 3
curryingAdd(1)(2); // 3