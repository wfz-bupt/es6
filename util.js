/*
es6可用函数
*/
//清除数组重复成员
eliminateDuplicates: function(items){
    return [...new Set(items)]
}