/*解构是一种打破数据结构，将其拆分为更小部分的过程
》为何使用解构功能
在es5中，会出现许多同质化的代码，例如：
let options = {
    repeat: true,
    save: true,
};
let repeat = options.repeat,
    save = options.save;
为了解决这个问题
》对象解构, 等号右侧不能出线null或者undefined
例子
1.解构赋值，例子
2.默认值，例子
3.为非同名局部变量赋值，例子
4.嵌套对象解构
》数组解构，例子
1.解构赋值，
与对象赋值相同，但是不需要加小括号。let [a, b] = [b, a]; 可以交换数组
2.默认值, 例子
3.嵌套数组解构
4.不定元素, 例子，数组的复制，拷贝
》混合解构，例子
》解构参数,例子
1.必须传值的解构参数
2.解构参数的默认值
*/
// 对象解构
let node = {
    type: "Identifier",
    name: "foo"
};
let {type, name} = node;
// 解构赋值，例子
let node = {
    type: "Identifier",
    name: "foo"
},
type = "Literal",
name = 5;
({ type, name } = node); //一定要用小括号包裹解构赋值语句，js酱一对花括号视为一个代码块，但是代码块不允许出现在
//赋值语句左侧，所以加上小括号。

// 默认值，例子
let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name, value } = node;
let { type, name, value = true } = node;
console.log(type); //"Indentifier"
console.log(name); //"foo"
console.log(value); //undefined或者true

// 3.为非同名局部变量赋值，例子
let node = {
    type: "Indentifier",
    name: "foo"
};
let { type: localType, name: localName } = node;
console.log(localType); //"Identifier"
console.log(localName); //"foo"

// 4.嵌套对象解构
let node = {
    type: "Indentifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
}; 
let { loc: { end } } = node;  //end: {line: 1, column: 4}
//上面的语句中，冒号前面的标识符代表在对象中的检索位置，右侧为被赋值的变量名。
// 也可以使用一个与对象属性名不同的局部变量名
let { loc: { start:  localStart }} = node;  
console.log(localStart.line); //1
console.log(localStart.column); //1

// 数组解构，变量声明
let colors = [  "red", "green", "blue" ];
let [ firstColor, secondColor ] = colors;
console.log(firstColor); //red;
console.log(secondColor); //green

let [ , , thirdColor] = colors;
console.log(thirdColor); //blue

// 默认值，例子
let colors = [ "red" ];
let [color1, color2 = "blue"] = colors;
//red, blue

//嵌套数组解构
let colors = [ "red", [ "green", "lighegreen" ], "blue" ];
let [ firstColor, [ secondColor ] ] = colors;
console.log(firstColor); //"red"
console.log(secondColor); //green

// 不定元素
let colors = [  "red", "green", "blue" ];
let [ firstColor, ...restColors ] = colors;
//firstColor: red
//restColors: [green, blue]

//es5数组复制
colors.concat();

//es6数组复制
let [ ...cloneColors ] = colors; 

// 混合解构，例子
let node = {
    type: "Indentifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    },
    range: [0,3]
}; 
let {
    loc: { start },
    range: [ startIndex ]
} = node;
console.log(start.line); //1
console.log(start.colunm); //1
console.log(startIndex); //0

// 解构参数
function setCookie(name, value, { secure, path, domain, expires }){

}
setCookie("type", "js", {
    secure: true,
    expires: 60000
})
// 必须传值的解构参数 
setCookie("type", "js"); //报错
// 解决方法，设置默认值
function setCookie(name, value, { secure, path, domain, expires } = {}){

}
//也可以为解构参数提供默认值
function setCookie(name, value, {
    secure = false,
    path = "/",
    domain = "example.com",
    expires = new Date(Date.now() + 360000000)
} = {
    secure: false,
    path : "/",
    domain : "example.com",
    expires : new Date(Date.now() + 360000000)
})

