/*
第三章 函数
在es5的基础上做了大量改进
1.函数形参的默认值
》在es5中模拟默认参数 例子
》es6中的默认参数值， 例子
》默认参数值对arguments的影响，例子
es5非严格模式，arguments跟随参数变化而变化
es5严格模式，arguments永远跟传入的参数保持一致, 传入的和没传入的参数都在里面
es6，arguments的行为同es5严格模式，只有传入的参数在里面
》默认参数表达式 例子
》处理无命名参数
es5中处理无命名参数，需要从正确位置，遍历arguments对象，例子
es6处理无命名参数，在命名参数前加(...)表明这是一个不定参数，该参数是一个数组，包含不确定参数的所有内容，例子，
不定参数的使用限制：
i）不定参数必须放在所有参数末尾
i）不可以在setter中使用不定参数
不定参数对arguments的影响
arguments始终包含传入函数的所有参数
2.增强的Function构造函数
3.展开运算符
指定一个数组，将它们打散作为一个个参数而不是一个整体传入函数，例子
4.name属性
es6为所有函数新增了name属性，例子，bind的name，new function的name
5.明确函数的多重用途
es5中，函数有双重身份，可以通过new调用，也可以当作普通函数调用
在es5中，判断函数是否通过new关键词被调用的方法，例子
在es6中，通过new.target判断函数是否通过new关键字调用。
如果函数通过new调用，则执行函数内部的[[Constructor]]方法，否则，则执行函数内部的[[Call]]方法。
如果函数通过new调用，则new.target为对象实例，否则则为undefined。例子
在函数外使用new.target是错误的
6.块级函数
es5严格模式：在代码块内部声明函数时程序会抛出错误
在es6中，会将块级函数视作一个块级声明，所以，是可行的。例子
》块级函数的使用场景，与用let定义的函数表达式的区别,块级函数会被提升至代码块的顶部，而函数表达式不会被提升。
》非严格模式下的块级函数
非严格模式下，函数不会被提升至代码块顶部，而是被提升至外围函数或者全局作用域的顶部
7.箭头函数
箭头函数与传统函数的不同点
i）没有this,super,arguments,和new.target绑定，这些特性由外围最近一层非箭头函数决定
i）不能通过new关键字调用，箭头函数没有[[Constructor]]方法，不能被用作构造函数
i）没有原型，不存在prototype这个属性
i）内部this值不可以改变
i）没有arguments绑定
i）不支持重复的命名参数
》箭头函数语法
例子
》创建立即执行函数表达式
》将箭头函数包裹在小括号里，也可以实现立即执行函数表达式，例子
》将箭头函数用任何防止this发生变化的地方，例子
》箭头函数适用于数组处理
》箭头函数没有arguments绑定，访问的是离它最近的外围函数的arguments
》箭头函数的辨识方法
包括回调函数在内的所有使用匿名函数表达式的地方都适合用箭头函数来改写。。。。
8.尾调用优化


*/
// 在es5中模拟默认参数 例子
function makeRequest(url, timeout, callback){
    timeout = timeout || 2000;
    callback = callback || function(){};
}
//以上方法如果传0，则不会成功，改进如下：
function makeRequest(url, timeout, callback){
    timeout = (typeof timeout !== "undefined") ? timeout : 2000;
    callback = (typeof timeout !== "undefined") ? callback : function;
}
// es6中的默认参数值， 例子
function makeRequest(url, timeout = 2000, callback){

}
//默认参数值对arguments的影响，例子（es5 非严格模式）
function mixArgs(first, second){
    console.log(first == arguments[0]);  //true
    console.log(second == arguments[1]); //true
    first = "c";
    second = "d";
    console.log(first == arguments[0]);  //true
    console.log(second == arguments[1]); //true
}
//默认参数值对arguments的影响，例子（es5 严格模式）
function mixArgs(first, second){
    "use strict";
    console.log(first == arguments[0]);  //true
    console.log(second == arguments[1]); //true
    first = "c";
    second = "d";
    console.log(first == arguments[0]);  //false
    console.log(second == arguments[1]); //false
}
mixArgs("a", "b");
//默认参数值对arguments的影响，例子（es6 非严格模式and严格模式）
function mixArgs(first, second = "b"){
    console.log(arguments.length);       //1
    console.log(first == arguments[0]);  //true
    console.log(second == arguments[1]); //false
    first = "c";
    second = "d";
    console.log(first == arguments[0]);  //false
    console.log(second == arguments[1]); //false
}
mixArgs("a");
// 默认参数表达式
let value = 5;
function getValue() {
    return value ++;
}
function add(first, second = getValue()) {
    return first + second;
}
console.log(add(1,1)); //2
console.log(add(1));   //6
console.log(add(1));   //7

// es5中处理无命名参数，需要从正确位置，遍历arguments对象，例子
function pick(object){
    let result = Object.create(null);
    for(let i = 1, len = arguments.length; i < len; i++){
        result[arguments[i]] = object[arguments[i]];
    }
    return result;
}
let book = {
    title: "title1",
    author: "wfz",
    year: 2016
};
let bookData = pick(book, "author", "year");
// 使用不定参数重写pick函数
function pick(object, ...keys){
    let result = Object.create(null);
    for(let i = 0, len = keys.length; i < len; i++){
        result[keys[i]] = object[keys[i]];
    }
    return result;
}
// 展开运算符
let values = [25, 50, 75, 100];
//等价于console.log(Math.max(25, 50, 75, 100))
console.log(Math.max(...values));

//函数的name属性
var doSomething = function(){

}
console.log(doSomething.bind().name); //"bound doSomething"
console.log((new Function()).name);  //"anonymous"

//es5中，判断函数是否被当做构造函数调用的方法
function Person(name){
    if(this instanceof Person){
        this.name = name;
    }else{
        throw new Error('必须通过new关键字来调用Person');
    }
}
// es6中的判断方法
function Person(name){
    if(typeof new.target !== "undefined"){
        this.name = name;
    }else{
        throw new Error('必须通过new关键字来调用Person');
    }
}
// es6块级函数
"use strict";
if(true){
    console.log(typeof doSomething); //"function"
    function doSomething(){

    }
    doSomething();
}
console.log(typeof doSomething); //undefined

// 块级函数与用let定义的函数表达式的区别
"use strict";
if(true){
    console.log(tyeof doSomething); //抛出错误
    let doSomething = function(){

    }
    doSomething();
}

// 箭头函数语法
let reflect = value => value; //一个参数
let sum = (num1, num2) => num1 + num2; //多个参数
let getName = () => "wfz"; //没有参数
let sum = (num1, num2) => {
    return num1 + num2;
}
let getTempItem = id => ({ id: id, name: "Temp" });  //等价于,在函数内部返回一个对象字面量
let getTempItem = function(id){
    return {
        id: id,
        name: "temp"
    }
}
// 立即执行函数
let person = (
    (name) => {
        return {
            getName: function(){
                return name;
            }
        };
    }
)('wfz');

// 防止this发生变化
let PageHandler = {
    id: '123456',
    init: function(){
        document.addEventListener("click", event => this.doSomething(event.type), false);
    },
    doSomething: function(type){
        console.log("Handling" + type + "for" + this.id);
    }
};
