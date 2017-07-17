/*
第一章，块级作用域
介绍块级作用域绑定机制以及最佳实践
1.var声明以及变量提升机制
变量提升机制：在函数作用域或者全局作用域中通过var声明的变量，无论实际上在哪里声明的，都会被当成在当前作用域顶部声明的变量。
用let声明的变量不会被提升。2，使用let或者var不能同时声明2个相同变量，如：var num, let num,会抛出错误
2.const声明
声明const变量的同时必须进行初始化，不然会抛出错误，如const name; //抛出错误 
const声明同样是块级标识符。在当前代码块内有效，同样也不会被提升至作用域顶部。常量不可以再次赋值。与其他语言中的常量不同
的是，js中的常量如果是对象，则对象的值可以修改。例子
3.临时死区
用来描述let和const的不提升效果。例子
4.循环中的块作用域绑定，非常适用
5.循环中的函数 例子
6.循环中的const声明，在普通的for循环中使用const，并修改它的值会抛出错误，但是在for-in和for-of循环中，使用const
不会抛出错误，原因是：每次循环不会修改已有绑定，而是会创建一个新的绑定。
7.全局块作用域绑定
let\const和var的另一个区别是他们在全局作用域中的行为，var在全局作用域中声明变量，会为window添加一个属性，而其他俩不会，它只会
遮蔽，不会覆盖。例子
8.块级绑定最佳实践的进化
默认使用const，只有在确切需要改变变量值的时候使用let，预料外的变量值的改变是很多bug的源头。
*/
function getValue(condition){
    if(condition){
        var value = "blue";
        return value;
    }else{
        return null;
        //此处可访问变量value，值为undefined
    }
    //此处可访问，值为undefined
}
// 提升为,以下
function getValue(condition){
    var value;
    if(condition){
        value = "blue";
        return value;
    }else{
        return null;
        //此处可访问变量value，值为undefined
    }
    //此处可访问，值为undefined
}
//使用let
function getValue(condition){
    if(condition){
        let value = "blue";  //value不再被提升至函数顶部，访问环境为if代码块
        return value;
    }else{
        return null;
        //变量value此处不存在
    }
    //变量value此处不存在
}
//const对象
const person = {
    name: "nicholas"
};
person.name = "wfz";
//抛出语法错误！
person = {
    name: "greg"
}

// 临时死区
if(condition){
    console.log(typeof value); //引用错误
    let value = "blue";
}

console.log(typeof value); //undefined
if(condition){
    let value = "blue";
}

// 循环中的函数,强制性给i创建了一个副本，并存储为变量value
var funcs = [];
for(var i = 0; i < 10; i++){
    funcs.push((function(value){
        return function(){
            console.log(value);  //输出0、1、2、3、4.。。。9
        }
    })(i))
}

var funcs = [];
for(let i = 0; i < 10; i++){
    funcs.push(function(){
        console.log(i);
    })
}
funcs.forEach(function(func){
    func(); //输出0、1、。。9
})

// 全局块作用域绑定
var RegExp = "hello";
console.log(window.RegExp); //"hello"

let RegExp = "hello";
console.log(RegExp === window.RegExp); //false

