# Javascript Review
## Table of contents
  - [Data and structure types](#data-and-structure-types)
  - [Scope and closure](#scope-and-closure) 
  - [Foundamental Objects](#foundamental-objects )
  - [Inheritance and the prototype chain](#inheritance-and-the-prototype-chain)
  - [Concurrency model and event loop](#concurrency-model-and-event-loop)
  - [Asynchronous and synchronous](#asynchronous-and-synchronous) 
  - [Promise](#promise)
  - [DOM](#dom)

## Data and structure types
#### Six Data Types:
* undefined : typeof instance === "undefined"
* Boolean : typeof instance === "boolean"
* Number : typeof instance === "number"
* String : typeof instance === "string"
* BigInt : typeof instance === "bigint"
* Symbol : typeof instance === "symbol"
#### Structure types:
 * object
 * function
 
## Scope and closure
Scope determines the accessibility of variables.
* ##### Local variables:
    Local variables have Function scope: They can only be accessed from within the function.
* ##### Global variables:
    A global variable has global scope: All scripts and functions on a web page can access it. 
* ##### Life time:
    Global variables live until the page is discarded, like when you navigate to another page or close the window.
    Local variables have short lives. They are created when the function is invoked, and deleted when the function is finished.

A closure gives you access to an outer function’s scope from an inner function. 
* ##### Lifetime: 
    Closures are created every time a function is created, at function creation time.
* ##### Purpose:
    Global variables can be made local (private) with closures.

## Foundamental Objects 
* Object
* Function
* Boolean
* Symbol

### Object (构造函数)
Nearly all objects in JavaScript are instances of Object (includes Function); a typical object inherits properties (including methods) from **Object.prototype**, although these properties may be overridden.
* Create object using the Object() constructor

```js
new Object()
new Object(value)
```

* Create object using object initializer 

```js
const person = {
  isHuman: true,
  printIntroduction: function() {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = 'Summer'; // "name" is a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten
```

* Create object using literal

```js
const object = { a: 'foo', b: 42, c: {} };
```

### Function (构造函数)
Every JavaScript function is actually a Function object. This can be seen with the code (function(){}).constructor === Function, which returns true.     

## Inheritance and the prototype chain
### Prototype and prototype chain
Each object has a private property which holds a link to another object called its **prototype**.

That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

<div align="center"><img src="/assets/images/build_in_prototypechain.png" width="70%"  /></div>
<div align="center"><img src="/assets/images/javascript_prototype_chain.png" width="90%"  /></div>
<div align="center"><small>Images from <a>https://chamikakasun.medium.com/javascript-prototype-and-prototype-chain-explained-fdc2ec17dd04</a></small></div>  

Here is an simple example:

```js
//define a Function object
function User() {} 
//create an object with constructor function
let user1 = new User()  
``` 

<div align="center"><img src="/assets/images/prototypechain_example.png" width="90%"  /></div>
example code: 

```js
User.prototype.show = function() {
    console.log('show detail');
}
user1.show(); //'show detail'

User.__proto__.view = function() {
    console.log('view user info');
}
User.view(); //'view user info'
``` 
  
#### Object.prototype.constructor
The constructor property returns a reference to the Object constructor function that created the instance object.
The `new` keyword **constructs and returns** an object (**instance**) of a constructor function.

```js
let o = {}
o.constructor === Object // true
let o = new Object
o.constructor === Object // true
let a = new Array
a.constructor === Array // true
```

another example:

```js
function Tree(name) {
  this.name = name
}

let myTree = new Tree('Redwood')
console.log('theTree.constructor is ' + myTree.constructor)
``` 

This example displays the following output:

```js
theTree.constructor is function Tree(name) {
  this.name = name
}
```

### Inheritance
#### Object inherits with creating a new prototype
The `Object.create()` method creates a new object, using an existing object as the prototype of the newly created object.

```js
...
function Admin() {}
Admin.prototype = Object.create(User.prototype);  
Admin.prototype.role = function() {
    console.log('Admin.role')
} 

function Member() {}
Member.prototype = Object.create(User.prototype);
Member.prototype.role = function() {
    console.log('Member.role')
} 
``` 

Original prototype chain:
![PrototypeChain](/assets/images/prototypechainoriginal.jpg)
prototype chain after inheritance:
![PrototypeChain](/assets/images/prototypechaincreate.jpg)

#### Object inherits without dropping the original prototype   
Example below shows how objects Admin and Member inherit their properties from User.

```js
function User() {}
User.prototype.name = function() {
    console.log('user.name');
} 

function Admin() {}
Admin.prototype.__proto__ = User.prototype;
Admin.prototype.role = function() {
    console.log('Admin.role')
} 

function Member() {}
Member.prototype.__proto__ = User.prototype;
Member.prototype.role = function() {
    console.log('Member.role')
} 
``` 

prototype chain after inheritance:
![PrototypeChain](/assets/images/prototypechainafter.jpg)

Notice* Avoid code below:

```js
Admin.prototype = User.prototype;
Member.prototype = User.prototype;
```

It will cause User, Admin and Member share the same prototype so that unable to add prototype method for individual.
![PrototypeChain](/assets/images/prototypechainavoid.jpg)


## Concurrency model and event loop
#### Code Execution priority: 
-> **synchronous code** 
-> **microtasks**(eg: function in 'promise then'; callback function returned after asynchronous operation done)
-> **tasks**(eg: setTimeOut(); other aysnchronous code)

## Asynchronous and synchronous
JavaScript is **single-threaded**. 
> Asynchronous refers to two or more objects or events not existing or happening at the same time.
 
> Synchronous is refers to real-time communication where each party receives messages instantly.
  
#### Execute complete task without blocking other code
When deal with complecated task, using synchrnous code will cause blocking (or block DOM rendering). In this case, process the task as a microtask is better.

Below are two examples of asynchronous code block: 
* ##### Process as Task:
 
    ```js
    function task(num) {
        return new Promise(resolve => {
            setTimeout(() => {
                let count = 0;
                for (let i === 0; i < num; i++) {
                    count += num--;
            }
            resolve(count)
            })
        })
    }
    task(99999999)
    console.log('synchronous code');
    ```
* ##### Process as Microtask:
 
    ```js
    async function task(num) {
        let res = await Promise.resolve().then( _ => {
            let count = 0;
            for (let i === 0; i < num; i++) {
                count += num--;
            }
            return count;  
        });
        console.log(res); 
    }
    task(99999999);    
    console.log('synchronous code');
    ```


## Promise
>A Promise is an object representing the eventual completion or failure of an asynchronous operation. Promise is synchronous code.


* Basic syntax
`then` will be executed after `promise` status updated. The first function will be executed after `promise` status changed from `pending` to `fulfilled`. The second function will be executed after `promise` status changed from `pending` to `rejected` (not recommend to handle `reject` in `then`).     

```js
const promise = new Promise((resolve, reject) => {
    resolve('success')  //either resolve or reject
    //reject('fail') 
}).then(
    msg => {
        console.log(`resolved{msg}`)
    }，
    err => {
        console.log(`rejected: {err}`)
    }
)
```

* `then` will process the `rejected` or `resolved` from prior `promise`. However, each `then` is also a `promise` which by default pass a `fullfilled` status to the next.
 
```js
new Promise((resolve, reject) => {
    reject('failed')
}).then(
    resolve => console.log('received fullfilled status')，
    reject => console.log('received rejected status')

).then(
    resolve => console.log('received fullfilled status')，
    reject => console.log('received rejected status')

).then(
    resolve => console.log('received fullfilled status')，
    reject => console.log('received rejected status')
)
  //console print below
  received rejected status
  received fullfilled status
  received fullfilled status
```

* `catch` is recommend to use for handle rejected status. 
 
```js
new Promise((resolve, reject) => {
  reject(new Error('request failed));
})
.then(msg => {})
.then(msg => {})
.catch(error => {
  console.log(error);
});
``` 

```js
new Promise((resolve, reject) => {
  resolve();
})
.then(() => {
  return new Promise((resolve, reject) => {
    reject('.then failed');
  });
})
.then(() => {})
.catch(msg => {
  console.log(msg);
});
```

### AJAX 
(Asynchronous JavaScript and XML)
The `XMLHttpRequest` API is the core of `Ajax`. `Ajax` is used for making asynchronous request to a server to transfer data, and load any returned data into the page.
#### Advantage
* Page load faster (async)
* Request and transfer happen in the back
* Only the necessary area of page refresh when the browser receives new data. 
#### Create an `Ajax` using `promise` and consume it

```js
function ajax(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = function() {
      if (this.status == 200) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this);
      }
    };
  });
}

ajax("fakeapi/user?name=Summer")
.then(user =>ajax(`fakeapi/order?id=${user["id"]}`))
.then(order => {
  console.log(order);
});
```

#### Async load image

```js
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = file;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
    document.body.appendChild(image);
  });
}

loadImage("images/houdunren.png").then(image => {
  image.style.border = "solid 20px black";
  console.log('style applied');
});
```

### async/await
`async/await` is recommended for creating `promise`.

```js
async function task(message) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(message);
    }, 2000);
  });
}
async function run() {
  let task1 = await task('foo');
  console.log(task1);
  let task2 = await task('bar);
  console.log(task2);
}
run();
```

Examples of using `then` and `async/await`:  

```js
function getOrders() {
    ajax("fakeapi/user?name=Summer")
    .then(user =>ajax(`fakeapi/order?id=${user["id"]}`))
    .then(orders => {
    console.log(orders);
    });
} 

async function getOrdersAsync() {
    let user = await(ajax('fakeapi/user?name=Summer'))
    let orders = await(ajax(`fakeapi/order?id=${user["id"]}`)) 
    console.log(orders)
}
```

## DOM