---
title: JavaScript - The Hard (and New Hard) Parts (Sentance, Will)
date: "2018-05-21"
template: "post"
draft: true
slug: "/posts/js-hard-parts-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "JavaScript"
description: "Notes from a FEM video I watched, and its extension workshop, which I attended. (Taglines for each: \"This course will give you a solid understanding of callbacks and higher order functions, closure, asynchronous JavaScript, and object-oriented JavaScript!\" and \"In this course, you will develop an intuitive understanding of the new features of JavaScript in ES6+ - iterators, generators, promises, and async/await.\")"
---

## Threading, Execution Contexts, and the Call Stack

What happens when JavaScript executes our code?
* It processes it line by line.
   * Traditionally was done as an interpreted language, which means line by line. 
   * Now it uses just-in-time compilation, at least in the Chrome JavaScript runtime. (This does all sorts of very small optimizations around which bits gets assigned to memory first.)
* It creates memory for variables. 
   * It assigns data to labels (`var`, `let`, `const`) in memory.
   * It makes the data available by the label.

When Javascript start running our code, it first creates a **global execution context**.
* How many things can the thread of execution do at a time in JavaScript? It’s single threaded, so 1.
* And in which order do we do these things? Synchronously.

---

How do we tell JavaScript to define a function? Keyword `function`. 

How do I tell JavaScript to call a function? I take the name of the function and add parentheses. 

Whatever's after the `return` keyword inside the function, that is what's gonna be stored in output. 

Until you call a given function, the thread will never actually weave its way inside the function.

Before we were doing the code globally, now we're doing the code inside the function line by line.

And we've paused doing the code globally.

We finished running the function; what happens to the **local execution context**?  It gets erased, gets removed except for the return value which gets stored in output.

---

What if I ran another function inside of a function? What if I ran a function recursively? How do I keep track of all these? With the **call stack**. 
* It's a special data structure that allows us to track where the thread of execution currently is in my code.
* The stack is a data structure of the LIFO format (the most-recent thing you put in is the first thing you’ll take out.)
* Whatever is at the top of the call stack, is the location of JavaScript's thread: where it is, currently, where it’s running my code.
   * What’s the first execution context on my call stack? The global execution context.
   * When you next call a function, say foo(), you push that function’s local execution context onto the stack and now you’re inside it.
   * So when you finish running foo(), JavaScript closes that execution context, pops foo() off the call stack, and goes back to global.

If we have one JavaScript application running it has one call stack. You can have multiple separate JavaScript call stacks when you use things like web workers.

If the function is declared after it's called, this is a concept known as **hoisting**. 

So, what does calling a function create? A brand new execution context. Within JavaScript, this is powerful, and fundamental.

---

## Functional Programming

### Pure functions
* No side effects:
   * If you call a function, you don't then change other parts of the program.
   * Its only consequence is determined by the return value.
   * It's not mutating anything in global memory.
   * This makes writing tests to evaluate whether our code is working much easier.
* No passing by reference:
   * If I pass in an input like an array or an object to my function, it will then be referencing the globally defined object or array.
   * If I mutate that object/array directly inside of my function body, I'll actually be mutating the globally-defined version: again, problematic.

