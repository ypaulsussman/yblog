---
title: Learning Javascript (Brown, Ethan)
date: "2019-04-10"
template: "post"
draft: true
slug: "/posts/learning-javascript-notes/"
category: "What I Read"
tags:
  - "JavaScript"
  - "O'Reilly"
description: "Notes from a book I bought in a pack, thought \"Oh, I'll have no use for,\" then (naturally) ended up learning quite a bit from. furtively skimmed while begining a large frontend rewrite at work. (Tagline: \"This practical book takes programmers on a no-nonsense tour of ES6, not only guiding you through simple and straightforward topics (variables, control flow, arrays), but also complex concepts such as functional and asynchronous programming.\")"
---

## Chapter 10. Maps and Sets

Maps are similar to objects in that they can map a key to a value, and sets are similar to arrays except that duplicates are not allowed.

Using objects to map keys to values has several drawbacks:

* The prototypal nature of objects means that there could be mappings that you didn’t intend.
* There’s no easy way to know how many mappings there are in an object.
* Keys must be strings or symbols, preventing you from mapping objects to values.
* Objects do not guarantee any order to their properties.

When you find yourself creating an object, stop and ask yourself, “_Am I using this object only to create a map?_” If the answer is “_Yes,_” consider using a `Map` instead.

A `WeakMap` is identical to `Map` except:

* Its keys _must_ be objects.
* Keys in a `WeakMap` can be garbage-collected.
* A WeakMap cannot be iterated or cleared.

The (_also garbage-collected_) values in a `WeakSet` likewise can’t be iterated, so the only common use for weak sets is determining whether or not a given object is in a set or not.

---

## Chapter 11. Exceptions and Error Handling

It’s called _exception_ handling (as opposed to _error_ handling) because it’s meant to deal with exceptional circumstances: not the errors you anticipate, but the ones you don’t.

* An anticipated error is someone providing an invalid email address on a form
* An unanticipated error might be running out of disk space, or a usually-reliable service being unavailable.

Exception handling is accomplished with a `try...catch` statement. The idea is that you “try” things, and if there were any exceptions, they are “caught.”

You can also `throw` (or “raise”) errors yourself, which initiates the exception handling mechanism (and causes the current function to immediately stop executing). Unlike other languages with exception handling, in JavaScript, you can throw any value: a number, a string, etc. However, it’s conventional to throw an instance of `Error`.

Errors and the call stack:

1. If function `a` calls function `b` and function `b` calls function `c`, when function `c` finishes, control is returned to function `b`, and when `b` finishes, control is returned to function `a`.
    * When `c` is executing, therefore, neither `a` nor `b` is “done.”
    * This nesting of functions that are not yet done is called the **call stack**.
1. If an error occurs in `c`, then, it causes an error in `b` (because `b` may rely on the return of `c`), which in turn causes an error in `a` (because `a` may rely on the return of `b`).
    * Essentially, the error propagates up the call stack until it’s caught.
    * Errors can be caught at any level in the call stack; if they aren’t caught, the JavaScript interpreter will halt your program unceremoniously. This is called an **unhandled exception**.
1. In most implementations of JavaScript, instances of `Error` contain a property `stack`, which is a string representation of the stack.
    * It _is_ a nonstandard feature of JavaScript, but it's available in most environments.
    * If function `a` calls function `b`, which calls function `c`, and the error occurs in `c`, the `Error` can then tell you that not only did the error occur in `c`, it occurred when it was called by `b` when `b` was called by `a`.

There are times when the code in a `try` block involves some sort of resource, such as an HTTP connection or a file.

* Whether or not there is an error (i.e. whether the `try` block resolves, or is interrupted by a `catch` block), we want to free this resource so that it’s not permanently tied up by your program.
* This is a good place for the `finally` block, which gets called whether or not there is an error.

Exception handling comes at a cost: it's best to leave them as a last line of defense.

* Every time you throw an exception, you have to catch it (unless you want your program to crash).
* Exceptions also carry a certain computational cost. Because exceptions have to “unwind” the stack trace until a `catch` block is encountered, the JavaScript interpreter has to do extra housekeeping.

---

## Chapter 12. Iterators and Generators

Generators depend on iterators, so we’ll start with iterators.

An iterator is roughly analogous to a bookmark: it helps you keep track of where you are.

An iterable object [1] contains multiple things (_like pages in a book_), and [2] can give you an iterator (_like a bookmark_).

Assuming we have a variable `book` of type `Array`, we can create an iterator `it` with: `const it = book.values();`

To “start,” we call the `it` iterator’s `next` method, which returns an object with two properties: `value` (_which holds the “page” you’re now on_) and `done` (_which becomes_ `true` _after you read the last page_).

