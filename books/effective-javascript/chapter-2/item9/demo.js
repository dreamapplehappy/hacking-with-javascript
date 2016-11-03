var arr = [0, 1, 2];

// 隐形的创建了一个全局变量temp
function swap(array, indexI, indexJ) {
    temp = array[indexI];
    array[indexI] = array[indexJ];
    array[indexJ] = temp;
}
swap(arr, 0, 1);
console.log(arr, window.temp); // [1, 0, 2], 0

// 显式的声明局部变量
function swap1(array, indexI, indexJ) {
    var temp1 = array[indexI];
    array[indexI] = array[indexJ];
    array[indexJ] = temp1;
}
swap1(arr, 1, 2);
console.log(arr, window.temp1); // [1, 2, 0] undefined