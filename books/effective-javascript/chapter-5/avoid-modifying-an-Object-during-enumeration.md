### 避免在枚举期间修改对象

```javascript
function Member(name) {
    this.name = name;
    this.friends = [];
}
var a = new Member('Alice'),
    b = new Member('Bob'),
    c = new Member('Carol'),
    d = new Member('Dieter'),
    e = new Member('Eli'),
    f = new Member('Fatima');

a.friends.push(b);
b.friends.push(c);
c.friends.push(e);
d.friends.push(b);
e.friends.push(d, f);
// 上面的代码初步建立了一个社交网络

// 查找一个人的社交网络中是否包含另一个人

Member.prototype.inNetWork = function(other) {
    // 访问过的人
    var visited = {};
    // 社交圈
    var workset = {};
    // 初始化社交圈子
    workset[this.name] = this;
    // 进行查找
    for(var name in workset) {
        // 获取圈子中的每一个人
        var member = workset[name];
        // 删除访问过的人
        delete workset[name];
        // 检查是否已经访问过了
        if(name in visited) {
            continue;
        }
        visited[name] = member;

        // 找到相同的人
        if(member === other) {
            return true;
        }

        member.friends.forEach(function(friend) {
            workset[friend.name] = friend;
        })
    }
    return false;
};

console.log(e.inNetWork(d)); // false 结果与我们期望的相反

// 我们的字典类
function Dict(elements) {
    this.elements = elements || [];
    this.hasSpecialProto = false;
    this.specialProto = undefined;
}
Dict.prototype.has = function(key) {
    if('__proto__' === key) {
        return this.hasSpecialProto;
    }
    return Object.hasOwnProperty.call(this.elements, key);
};
Dict.prototype.get = function(key) {
    if('__proto__' === key) {
        return this.specialProto;
    }
    return this.elements.has(key) ? this.elements[key] : undefined;
};
Dict.prototype.set = function(key, value) {
    if('__proto__' === key) {
        this.hasSpecialProto = true;
        this.specialProto = value;
    }
    else {
        this.elements[key] = value;
    }
};
Dict.prototype.remove = function(key) {
    if('__proto__' === key) {
        this.hasSpecialProto = false;
        this.specialProto = undefined;
    }
    else {
        delete this.elements[key];
    }
};
Dict.prototype.pick = function() {
    for(var key in this.elements) {
        if(this.has(key)) {
            return key;
        }
    }
    throw new Error('empty dictionary');
};

// 定义我们自己的WorkSet
function WorkSet() {
    this.entries = new Dict();
    this.count = 0;
}
WorkSet.prototype.isEmpty = function() {
    return 0 === this.count;
};
WorkSet.prototype.add = function(key, val) {
    if(this.entries.has(key)) {
        return;
    }
    this.entries.set(key, val);
    this.count++;
};
WorkSet.prototype.get = function(key) {
    return this.entries.get(key);
};
WorkSet.prototype.remove = function(key) {
    if(!this.entries.has(key)) {
        return;
    }
    this.entries.remove(key);
    this.count--;
};

// 上面的方法我感觉实在是太拖沓了,还是自己实现一个吧
function Member1(name) {
    this.name = name;
    this.friends = [];
}
var a1 = new Member('Alice'),
    b1 = new Member('Bob'),
    c1 = new Member('Carol'),
    d1 = new Member('Dieter'),
    e1 = new Member('Eli'),
    f1 = new Member('Fatima');

a1.friends.push(b1, c1, d1, e1, f1);
b1.friends.push(a1, c1, d1, e1, f1);
c1.friends.push(a1, b1, d1, e1, f1);
d1.friends.push(a1, b1, c1, e1, f1);
e1.friends.push(a1, b1, d1, c1, f1);
f1.friends.push(a1, b1, c1, e1, d1);

Member.prototype.findMember = function(other) {
    // 查找所有的社交成员
    var allMyMembers = [];
    // 查找成员
    findMyMembers(this);
    console.log(allMyMembers); // 输出所有成员
    for(var i = 0; i < allMyMembers.length; i++) {
        if(other.name === allMyMembers[i]) {
            return true;
        }
    }

    // 一个工具函数,又来查找当前对象的成员
    function findMyMembers(my) {
        if(-1 === allMyMembers.indexOf(my.name)) {
            allMyMembers.push(my.name);
        }
        for(var i = 0; i < my.friends.length; i++) {
            if(-1 == allMyMembers.indexOf(my.friends[i].name)) {
                allMyMembers.push(my.friends[i].name);
                findMyMembers(my.friends[i]);
            }
        }
    }

    return false;
};

console.log(f1.findMember(d1)); // true
```
[源码](item48/demo.js)

------

### 谨记
+ **当使用`for...in`循环枚举一个对象的属性时,确保不要修改该对象。**
+ **当迭代一个对象时,如果该对象的内容可能会在循环期间改变,应该使用`while`循环或经典的`for`循环来代替`for...in`循环。**
+ **为了在不断变化的数据结构中能够预测枚举,考虑使用一个有序的数据结构,例如数组,而不要使用字典对象。**