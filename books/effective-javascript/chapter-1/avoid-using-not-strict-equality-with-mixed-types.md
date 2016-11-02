### 混合类型避免使用`==`比较是否相等

+ `==`符号的强制转换规则

  | 第一个参数类型        | 第二个参数类型          | 强制转换 |
  | ------------- |-------------| -----|
  |   null    | undefined | None; always true |
  | null or undefined      | Any other than null or undefined      |   None; always false |
  | Primitive string, number, or boolean | Date object      |    Primitive => number, Date object => primitive (try toString and then valueOf) |
  | Primitive string, number, or boolean | Non-Date object      |    Primitive => number, non-Date object => primitive (try valueOf and then toString) |
  | Primitive string, number, or boolean | Primitive string, number, or boolean      |    Primitive => number |
  
  
------

### 谨记
+ 