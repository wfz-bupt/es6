/*
7.Set集合和Map集合
》es5中的set集合和map集合
在es5中，开发者们用对象属性来模拟这两种集合。例子
》该解决方案的一些问题
对象属性的键名必须为字符串，如果给的键名不是字符串，也会自动转换为字符串，所以，map[5]和map['5']的值相同。
对于map集合而言，以下代码会模棱两可
var map = Object.create(null);
map.count = 1;
if(map.count){
    
}
if里无法确定，是判断的count属性是否存在，还是判断的是map.count属性值是否非0
》es6的set集合
其实是一个数组，只不过数组里的值是非重复的，各自独立的，一些api，例子
1.set的增删改查，以及与数组的互相转换
2.weak set集合
集合存放的是弱引用，例如
let set = new Set();
key = {};
set.add(key);
key = null;
以上代码，虽然key引用没了，但是set里还会存有key。弱引用的意思是，如果key引用解除，那么，set里也就没有这个key了。
差别还有如下：
i）在weakset实例中，如果向add 、has、delete方法传入非对象参数会报错
i）weakset集合不可迭代，
i）不暴露任何迭代器
i）不支持foreach方法
i）不支持size属性
》es6中的map集合
在对象中，属性是字符串类型的，但在map中，可以将对象作为key。
map的初始化方法：
let map = new Map(["name", "nicholas"], ["age", 25]);
weak map 集合
键名必须是一个对象，保存的是对象的弱引用。最大的用处：保存web页面中的dom元素，
通过set添加数据，get取得数据
weak map支持的方法：has delete
*/
// es5中的set和map，一般来说，set集合用于监测对象中是否存在某个键名。map集合用来获取已经存在的信息。
var set = Object.create(null);
set.foo = true;
if(set.foo){
    //
}

var map = Object.create(null);
map.foo = "bar";

var value = map.foo;

// es6的set集合
//新建
var set = new Set();
// 增
set.add(5);
set.add("5");
// 删
set.delete("5"); 
set.clear(); //删除所有
// 改，最好先将set转换为数组后，再修改
// 数组 ＝> set， 将数组传入set构造函数
let set = new Set([1,2,3,4,5]);
//set => 数组，展开运算符
array = [...set];
// 查
set.has(5); //true
//长度
set.size();
// 遍历, set的value和index相等。特殊的地方
set.forEach(function(value, index, set){});

// map 新建
let map = new Map();
// 增
map.set("title", "understanding es6");
// 删
map.delete("title");
map.clear();
// 改
// 查
map.get("title"); //如果键不存在，则返回undefined
map.has("title"); //查询是否存在此键

// es5中，建立一个对象的私有属性的方法,重点：利用一个立即执行函数，形成一个私有区域，外部无法访问此
// 区域中的变量，然后新建一个变量存储私有数据，
var Person = (function(){
    var privateData = {},
        privatedId = 0;
    function Person(name){
        Object.defineProperty(this, "_id", {
            value: privatedId ++;
        });
        privatedData[this._id] = {
            name: name
        };
    }
    Person.prototype.getName = function(){
        return privatedData[this._id].name;
    }
})();
// es6就可以用weak map来存储，不用特地维护_id
let Person = (function(){
    var privatedData = new WeakMap();
    function Person(name){
        privatedData.set(this, {name: name});
    }
    Person.prototype.getName = function(){
        return privatedData.get(this).name;
    }
    return Person;
})();
