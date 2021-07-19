"use strict";

// non-mutating original array
// filter: 注入判定函数，只返回通过判定的元素。因为此操作不改变原数组，通常将返回数组赋值给新变量。
// const cssLessons = lessons.filter(lesson => {
//     return lesson.category.toLowerCase() === 'css';
// })
// console.log(cssLessons)


// const titleArr = lessons.map(lesson => {
//     return lesson.title
// })

// console.log(titleArr)

// lessons = lessons.map(lesson => {
//     lesson.title = `${lesson.title}-new version`;
//     return lesson;
// })
// console.log(lessons)

// const user = [
//     { name: "李四", js: 89 },
//     { name: "马六", js: 55 },
//     { name: "张三", js: 78 }
// ];
// const resust = user.every(user => user.js >= 60);
// console.log(resust);

let lessons = [
	{title: '媒体查询响应式布局',category: 'css'},
  {title: 'FLEX 弹性盒模型',category: 'css'},
	{title: 'MYSQL多表查询随意操作',category: 'mysql'}
];

// lessons.forEach(lesson => {
//     lesson.title = `${lesson.title}-new`;
// })
// console.log(lessons)

// const arrayMax = (arr) => {
//     let max = arr[0];
//     for (const el of arr) {
//         max = el > max ? el : max
//     }
//     return max;
// }
// console.log(arrayMax([1,7,176,44,99]))

// function countArrayELem(array, elem) {
//     const result = array.reduce((total,cur) => {
//         if (cur == elem) {
//             total +=1;
//         }
//         return total;
//     },0)
//     return result;
// }

// const arrMax = (arr) => {
//     const result = arr.reduce((max,cur) => {
//         return cur > max ? cur : max;
//     }, arr[0])
//     return result;
// }

// let numbers = [1, 2, 1,3, 1,88, 5];
// console.log(arrMax(numbers, 1));

// let cart = [
//     { name: "iphone", price: 12000 },
//     { name: "imac", price: 25000 },
//     { name: "ipad", price: 3600 }
// ];
// const maxPrice = (arr) => {
//     const result = arr.reduce((maxEl,cur) => {
//         return cur.price > maxEl.price ? cur : maxEl;
//     },arr[0]);
//     return result;
// }
// console.log(maxPrice(cart))

// const totalPrice = (arr) => {
//     const result = arr.reduce((total,cur) => {
//         return total += cur.price;
//     },0);
//     return result;
// }
// console.log(totalPrice(cart))

let goods = [
    { name: "iphone", price: 12000 },
    { name: "imac", price: 25000 },
    { name: "ipad", price: 3600 }
];
// function getNameByPrice(array, price) {
//     const result = array.filter(el => {
//         if (el.price > price) {
//             return el;
//         }
//     })
//     return result;
// }
// function getNameByPrice(array, price) {
//     const result = array.reduce((goodsQualified,cur) => {
//         if (cur.price > price) {
//             goodsQualified = [...goodsQualified,cur]
//         }
//         return goodsQualified
//     },[]);
//     return result;
// }
// console.log(getNameByPrice(goods,10000))

// let arr = [1, 2, 6, 2, 1];
// let filtered = arr.reduce((newArr,cur) => {
//     if (!newArr.includes(cur)) newArr = [...newArr,cur]
//     return newArr;
// },[])

// console.log(filtered)
// console.log(arr)
// let name = "summer";
// let object = {
//     name,
//     age: 27,
//     get() {
//         return this.name;
//     }
// }

// console.log(object.get())
// let lisi = {
//     name: "李四",
//     age: 22,
//     grade: {
//       math: 99,
//       english: 67,
//       js: 30
//     },
//     avgGrade() {
//         let total = 0;
//         for (const key in this.grade) {
//             total += this.grade[key];
//         }
//         return total / this.courseNum()
//     },
//     courseNum() {
//         let count = 0;
//         for (const key in this.grade) {count++;}
//         return count;
//     }
// }
// console.log(lisi.avgGrade());

// function hd() {
//     return {
//       name: '后盾人',
//       url: 'houdunren.com'
//     };
// }
// let {name: myName, url: myUrl} = hd();
// console.log(myName,myUrl)

// function hd({name,age}) {
//     console.log(name,age);
// }

// hd({name: "summer", age: 27})

// 嵌套解构
// const hd = {
//     name:'后盾人',
//     lessons:{
//       title:'JS'
//     }
// }
// const {name,lessons:{title}} = hd;
// console.log(name,title)
// let obj = { name: '后盾人'};
// let myPrototype = {parent: "mama"};
// Object.setPrototypeOf(obj,myPrototype);
// // 查找自身属性 （不查找原型链）
// console.log(obj.hasOwnProperty("name"))
// // 查找原型链
// console.log("parent" in obj)

// array iterator
// const arr = ["a", "b", "c", "后盾人"];
// for (const key of arr.keys()) {
//   console.log(key);
// }

// const hd = {
//     name: "后盾人",
//     age: 10
// };
// const arr = [10,22]
// console.log(Object.entries(arr));
// for (const [k,v] of Object.entries(hd)) {
//     console.log(k,v)
// }

// 浅拷贝(shallow copy)
// 因为赋值是传址，当更改其中一个object我们不希望另一个也被更改。此时需要用到深拷贝和浅拷贝
// let obj = {name: "后盾人"};
// let dup = {};
// for (const key of Object.keys(obj)) {
//     dup[key] = obj[key];
// }
// dup.age = 30
// console.log(obj)
// console.log(dup);

// 深拷贝(deep copy) 运用于当有nested object
let obj = {
    name: "后盾人",
    user: {
      name: "hdcms"
    },
    data: []
};
// 运用recursion确保内部nested object是已经经过浅拷贝的返回值
function copy(obj) {
    let dupObj = obj instanceof Array ? [] : {};
    for (const [k,v] of Object.entries(obj)) {
        dupObj[k] = typeof v == "object" ? copy(v) : v;        
    }
    return dupObj;
}
let hd = copy(obj);
hd.data.push("向军");
hd.user.name = "changed name"
console.log(JSON.stringify(hd, null, 2));
console.log(JSON.stringify(obj, null, 2));
// {
//   "name": "后盾人",
//   "user": {
//     "name": "changed name"
//   },
//   "data": [
//     "向军"
//   ]
// }
// {
//   "name": "后盾人",
//   "user": {
//     "name": "hdcms"
//   },
//   "data": []
// }
