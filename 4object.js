/*4拓展对象的功能性
1.对象类别
对象的类别如下：
普通对象：具有js对象所有的默认内部行为。
特异对象：具有某些与默认行为不符的内部行为。
标准对象：es6规范中定义的对象，标准对象既可以是普通对象，也可以是特异对象
内建对象：脚本开始执行时，存在于js执行环境中的对象
2.对象字面量语法拓展
在es6中，通过下面的几种语法，让对象字面量更加强大、简洁
》属性初始值的简写，例子
》对象字面量的简写语法，例子
》可计算属性名
3.新增方法
在全局Object对象上引入了一些新方法。
》Object.is方法
与＝＝＝的运算结果相同，区别为
console.log(+0 === -0) //true, Object.is(+0, -0); false
NaN === NaN; false, Object.is(NaN, NaN); true
》Object.assign方法
混合(mixin)是js实现对象组合最流行的一种模式，在一个mixin方法中，一个对象接收来自另一个对象的属性和方法，例子
此方法不能将提供者的访问器属性复制到接收对象中
4.重复的对象字面量属性
es6不再检查是否有重复属性，如果有，将取最后一个属性的值作为其值。
5.自有属性枚举顺序
》所有数字键按升序排序，数字在前，字符在后
》所有字符键按照他们被加入对象的顺序排序
》所有symbol键按照它们被加入对象的顺序排序
6.增强对象原型
》改变对象原型：Object.setPrototypeOf方法，改变任意指定对象的原型。。。不咋用，学着用
》
7.正式的方法定义
*/
// 》属性初始值的简写，例子 es5
function createPerson(name, age){
    return {
        name: name,
        age: age
    };
}
//es6
function createPerson(name, age){
    return {
        name,
        age
    };
}
// 》对象字面量的简写语法，例子 es5
var person = {
    name: "wfz",
    sayName: function(){
        console.log(this.name);
    }
}
//es6
var person = {
    name: 'wfz',
    sayName(){
        console.log(this.name)
    }
}
// 可计算属性名, []表明属性是可以替换的
let lastName = "last name";
let person = {
    "first name": "wfz",
    [lastName]: "zakas"
}
console.log(person["first name"]); //wfz
console.log(person["last name"]); //zakas
// mixin
function mixin(receiver, supplier){
    Object.keys(supplier).forEach(function(key){
        receiver[key] = supplier[key];
    });
    return receiver;
}

