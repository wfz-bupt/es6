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