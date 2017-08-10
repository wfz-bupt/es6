 /*
2.字符串和正则表达式
es6为字符串和正则表达式添加了一些新功能，本章介绍此方面的变化
i）更好的unicode支持
UTF－16
Unicode的目标是为全世界每一个字符提供全球唯一的标识符。
codePointAt方法：
参数为编码单元的位置，返回给定位置对应的码位。
要检测一个字符占用的编码单元数量，方法为调用字符的codePointAt方法
i)String.fromCodePoint方法
给定码位，返回字符
String.fromCodePoint(97), "a"
i)normalize方法
如果我们需要对不同字符进行排序和比较，会存在一种可能，他们是等效的。因此在进行字符次对比时，需要把它们标准化为同一
种形式。例子
i)正则表达式u修饰符
正则表达式默认将字符串中的每个字符按照16位编码单元处理。如果加上u，就会把32位编码单元当做一个字符处理。
/^.$/u.test("ddd")
i)其他字符串变更
》字符串中的子串识别
includes方法，startsWith、endsWith
》repeat方法
"x".repeat(3); "xxx"
i)其他正则表达式语法变更
正则表达式是js字符串操作符的一个重要组成部分
》正则表达式y修饰符
看例子，难解释
关于y修饰符需要记住2点，1:只有调用exec和test方法，这些正则表达式对象的方法才会涉及lastIndex属性，调用字符串的
方法，不会触发.
检测y修饰符是否支持
new RegExp(".","y").sticky
或者类似检测u修饰符
》正则表达式的复制
es5中，如果给regExp构造函数提供第二个参数，则会抛出错误，es6则可以，例子
》flags属性
在es5中，可以通过source属性获得正则表达式的文本，无法获得正则表达式的修饰符，在es6中可以通过flags属性获得，例子
》模板字面量
基础语法：最简单的用法，用反撇号｀替代单双引号。
多行字符串：
let message = `Multiline
string`;
// Multiline
string
写啥就是啥
》字符串占位符
模板字面量具有占位符功能，可以把任何合法的js表达式嵌入到占位符中。例子
模板字面量可以访问作用域中所有可访问的变量。
也可以嵌入除变量外的其它内容，如运算式、函数调用等，例子
模板字面量本身也是js表达式，所以，可以在一个模板字面量里嵌入另一个，例子
》标签模板
模板字面量真正的威力来自标签模板
>定义标签
标签是第一个｀前的字符串
标签可以是一个函数
通过一个例子来解释标签函数
》在模板字面量中使用原始值
通过模板标签可以访问到字符转义之前的原生字符串，例子
应用：当你想要输出一些含有代码的字符串，而代码中又包含字符转义序列，原生字符串能够发挥最大的作用。
*/
function is32Bit(c){
    return c.codePointAt(0) > 0xFFFF;
}
let normalized = values.map(function(text){
    return text.normalize();
})
//计算字符串数量，在32位编码方式的情况下
function codePointLength(text){
    let result = text.match(/[\s\S]/gu);
    return result ? result : 0;
}

//检测u修饰符支持
function hasRegExpU(){
    try {
        var pattern = new RegExp(".","u");
        return true;
    }catch(ex){
        return false;
    }
}

var re1 = /ab/i,
    re2 = new RegExp(re1,"g"); //在es6中正常运行，在es5中抛出错误。

let re = /ab/i;
re.source; //"ab"
re.flags; //"g"

// 多行字符串
let html = `
<div>
    <h1>title</h1>
</div>
`.trim()
//模版字面量可以插入\n
let message = `Multiline\nstring`;
// 模板字面量的占位符功能
let name = "nicholas",
    message = `hello, ${name}.`;
console.log(message); //"hello, nicholas"
// 模板字面量嵌入表达式
let count = 10,
    price = 0.25,
    message = `${ount} items cost $${(count * price).toFixed(2)}`
//10 items coust $2.50

// 模板字面量嵌入另一模板字面量
let name = "nicholas",
    message = `Hello, ${
        `my name is ${name}`
    }.`

//标签模板
let count = 10,
    price = 0.25,
    message = passthru`${count} items coust $${(count * price).toFixed(2)}.`;
// 对应呃passthru如下
function passhtru(literals, ...substitutions){
    let result = "";
    for(let i = 0; i < substitutions.length; i++){
        result += literals[i];
        result += substitutions[i];
    }
    //合并最后一个literal
    result += literals[literals.length - 1];
    return result;
}
// 得到原生字符串
let message1 = `Multiline\nstring`,
    message2 = String.raw`Multiline\nstring`;
console.log(message1); //Multiline
                        //string
console.log(message2); //"Muliline\\nstring"
