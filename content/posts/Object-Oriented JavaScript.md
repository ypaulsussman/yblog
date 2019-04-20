---
title: Object-Oriented JavaScript (Stefanov, Stoyan)
date: "2018-01-01"
template: "post"
draft: false
slug: "/posts/oo-js-notes/"
category: "What I Read"
tags:
  - "Packt"
  - "OOP"
  - "JavaScript"
description: "Notes from a book I read one winter. (Tagline: \"The book begins with the basics of object-oriented programming in JavaScript and then gradually progresses to cover functions, objects, and prototypes, and how these concepts can be used to make your programs cleaner, more maintainable, faster, and compatible with other programs/libraries.\")"
---

## History

JavaScript encompasses three pieces:

- **ECMAScript** — the core language (variables, functions, loops, and so on.) This is independent of the browser and can be used in many other environments.
- The **Document Object Model** (DOM), which provides ways to work with HTML and XML documents.
  - Initially, JavaScript provided limited access to what was scriptable on the page (mainly forms, links, and images.)
  - Later it was expanded to make all elements scriptable.
  - This lead to the creation of the DOM standard, by the World Wide Web Consortium (W3C), as a language-independent way to manipulate structured documents.
- The **Browser Object Model** (BOM), which is a set of objects related to the browser environment. It began when HTML5 started standardizing some of the common objects that exist across browsers.

The `XMLHttpRequest` object was once an IE-only innovation, but was then implemented by most other browsers.

- `XMLHttpRequest` allows JavaScript to make HTTP requests and get fresh content from the server in order to update some parts of a page without a full page reload.
- Due to the wide use of `XMLHttpRequest`, a new breed of desktop-like web applications, dubbed Ajax applications, was born.

---

## Datatypes

There are five primitive data types:

1. `number`: This includes floating point numbers as well as integers.
2. `string`: These consist of any number of characters.
3. `boolean`: This can be either true or false.
4. `undefined`: When you try to access a variable that doesn't exist, you get the special value `undefined`. The same happens when you declare a variable without assigning a value to it yet.
5. `null`: This is another special data type that can have only one value: it means no value, an empty value, or nothing. The difference from `undefined` is that if a variable has a value `null`, it's still defined, it just so happens that its value is nothing.

Any value that doesn't belong to one of the five primitive types listed above is an object. (Even `typeof null` evaluates to `object`, not `null`, for legacy reasons!)

---

Careful: when a number starts with a `0`, it's considered an octal number. For example, the octal `0377` is the decimal `255`:

```javascript
var n3 = 0377;
typeof n3;
// "number"
n3;
// 255
```

Similarly, you put `0x` before assigning a hexadecimal value.

---

The biggest number JavaScript can handle is `1.7976931348623157e+308`, while the smallest is `5e-324`.

There is a special value in JavaScript called `Infinity`, which...

- represents a number too big for JavaScript to handle, but is nonetheless
- a number datatype.

---

Note that, despite its name, "Not a Number", `NaN` is a special value that is also a `Number` datatype.

When you use a number-like string (for example var foo = "1";) as an operand in an arithmetic operation, the string is converted to a number behind the scenes. This works for all arithmetic operations except addition.

`\u` followed by a character code allows you to use Unicode.

---

If you add a new element, but leave a gap in the array, the elements between don't exist and return undefined if accessed:

```javascript
var a = [1, 2, 3];
a[6] = "new";
// "new"
a;
// [1, 2, 3, undefined, undefined, undefined, "new"]
```

Note that you can use the array notation on a string to access individual characters:

```javascript
var s = "one";
s[0];
// "o"
s[1];
// "n"
s[2];
// "e"
```

---

## Loops

`for` and `forEach` loops are often functionally equivalent:

```javascript
for (var i = 0; i < arr.length; i++) {
  console.log("Element", i, "is", arr[i]);
}

arr.forEach(function(element, i) {
  console.log("Element", i, "is", element);
});
```

---

`for...in` iterates through the enumerable properties of an object (the keys) or array (the indices):

```javascript
var arr = ["Mike", "Steven"];
for (var i in arr) {
  console.log(i);
  console.log(i + " is " + arr[i]);
}

// ("0 is Mike");
// ("1 is Steven");
```

---

`for...of` iterates through the values of an object/array:

```javascript
var arr = ["Mike", "Steven"];
for (var person of arr) {
  console.log(person);
}

// ("Mike");
// ("Steve");
```

---

## Functions

A function always returns a value. If it doesn't return a value explicitly, it implicitly returns the value `undefined`.

In a **Uniform Resource Locator** (URL), some characters have special meanings. If you want to escape special characters, you can use the functions `encodeURI()` or `encodeURIComponent()`.

