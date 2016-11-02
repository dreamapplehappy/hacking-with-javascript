### 混合类型避免使用`==`比较是否相等

+ `==`符号的强制转换规则

  | Argument Type 1        | Argument Type 2          |Coercions |
  | ------------- |-------------| -----|
  |   null    | undefined | None; always true |
  | null or undefined      | Any other than null or undefined      |   None; always false |
  | Primitive string, number, or boolean | Date object      |    Primitive => number, Date object => primitive (try toString and then valueOf) |
  | Primitive string, number, or boolean | Non-Date object      |    Primitive => number, non-Date object => primitive (try valueOf and then toString) |
  | Primitive string, number, or boolean | Primitive string, number, or boolean      |    Primitive => number |
  
  (翻译版)
  
  | 第一个参数        | 第二个参数         | 强制转换 |
  | ------------- |-------------| -----|
  |   null    | undefined | 没有转换,总是相等的 |
  | null or undefined      | Any other than null or undefined      |   没有转换,总是不相等的 |
  | 原始的字符串,数字,和布尔类型 | 日期类型的对象      |   原始类型的数据转换为数字,日期对象转换为原始类型数据(转换先使用`toString`方法,如果没有就使用`valueOf`方法)  |
  | 原始的字符串,数字,和布尔类型 | 非日期类型的对象      |    原始类型的数据转换为数字,非日期类型的对象转换为原始类型数据(转换先使用`valueOf`方法,如果没有就使用`toString`方法) |
  | 原始的字符串,数字,和布尔类型 | 原始的字符串,数字,和布尔类型     |    原始类型的数据转换为数字 |
  
------

### 谨记
+ 