### Higher-order functions
* This is a function that can take in another function. 
* It can have other functions inside it: it's of a higher order.
* The callback function is the little baby one that gets passed in.
* You thus determine some of that functionality only when you call the function (by passing in that functionality as a parameter.) 
* [This challenge](http://csbin.io/callbacks) introduces higher-order functions.
* Note: a function that returns a function is also considered a higher-order function.

### Functions as first-class citizens
* They behave just like objects. They are actually, literally, objects. 
* I can pass objects into a function because objects can be values on the right hand side of a label. 
* Functions can be assigned to variables, known as function expressions. 
* They can be properties of other objects (methods.) 
* JavaScript functions have just one bonus property besides just being objects: they can be invoked. They can have parens on the end of them.

---

## Closures
Live data is stored in-memory as my app runs.
* Every time I call a function, I create a local store for it.  
* When that function finishes executing, its local memory is garbage collected (except the return value.)

What if functions could hold on to some live data between executions, to have some associated persistent memory?

From high order functions, we know we can return a function from a function, and then store it in a new label globally and run it by that new label:

```javascript
function makeFunc() {
   const name = 'Mozilla';
   function displayName() {
     alert(name);
   }
   return displayName;
}
var myFunc = makeFunc();
myFunc(); // this will produce an alert with ‘Mozilla’!
```

A closure is the combination of a function and the lexical environment within which that function was declared.

Closure exercises [are available here.](http://csbin.io/closures)

Where you define your function determines what data will be available, when you end up calling that function. You make a special bond to the current, surrounding local memory:

```javascript
function makeAdder(x) {
   return function (y) {
     return x + y;
   };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

This is why it's so powerful to design a function inside another function: you don’t just get a function out. You get a function plus a mini-cache, a backpack of live data (a closure.)

This can be very useful to once-ify, or make a function only be allowed to be run once. 

You can also memo-ize: if you have a function that e.g. finds primes? To find the 1000th prime number, you've gotta find all the prime numbers up to that as well. 
* It's a complicated, demanding task. It takes lots of steps. You don't want to have to recalculate 1000 when you already ran 1000 in it a few seconds ago.
* So, because you’ve closured, you have an object in the backpack: and in there you can make a key, 1,000, and you make a value, the associated 1,000th prime number from the time you just ran it then.
* Then, the next time you run nth prime with the input of 1,000? You don't do all the hard work. 
* First, you go look in the backpack, look in the store: we already ran with 1,000, we can just pass its value out, the thousandth prime number. All bundled up in our persistent cache, on the back of our function.

This is where closure is particularly powerful: it keeps us from polluting the global scope. 

---

## Asynchronous JavaScript

Our memory thread does the code line by line, our core stack keeps track of these memories and threads (together, the execution context.)

JavaScript is single threaded, that means doing one line of code at a time. 

What if we need to wait sometime before we can execute certain portions of code? 

So we've got a tension between delaying that code executing, but not wanting to block the thread.

Does our web browser give us some API, some functionality outside of pure JavaScript that we can interface with? These are the background threads. 

Our web browser is a JavaScript runtime. JavaScript is run in environments in which we can spin up in the background a much more flexible number of threads doing stuff like creating a timer. Again: not within JavaScript, but using our web browser background features.

`setTimeout()` doesn't do the conventional thing, create an execution context in JavaScript: instead, it says, “web browser API, create a timer!”

Remember: in e.g. `setTimeout()` you’re passing in a function definition -- if pass a function invocation, it’ll fire off immediately. (We’re passing a reference to the function, not an actual copy of it: only where it is stored in JavaScript's memory.)

Some async challenges [are available here.](http://bit.ly/asyncjshp)

What happens if the timer goes off while the thread is in the middle of a complex, time-consuming task?

If a function added to the browser API is called (by e.g. the timer completing), we're not gonna put it instantly on the call stack (we're not gonna instantly start running it in JavaScript, because what if some other functionality in JavaScript is still running?

Instead, the function definition is added to the [callback/message/task] queue. And that queue is waiting for some condition to take place on the call stack.

When the call stack is empty (and the execution context in which I'm running in global has finished all its work), I can begin to call the callback queue functions.

The event loop is just the process of going, “hold on: is my call stack empty? If so, does my callback queue have a function in it?” The **event loop** is just a posh name for that checking whether my call stack is empty.

What other browser APIs do we have? One is called `XMLHttpRequest` (XHR) - it lets us speak to the network. (JavaScript cannot speak to the Internet on its own.)

It's a feature of the browser that allows our web browser to speak to the Internet; it's gonna bundle up a message to send off an HTTP request.

Promises provide a different format that makes us feel less like, “I'm doing this, and then inside, and then inside, and then inside,” but rather more procedural step-by-step.

## Promises

It’s not a ‘function’ -- it’s an ‘invokeable object’. ;)

The lexical context/closure of a declared function is available when you log the definition; it appears as `[[scope]]`

A new Promise returns an object as a “placeholder for future data.” This object has...
* a `value` key, which is originally `undefined`;
* an `onFulfilled` key, which is an array of functions to be triggered automatically when `value` updates; 
* a (terribly-named) `then` method, which pushes a function definition onto the `onFulfilled` array;
* a `status` key, with three potential values: 
  * `pending` as the default, 
  * `resolved` (which will trigger the `onFulfilled` array’s functions), and 
  * `rejected` (which will trigger the `onRejected` array’s functions, added to it by the `catch` method.)

The `onFulfilled` array adds its functions to different queue from the event-loop/callback queue: the job queue (whose functions are added to the call stack before those in the callback queue.)

Promises can be difficult to debug, and some of the syntax is awkward: but error handling is better than async/await (why? Explicit `catch` method?)

---

## Iterators

An iterable is a data structure that wants to make its elements accessible to the public. (Examples include `Array`, `String`, `Map`, `Set`, the `arguments` object...)

It does so by implementing a method whose key is `Symbol.iterator`. That method is a factory for iterators: that is, it will return an object called an iterator. 

This iterator will have a method called next which will return an object with keys...
* value (contains the current value; can be of any type); and 
* done (boolean; denotes whether all the values have been fetched or not).

We use iterables to automate the access of each element in the data structure, then return the next element to be called.

Note: this is exactly what happens in `for-of` loop: it takes an iterable, creates its iterator, then keeps calling the `next()` method until done is true.

---

## Generators
First Example: 

```javascript
function* createFlow() {
 yield 4
 yield 5
 yield 6
};

const returnNextElement = createFlow();
```

Invoking the generator function `createFlow()` returns a `Generator` object (which is then assigned to `returnNextElement`); which contains the next method.

When e.g. `returnNextElement.next()` is invoked, it then creates a local execution context inside `createFlow`, running until it hits the first `yield` statement. 

It then... 
* suspends (but doesn’t break!) the local execution context, 
* outputs whatever followed the yield statement (as if it were a return); and
* moves the thread back out to the context of (wherever `.next()` had originally been invoked).

Second Example:

```javascript
function* anotherCreateFlow() {
 const num = 10;
 const newNum = yield num;
 yield 5 + newNum;
 yield 6
};

const returnNextElement = anotherCreateFlow();

const element1 = returnNextElement.next(); // 10
const element2 = returnNextElement.next(2); // 7
```

`element1` is assigned the value of whatever follows the first `yield` statement -- so it evaluates to `num`, or `10`.

When `returnNextElement.next(2)` is called, the thread returns to exactly where it was inside the local execution context -- so it assigns the parameter, `2`, to `newNum`. It then hits the second yield, so it returns to the context that called `returnNextElement.next(2)` with the value of `5 + newNum` -- that is, `7`.

---

## Async/Await

First Example:
Under the hood, you can think of `async/await` as using, under the hood, a `Generator` function with a `Promise` object...

```javascript
function* aThirdCreateFlow() {
 const data = yield fetch('http://www.apiexample.com'); // is there a yield here?
 console.log(data);
}

const returnNextElement = aThirdCreateFlow();

const futureData = returnNextElement.next();

function doWhenDataReceived(value) {
 returnNextElement.next(value);
}

futureData.then(doWhenDataReceived);
```

When `returnNextElement.next()` is called, `fetch` sets a `Promise` object to the value of `data`, then resumes running the global code (which next declares `doWhenDataReceived` and adds it to the `onFulfilled` array within the `data` promise.)

...right? 

Anyway, this can all be done much more cleanly with the new syntax.
Second Example:

```javascript
async function createFlow() {
 console.log('me first');
 const data = await fetch('http://www.apiexample.com');
 console.log('and finally: ', data);
}

const futureData = createFlow();
console.log('and me second');
```

Nice example of using it in React [available here!](https://ewanvalentine.io/using-async-await-in-your-react-apps/)