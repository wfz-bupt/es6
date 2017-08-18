/*
es6第6种数据类型：Symbol
》创建Symbol
例子，检测变量是否为symbol类型的方法 typeof variableName == "symbol"
》Symbol的使用方法
所有使用可计算属性名的地方，都可以使用symbol，Symbol也可以用于可计算对象字面量属性名、Object.defineProperty()
和Object.defineProperties方法中，例子
》Symbol共享体系
在你的应用中有2种不同的对象类型，但是，你希望使用同一个Symbol属性来表示一个独特的标识符。es6提供了一个可以随时
访问的全局Symbol注册表。创建一个可共享的symbol，使用Symbol.for方法，例子
Symbol.for方法首先在全局Symbol注册表中搜索键为"uid"的Symbol是否存在，如果存在，则直接返回已有的symbol，否则创建
一个新的symbol，并使用这个键在symbol全局注册表中注册。后续如果传入同样的键调用symbol.for，就会返回相同的symbol。
》Symbol与类型强制转换
强制将Symbol类型转换为字符串或者数字类型，都会报错。
》Symbol属性检索
Object.keys方法和Object.getOwnPropertyNames方法可以检索对象中所有的属性名，es6新添Object.getOwnProperty-
Symbols方法检索对象中的Symbol属性，例子
》通过well-know Symbol暴露内部操作
包括：
Symbol.hasInstance  Symbol.isConcatSpreadable   Symbol.iterator
Symbol.match   Symbol.replace  Symbol.search  Symbol.species Symbol.split  Symbol.toPrimitive
Symbol.toStringTag   Symbol.unscopables
1.Symbol.hasInstance
每个函数都有一个Symbol.hasInstance属性，该属性对应一个方法，用于确定对象是否为函数的实例。
obj instanceof Array, == Array[Symbol.hasInstance](obj)
所以，我们可以通过改写函数的Symbol.hasInstance的属性来改写instanceof的行为，例子
2.Symbol.isConcatSpreadable， 例子
3.Symbol.match  Symbol.replace  Symbol.search  Symbol.split
可以利用以上重写字符串的match、replace、search、split方法，这些方法以 正则表达式 为参数，重写这些方法后，不用
正则表达式为参数也可以完成功能，，例子
4.Symbol.toPrimitive方法
在使用==运算符时，对象在比较操作执行前会转换为一个原始值，到底使用哪个原始值以前是由内部操作决定的，但是在es6中
通过Symbol.toPrimitive方法可以更改那个暴露的值，例子
5.Symbol.toStringTag
问题：如果一个页面包含iframe标签，就会存在2个全局执行环境，如果对象在不同的执行环境中传递，就无法确认它的类型。
例如：在某个领域中创建一个数组，那它就是一个数组，如果将这个数组传给另一个领域中，instanceof Array就会返回false。
解决方法：针对类型识别问题的解决方案
function isArray(value){
    return Object.prototype.toString.call(value) === "[object Array]"
}
通过改变对象的Symbol.toStringTag属性，改变调用Object.prototype.toString返回的身份标示。例子
6.Symbol.unscopables属性
总结：
1.Symbol是一种新的数据类型
2.Symbol类型的变量在全局作用域中有一个Symbol注册表
3.特点：不容易被改变，适用于那些需要一定程度保护的功能。
*/
let firstName = Symbol("first name");
let person = {};
person[firstName] = "nicolas";
console.log("first name" in person); //false
console.log(person[firstName]); //"nicholas"
console.log(firstName); //Symbol(first name)
// 在Object.defineProperty和Object.defineProperties方法中
let firstName = Symbol("first name");
//使用一个可计算对象字面量属性
let person = {
    [firstName]: "nicholas"
};
//将属性设置为只读
Object.defineProperty(person, firstName, { writable: false });
let lastName = Symbol("last name");
Object.defineProperties(person, {
    [lastName]: {
        value: "Zakas",
        writable: false
    }
});
console.log(person[firstName]); //nicholas
console.log(person[lastName]); //zakas

let uid = Symbol.for("uid");
let object = {};
object[uid] = "12345";
console.log(object[uid]); //"12345"
console.log(uid); "symbol(uid)"

let uid2 = Symbol.for("uid");
console.log(uid === uid2); //true
// es6新添Object.getOwnProperty-
// Symbols方法检索对象中的Symbol属性，例子
let uid = Symbol.for("uid");
let object = {
    [uid]: "12345"
};
let symbols = Object.getOwnPropertySymbols(object);
console.log(symbols[0]); //"Symbol(uid)"
console.log(object[symbols[0]]); //"12345"
// 所以，我们可以通过改写函数的Symbol.hasInstance的属性来改写instanceof的行为，例子
function SpecialNumber(){

}
Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
    value: function(v){
        return (v instanceof Number) && (v >=1 && v <= 100);
    }
})
var two = new Number(2),
    zero = new Number(0);
console.log(two instanceof SpecialNumber); //true
console.log(zero instanceof SpecialNumber); //false

// Symbol.isConcatSpreadable， 例子
let collection = {
    0: "hello",
    1: "world",
    length: 2,
    [Symbol.isConcatSpreadable]: true
};
let messages = [ "Hi" ].concat(collection);
console.log(messages); //["hi", "Hello", "world"]

// 可以利用以上重写字符串的match、replace、search、split方法，这些方法以 正则表达式 为参数，重写这些方法后，不用
// 正则表达式为参数也可以完成功能，，例子
let hasLengthOf10 = {
    // 相当于/^.{10}$/
    [Symbol.match]: function(value){
        return value.length === 10 ? [value.substring(0, 10)] : null;
    },
    [Symbol.replace]: function(value, replacement){
        return value.length === 10 ? replacement + value.substring(10) : value;
    },
    [Symbol.search]: function(value){
        return value.length === 10 ? 0 : -1;
    },
    [Symbol.split]: function(value){
        return value.length === 10 ? ["", ""] : [value]
    }
};

let message1 = "hello world";
let message2 = "hello john";
 
let match1 = message1.match(hasLengthOf10), //null
    match2 = message2.match(hasLengthOf10); //["hello john"]

// 通过Symbol.toPrimitive方法可以更改那个暴露的值，例子
function Temperature(degree){
    this.degree = degree;
}
Temperature.prototype[Symbol.toPrimitive] = function(hint){
    switch(hint){
        case "string": 
            return this.degree + "\u00b0";
        case "number":
            return this.degree;
        case "defalut":
            return this.degree + "degree";
    }
}
var freezing = new Temperature(32);
console.log(freezing + "!"); // "32 degree!"
console.log(freezing / 2); //16
console.log(String(freezing)); //"32。"

// 通过改变对象的Symbol.toStringTag属性，改变调用Object.prototype.toString返回的身份标示。例子
function Person(name){
    this.name = name;
}
Person.prototype[Symbol.toStringTag] = "Person";
var me = new Person("nicholas");
console.log(me.toString());  //"[object Person]" ,,,Person.prototype继承了Object.prototype.toString
// 方法
console.log(Object.prototype.toString.call(me)); //"[object Person]"



