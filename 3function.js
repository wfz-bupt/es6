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
5.明确函数的多重用途
6.块级函数
7.箭头函数
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