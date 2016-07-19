1.yield语句不能用在普通函数中，否则会报错。
2.var generator = f(); 如果是generator函数只会在运行generator.next()时才运行
3.yield语句如果用在一个表达式之中，必须放在圆括号里面。
4.yield语句用作函数参数或赋值表达式的右边，可以不加括号。
5.yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。