Note that when `next` gives us the last page in the book, it does _not_ set `done` to `true`; it's only on the following call of `next` (_which also sets_ `value` _to_ `undefined`).

Note that iterators are distinct:

* every time you create a new iterator, you’re starting at the beginning;
* it’s possible to have multiple iterators that are at different places.

The `for...of` loop will work with any object that provides an iterator.

Generators are functions that use an iterator to control their execution.

* A regular function takes arguments and returns a value, but otherwise the caller has no control of it. When you call a function, you relinquish control to the function until it returns.
* Generators bring two things to the table:
  * The first is the ability to control the execution of a function, having it execute in discrete steps. (_When you call a generator, you get back an iterator. The function runs as you call the iterator’s `next` method._)
  * The second is the ability to communicate with the function as it executes. (_The function can `yield` control back to the caller at any point._)

Generators are signified in JavaScript by the presence of an asterisk after the `function` keyword (_you can't use arrow notation._)

If you expect a useful value out of a generator, you should use `yield`; `return` should only be used to stop the generator early. For this reason, I generally recommend not providing a value at all when you call `return` from a generator.

Generators essentially allow computation to be deferred, and performed only as necessary: they provide powerful patterns for managing asynchronous execution.

---

## Chapter 13. Functions and the Power of Abstract Thinking

Great point: if you've got a non-idempotent function, with side effects...

```js
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let colorIndex = -1;

function getNextRainbowColor() {
  if(++colorIndex >= colors.length) colorIndex = 0;
  return colors[colorIndex];
}
```

...consider making it a generator instead:

```js
function getRainbowIterator() {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  let colorIndex = -1;
  return {
    next() {
      if(++colorIndex >= colors.length) colorIndex = 0;
      return { value: colors[colorIndex], done: false };
    }
  };
}

const rainbowIterator = getRainbowIterator();
setInterval(function() {
  console.log(`new color! ${rainbowIterator.next().value}`);
}, 500);
```

---

## Chapter 14. Asynchronous Programming

When a JavaScript application runs, it runs _single-threaded_.

* That is, JavaScript only ever does one thing at a time.
* Most modern computers are capable of doing multiple things at once (_assuming they have multiple cores._)
* JavaScript’s single-threaded nature actually frees you from some very thorny problems that are present in multithreaded programming.
This freedom comes at a cost, though: it means that to write smoothly running software, you have to think asynchronously.

We can think of JavaScript as having three distinct eras of asynchronous support: the callback era, the promise era, and the generator era.

If it were a matter of generators being better than everything that came before them, we could simply explain how generators work.

* However, generators rely on either promises or a special type of callback to provide asynchronous behavior.
* Likewise, as useful as promises are, they rely on callbacks (and callbacks by themselves are still useful for things like events).

The four primary things you’ll be using asynchronous techniques for are:

* User input (_clicks, touches, keypress, drags_)
* Network requests (_Ajax calls_)
* Filesystem operations (_reading/writing files_)
* Intentionally time-delayed functionality (_an alarm_)

Every time you invoke a function, you create a closure: all of the variables that are created inside the function (including the arguments) exist as long as something can access them.

Node established a convention called _error-first callbacks._

* This uses the first argument to a callback to receive an error object.
* If that error is `null` or `undefined`, there was no error.
* For example:

```javascript
const fs = require('fs');
const fname = 'may_or_may_not_exist.txt';
fs.readFile(fname, function(err, data) {
    if(err) return console.error(`error reading file ${fname}: ${err.message}`);
    console.log(`${fname} contents: ${data}`);
});
```

While callbacks allow you to manage asynchronous execution, they have a practical drawback: they’re difficult to manage when you need to wait on multiple things before proceeding.

* This is the oft-heard _callback hell._
* Not only do they make for complex, deeply-nested reading, but
* They often cause mishandling of exceptions (most commonly, a `try...catch` statement being in the block _above_ where the actual error is occurring/the `throw` is included.)

Promises ensure that callbacks are always handled in the same predictable manner.

* When you call a promise-based asynchronous function, it returns a `Promise` instance.
* Only two things can happen to that promise: it can be fulfilled (success) or rejected (failure).
* You are guaranteed that only one of those things will happen, and the result will only happen once.

Another convenient advantage of promises over callbacks is that, because they’re just objects, they can be passed around. If you want to kick off an asynchronous process, but would prefer a different scope handle the results, you can just pass the promise to them.

First, define a function that returns a new `Promise` instance, itself returning a function with both "`resolve`" and "`reject`" callbacks.

Then, on calling that first, `Promise`-creating function, chain it with either a `.then()` method (to be called after the "`resolve`" callback), or a `.catch` method (to be called after the "`reject`" callback.)

Note that calling `reject` (or `resolve`) doesn’t iteself stop your function; it just manages the state of the promise.

Promises give us an extremely well-defined and safe mechanism for asynchronous tasks that either fulfill or reject: but they do not provide any way to report progress.

Node's runtime, in particular, uses an [event-based architecture](https://nodejs.org/api/events.html), built on object "emitters" and function "listeners."

Promises can’t, on their own, protect from the problem of never settling (that is, when you enter a state where neither `resolve` nor `reject` will be called.)

* This kind of mistake can be hard to track down because there’s no error: an unsettled promise may simply get lost.
* The most common way to prevent this is to specify a timeout: if the promise hasn’t `resolve`/`reject`'ed in some reasonable amount of time, automatically `reject` it.

---

## Chapter 18. JavaScript in the Browser

Every node in the DOM tree (including the document itself) is an instance of the `Node` class.

* Node objects have a `parentNode` and `childNodes` properties, as well as
* Node objects have identifying properties, such as `nodeName` and `nodeType`.
  * `nodeType` is an integer identifying what type of node it is.
  * The `Node` object contains constants that map to these numbers.
  * The most common two are `Node.ELEMENT_NODE` (HTML elements) and `Node.TEXT_NODE`

The `TreeWalker` object allows you to iterate through all of the elements in the DOM (optionally filtering by certain element types.)

DOM methods that return a collection (`.getElementById`, `.getElementsByClassName`, `.getElementsByTagName`) do not return a JavaScript array, but an instance of `HTMLCollection`, which is an “array-like object.”

* You can iterate over it with a for-loop, but the `Array.prototype` methods (such as `map`, `filter`, and `reduce`) won’t be available.
* You can convert an `HTMLCollection` to an array by using the spread operator: `[...document.getElementsByTagName(p)]`

The methods `.querySelector` and `.querySelectorAll` allow you to use CSS selectors.

Each element has two properties, `.textContent` and `.innerHTML`, that allow you to access (_or change!_) the element’s content.

* `textContent` strips out all HTML tags and provides text data only, whereas
* `innerHTML` allows you to create HTML (_which results in new DOM nodes._)

`document.createElement` creates a new element, but it doesn’t add it to the DOM.

* `.insertBefore` takes the element to inset first, and then a “reference node,” which is the node to insert before: `myOLelement.insertBefore(myNewFirstLIelement, myOldFirstLIelement);`
* `.appendChild` is very simple, appending the specified element as the last child: `myParentElement.appendChild(myNewChildElement);`

Every element has a property `classList`, which contains all of the classes (if any) the element has.

* `classList.add('class-name')` allows you to add further classes.
* `classList.remove('class-name')` removes classes

HTML5 introduced _data attributes_, which allow you to add arbitrary data to HTML elements.

* This data isn’t rendered by the browser, but it does allow you to add information to elements that can easily be read and modified by JavaScript.
* It's accessed with a bracket syntax, so for the below HTML, you'd use `const highlightActions = document.querySelectorAll('[data-action="highlight"]');` to get at the first button:

```html
<button data-action="highlight" data-containing="unique">
    Highlight paragraphs containing "unique"
</button>
<button data-action="removeHighlights">
    Remove highlights
</button>

```

* Note that each data attribute is stored as a string, accessible (_or modifiable!_) by the `.dataset` method:

```js
highlightActions[0].dataset;
// DOMStringMap { containing: "unique", action: "highlight" }
 ```

 (_You can, however, use_ `JSON.stringify`/`JSON.parse` _to convert between objects and strings..._)

Every element has a method named `addEventListener`.

* It allows you to specify a function that will be called when that event occurs.
* That function takes a single argument, an object of type `Event`.
* The event object contains all the relevant information about the event, which will be specific to the type of event.

HTML5 event propagation starts by allowing handlers to capture the event (starting at the most distant ancestor and working down to the target element) and then the event bubbles back up from the target element to the most distant ancestor.

Any handler can optionally do one of three things to affect how additional handlers will get called.

* The first is `preventDefault`, which cancels the event. Canceled events continue propagating, but their `defaultPrevented` property is set to true.
  * Event handlers built into the browser will respect the `defaultPrevented` property and take no action.
  * Event handlers that you write can (_and usually do_) choose to ignore this property.
* The second approach is to call `stopPropagation`, which prevents further propagation past the current element (all handlers attached to the current element will be called, but no handlers attached to other elements).
* Finally, `stopImmediatePropagation` will prevent any further handlers from getting called (even if they’re on the current element).
