/*
第一章，块级作用域
介绍块级作用域绑定机制以及最佳实践
1.var声明以及变量提升机制
变量提升机制：在函数作用域或者全局作用域中通过var声明的变量，无论实际上在哪里声明的，都会被当成在当前作用域顶部声明的变量。
用let声明的变量不会被提升。2，使用let或者var不能同时声明2个相同变量，如：var num, let num,会抛出错误
2.const声明
声明const变量的同时必须进行初始化，不然会抛出错误，如const name; //抛出错误 
const声明同样是块级标识符
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