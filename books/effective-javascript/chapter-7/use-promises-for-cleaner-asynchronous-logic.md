### 使用`promise`模式清洁异步逻辑

```javascript
```
[源码](item68/demo.js)

------

### 谨记
+ **`promise`代表最终值,即并行操作完成时最终产生的结果。**
+ **使用`promise`组合不同的并行操作。**
+ **使用`promise`模式的API避免数据竞争。**
+ **在要求有意的竞争条件时使用`select`(也称为`choose`)**