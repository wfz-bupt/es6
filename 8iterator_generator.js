/*
迭代器和生成器
问题：
for循环嵌套，导致要维护多个i、j、k，一旦写错，难以觉察。
解决：iterator
生成器：返回迭代器的函数
》什么是迭代器
》什么是生成器
yield关键字是es6的新特性，通过它来指定调用迭代器的next方法时返回的值和返回的顺序。
使用yield关键字可以返回任何值或表达式，所以可以通过生成器函数批量给迭代器添加元素，例子
yied只能在*createIterator函数内部使用
2.生成器函数表达式
let createIterator = function *(items) {
    
}
3.生成器对象的方法
》可迭代对象和for-of循环
例子
访问默认迭代器
＊创建可迭代对象
默认情况下，开发者定义的对象都是不可迭代对象，但是可以通过重写Symbol.iterator属性添加一个生成器，将其变成可迭代
对象，例子
》内建迭代器
*集合对象迭代器
es6中有3种类型的集合对象，数组、Map集合、Set集合，这3种对象都内建了以下三种迭代器：
entries():返回一个迭代器，其值为多个键值对
values(): 返回一个迭代器，其值为集合的值
keys(): 值为集合种的所有键盘名
例子
＊
》展开运算符和非数组可迭代对象
》高级迭代器功能
》异步任务执行
》
*/
//什么是生成器，例子
function *createIterator() {
    yield 1; //每次执行完此条语句后，会自动执行，直到执行next方法时，才会又执行。
    yield 2;
    yield 3;
}
let iterator = createIterator();
console.log(iterator.next().value); //1
console.log(iterator.next().value); //2
console.log(iterator.next().value); //3

// 通过生成器函数批量给迭代器添加元素，例子
function *createIterator(items) {
    for (let i=0; i < items.length; i++) {
        yield items[i];
    }
}
let iterator = createIterator([1,2,3]);
console.log(iterator.next());  //{ value: 1, done: false }
console.log(iterator.next());  //{ value: 2, done: false }
console.log(iterator.next());  //{ value: 3, done: false }
console.log(iterator.next());  //{ value: undefined, done: true }

// for－of, 其实就是每次调用生成器的next方法，然后取得value值，例子如下
let values = [1, 2, 3];
for (let num of values) {
    console.log(num);
}

let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();
while(iterator.next().done !== true){
    console.log(iterator.value);
    iterator.next();
}

//检测某个对象是否为可迭代对象
function isIterable(object){
    return typeof object[Symbol.iterator] === "function";
}

// 创建可迭代对象
let collections = {
    items: [],
    *[Symbol.iterator]() {
        for (let item of this.items) {
            yield item;
        }
    }
}
collections.items.push(1);
collections.items.push(2);
collections.items.push(3);

for (let x of collections) {
    console.log(item);
}

// 内置迭代器
let colors = ["red", "blue", "blue"];
for (let entry of colors.entries()){
    console.log(entry);  //[0, "red"] [1, "blue"]
}
let data = new Map();
data.set("title", "unde");
data.set("format", "ebook");
