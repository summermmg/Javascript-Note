# Javascript Review
## Table of contents
  - [Data and structure types](#dataandstructure)
  - [Scope and closure](#scopeandclosure) 
  - [Foundamental Objects](#FoundamentalObjects)
  - [Inheritance and the prototype chain](#prototype)
  - [Promise](#promise) 

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

```
new Object()
new Object(value)
```
* Create object using object initializer 
```
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
```
const object = { a: 'foo', b: 42, c: {} };
```
### Function (构造函数)
Every JavaScript function is actually a Function object. This can be seen with the code (function(){}).constructor === Function, which returns true.     

## Inheritance and the prototype chain
### Prototype and prototype chain
Each object has a private property which holds a link to another object called its **prototype**.

That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. By definition, null has no prototype, and acts as the final link in this prototype chain.

Here is an simple example:
```
//define a Function object
function User() {} 
//create an object with constructor function
let user1 = new User()  
``` 
See prototype chain below:
![PrototypeChain](/assets/images/prototypechainexample.jpg)

example code: 
```
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
```
let o = {}
o.constructor === Object // true
let o = new Object
o.constructor === Object // true
let a = new Array
a.constructor === Array // true
```
another example:
```
function Tree(name) {
  this.name = name
}

let myTree = new Tree('Redwood')
console.log('theTree.constructor is ' + theTree.constructor)
``` 
This example displays the following output:
```
theTree.constructor is function Tree(name) {
  this.name = name
}
```

### Inheritance
#### Object inherits without dropping the original prototype   
Example below shows how objects Admin and Member inherit their properties from User.

```
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
Original prototype chain:
![PrototypeChain](/assets/images/prototypechainoriginal.jpg)
prototype chain after inheritance:
![PrototypeChain](/assets/images/prototypechainafter.jpg)

Notice* Avoid code below:
```
Admin.prototype = User.prototype;
Member.prototype = User.prototype;
```
It will cause User, Admin and Member share the same prototype so that unable to add prototype method for individual.
![PrototypeChain](/assets/images/prototypechainavoid.jpg)

#### Object inherits with creating a new prototype
```
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
prototype chain after inheritance:
![PrototypeChain](/assets/images/prototypechaincreate.jpg)

## Promise
A Promise is an object representing the eventual completion or failure of an asynchronous operation.