- The first one will return a usable URL, while the second one assumes you're only passing a part of the URL, such as a query string.
- The functions `escape()` and `unescape()` encode differently, are deprecated, and should not be used.

`alert()` is not part of the core JavaScript (it's nowhere to be found in the ECMA spec), but it's provided by the host environment, the browser.

- Bear in mind that it blocks the browser thread, meaning that no other code will be executed until the user closes the alert.
- So, if you have a busy Ajax-type application, it's generally not a good idea to use it.

---

## Objects

The host environment provides a global object and all global variables are accessible as properties of the global object.

- If your host environment is the web browser, the global object is called `window`.
- You can also access the global object by using `this` outside a constructor function, (i.e. in the global program code, outside any function.)

---

When you assign an object to a different variable or pass it to a function, you only **pass a reference** to that object. Consequently, if you make a change to the reference, you're actually modifying the original object:

```javascript
let original = {
  howmany: 1
};
let mycopy = original;

mycopy.howmany;
// 1;

mycopy.howmany = 100;
// 100;

original.howmany;
// 100;
```

JavaScript’s built-in objects can be divided into three groups:

- **Data wrapper objects**: These are `Object`, `Array`, `Function`, `Boolean`, `Number`, and `String`. These objects correspond to the different data types in JavaScript. There is a data wrapper object for every different value returned by `typeof` , with the exception of `undefined` and `null`.
- **Utility** objects: These are `Math`, `Date`, and `RegExp`.
- **Error objects**: These include the generic `Error` object as well as other more specific objects that can help your program recover its working state when something unexpected happens.

---

Function objects have `call()` and `apply()` methods. These methods allow your objects to "borrow" methods from other objects and invoke them as their own. This is an easy and powerful way to reuse code:

```javascript
var some_obj = {
  name: "Ninja",
  say: function(who) {
    return "Haya " + who + ", I am a " + this.name;
  }
};

some_obj.say("Dude");
// ("Haya Dude, I am a Ninja");

var my_obj = { name: "Scripting guru" };

some_obj.say.call(my_obj, "Dude");
// ("Haya Dude, I am a Scripting guru");
```

By passing two parameters (the object `my_obj` and the string `'Dude'`) to the `call()` method of the `say()` function object, the references to the this value will point to `my_obj`.

The method `apply()` works the same way as `call()`, bul all parameters are passed in as an array. The following two lines are equivalent:

```javascript
some_obj.someMethod.apply(my_obj, ["a", "b", "c"]);
some_obj.someMethod.call(my_obj, "a", "b", "c");
```

---

To differentiate between objects and arrays, use the `Object` object's `toString()`method. It gives you the internal class name used to create a given object:

```javascript
Object.prototype.toString.call({});
// ("[object Object]");

Object.prototype.toString.call([]);
// ("[object Array]");
```

Note: if you call the Array object's `toString()` method, it will give you a different result, as it's been overridden for the specific needs of arrays.

---

`Math` is a built-in global object that provides a number of methods and properties for mathematical operations.

If you call `Date()` without `new`, you get a string representing the current date, whether or not you pass any parameters.

If you call `new Date()` (i.e., without any parameters), you get an object instantiated with today's date/time.

You can create a specific date/time object by passing `new Date()`...

```javascript
// A date-like string:
new Date('2015 11 12');
// Thu Nov 12 2015 00:00:00 GMT-0800 (PST)
new Date('12 11 2015');
// Thu Nov 12 2015 00:00:00 GMT-0800 (PST)
new Date('12 nov 2015 5:30');
// Thu Nov 12 2015 05:30:00 GMT-0800 (PST)

// Separate values for day, month, time, and so on:
new Date(2015, 0, 1, 17, 05, 03, 120);
// Tue Jan 01 2015 17:05:03 GMT-0800 (PST)
new Date(2015, 0, 1, 17);
// Tue Jan 01 2015 17:00:00 GMT-0800 (PST)
// Watch out for the fact that the month starts from 0, so 1 is February:
new Date(2016, 1, 28);
// Sun Feb 28 2016 00:00:00 GMT-0800 (PST)

// A timestamp:
new Date(1357027200000);
// Tue Jan 01 2013 00:00:00 GMT-0800 (PST)
```

---

## The Browser Environment

DOM: Objects that have to do with the currently loaded page (the page === the document)

BOM: Objects that deal with everything outside the page (e.g. the browser window and the desktop screen)

---

All of the core JavaScript functions are methods of the global object:

```javascript
parseInt("123");
// 123;
window.parseInt("123");
// 123;
```

There's a `window` object for every frame, iframe, pop-up, or browser tab.

---

`window.navigator.userAgent` is a long string of browser identification:

```javascript
window.navigator.userAgent;
// ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_3) AppleWebKit/536.28.10 (KHTML, like Gecko) Version/6.0.3 Safari/536.28.10");
```

Avoid user agent sniffing: some browsers allow users to modify the string and pretend they are using a different browser.

---

The `window.location` property points to an object that contains information about the URL of the currently loaded page. There are also three methods that location provides:
`reload()`, `assign()`, and `replace()`.

- `replace()` is almost the same as `assign()`, but it doesn't create an entry in the browser's history.
- As an alternative to `window.location.reload`, you can assign `location.href` to itself:

```javascript
window.location.href = window.location.href;
```

---

`window.history` allows limited access to the previously visited pages in the same browser session:

- you can see the length of the history, but not the actual URLs;
- you can navigate with `history.forward`, `history.back`, and `history.go()`

The **HTML5 History API** lets you change the URL without reloading the page. (This is perfect for dynamic pages because they can allow users to bookmark a specific URL, which represents the state of the application, and when they come back the page can restore the application state based on the URL.)

---

`window.frames` is a collection of all of the frames in the current page. It doesn't distinguish between frames and iframes.

- In order to tell if there are any frames on the page, you can check the `.length` property.
- You can use `.top` to access the top-most page (the one that contains all the other frames) from within any frame.
- To get access to a specific iframe's window, you can do any of the following:

```javascript
window.frames[0];
window.frames[0].window;
window.frames[0].window.frames;
frames[0].window;
frames[0];
// If a frame has a `name` attribute, e.g. 'myframe' below, you can also access by that:
window.frames["myframe"];
```

---

`window.screen` provides information about the environment outside the browser (e.g. color depth, width, height.)

`window.open()` / `.close()` / `.moveTo()` / `.resizeTo()` are mostly relics of early shady popup tactics; avoid them if at all possible.

`window.setTimeout()` and `window.setInterval()` add the function to the browser’s queue after that time (repeatedly, in the latter case.)
Note: 100 milliseconds timeout means “add to the queue after 100 milliseconds.” But if the queue is delayed by something slow happening, your function will have to wait and execute after, say, 120 milliseconds.

`window.document` is a BOM object that refers to the currently loaded document (page). Its methods and properties fall into the DOM category of objects.

---

The Document Object Model (DOM) represents an XML or an HTML document as a tree of nodes.

- You can use DOM methods and properties to [access, add, remove, modify, etc] any element on the page.
- The DOM is a language-independent API.
- There is a Core DOM specification that is applicable to all XML documents, and there is also an HTML DOM specification, which extends and builds upon the core DOM.

---

There are four HTML properties of `window.document` for which there are no core DOM equivalents:

1. `document.cookie` is a property that contains a string. This string is the content of the cookies exchanged between the server and the client.
   1. When the server sends a page to the browser, it may include the Set-Cookie HTTP header.
   2. When the client sends a request to the server, it sends the cookie information back with the Cookie header.
   3. Using `document.cookie` you can alter the cookies the browser sends to the server.
1. `document.title` allows you to change the title of the page displayed in the browser window. Note that it doesn’t change the `<title>` element, but only the display in the browser window: so it's not equivalent to `document.querySelector('title')`.
1. `document.referrer` tells you the URL of the previously-visited page.
   1. This is the same value the browser sends in the Referer HTTP header when requesting the page.
   2. Note: Referer is misspelled in the HTTP headers, but is correct in JavaScript's `document.referrer`.
1. `document.domain` gives you access to the domain name of the currently loaded page. This is commonly used when you need to perform [domain relaxation.](https://en.wikipedia.org/wiki/Same-origin_policy#document.domain_property)

---

## Coding and Design Patterns

Generally, a function with more than three parameters is not convenient to call because you have to remember the order of the parameters (and it is even more inconvenient when some of the parameters are optional.) Instead of having many parameters, you can use one parameter and make it a **configuration object**.

JavaScript doesn't have a special syntax to denote **private properties or methods**, but you can use local variables/methods inside a function to achieve the same level of protection.

In JavaScript, because there are no classes, a **singleton** is the default and most natural pattern. Every object is a singleton object.

The **factory** can help when you have similar types of objects and you don't know in advance which one you want to use. Based on user input or other criteria, your code determines the type of object it needs on the fly.

Instead of using **inheritance** where you extend in a linear way (parent-child-grandchild), you have one base object and a pool of **decorator objects** that provide extra functionality. Your program can pick and choose which decorators it wants and in which order.

When implementing the **observer pattern** you have the following objects:

- One or more **publisher** objects that announce when they do something important.
- One or more **subscribers** tuned in to one or more publishers. They listen to what the publishers announce and then act appropriately.
