---
title: Beautiful JavaScript (Various Authors)
date: "2018-09-24"
template: "post"
draft: true
slug: "/posts/beautiful-javascript-notes/"
category: "What I Read"
tags:
  - "JavaScript"
  - "O'Reilly"
description: "Notes from a book I skimmed while biking indoors during the winter. (Tagline: \"This guide gives you a rare glimpse into JavaScript from people intimately familiar with it. Chapters contributed by domain experts... show what they love about their favorite language - whether it’s turning the most feared features into useful tools, or how JavaScript can be used for self-expression.\")"
---

## Beautiful Mixins (Angus Croll)

Many developers schooled in Java, C++, Objective-C, and Smalltalk arrive at JavaScript with an almost religious belief in the necessity of the class hierarchy as an organizational tool. Yet humans are not good at classification. 

Working backward from an abstract superclass toward real types and behaviors is unnatural and restrictive — a superclass must be created before it can be extended, yet classes closer to the root are by nature more generic and abstract and are more easily defined after we have more knowledge of their concrete subclasses.

Classical inheritance is appropriate for modeling existing, well-understood hierarchies — it’s okay to unequivocally declare that a FileStream is a type of InputStream. But if the primary motivation is function reuse (and it usually is), classical hierarchies can quickly become gnarly labyrinths of meaningless subtypes...

---

A prototype is an object that supplies base behavior to a second object. The second object can then extend this base behavior to form its own specialization.

While classical inheritance is planned reuse, true prototypal inheritance is opportunistic. ...when working with prototypes, one typically chooses not to categorize but to exploit alikeness.

JavaScript tied the prototype property to the constructor. As a consequence, more often than not, multilevel object inheritance is achieved by chaining constructor-prototype couplets. ...creating a new instance of a base prototype in order to define the initial properties of its inheritor is neither graceful nor intuitive.

...[it] results in structures that more closely resemble the traditional hierarchies of classical languages than a true prototypal relationship: constructors represent types (classes), each type is defined as a subtype of one (and only one) supertype, and all properties are inherited via this type chain. The ES6 class keyword merely formalizes [this].

---

In contrast to objects in more rigidly structured languages, JavaScript objects can invoke any function property regardless of lineage. 

...any public function can be invoked directly via call or apply. ...such delegation is so convenient that, paradoxically, it sometimes actually works against structural discipline in your code...

Mixins are a good compromise... mixin classes are considered abstract in that they will not themselves be instantiated — instead, their functions are copied (or borrowed) by concrete classes.

[But] this is JavaScript, and we have no classes per se. ...our mixin can be a regular object, a prototype, a function, whatever,

---



How does a mixin object get mixed into your object? By means of an `extend` function:

```javascript
function extend(destination, source) {
 for (var key in source) {
   if (source.hasOwnProperty(key)) {
     destination[key] = source[key];
   }
 }
 return destination;
}
```

(Usually `extend` simply copies (not clones) the mixin’s functions into the receiving object.)

An example: 
```javascript
var circleFns = {
 area: function() {
   return Math.PI * this.radius * this.radius;
 },
 grow: function() {
   this.radius++;
 },
 shrink: function() {
   this.radius--;
 }
};

var RoundButton = function(radius, label) {
 this.radius = radius;
 this.label = label;
};

extend(RoundButton.prototype, circleFns);
```
---

Isn’t it more intuitive to think of mixins as processes instead of objects? Here are the circle and button mixins rewritten as functions.

We use the context (`this`) to represent the mixin’s target object:

```javascript
var withCircle = function() {
 this.area = function() {
   return Math.PI * this.radius * this.radius;
 };
 this.grow = function() {
   this.radius++;
 };
 this.shrink = function() {
   this.radius--;
 };
};
```

Apply the mixins to `RoundButton.prototype`: 

```javascript
var RoundButton = function(radius, label, action) {
 this.radius = radius;
 this.label = label;
 this.action = action;
};
```

Now the target object can simply inject itself into the functional mixin by means of `Function.prototype.call`, cutting out the middleman (the `extend` function) entirely:

```javascript
withCircle.call(RoundButton.prototype);
```

---

You might be concerned that this approach creates additional performance overhead because we’re redefining the same functions on every call. 

By forming a closure around the mixins we can cache the results of the initial definition run, and the performance improvement is impressive. Functional mixins now easily outperform classic mixins.

Here’s a version of the `withRectangle` mixin with added caching: 

```javascript
var withRectangle = (function() {
 function area() {
   return this.length * this.width;
 }
 function grow() {
   this.length++, this.width++;
 }
 function shrink() {
   this.length--, this.width--;
 }
 return function() {
   this.area = area;
   this.grow = grow;
   this.shrink = shrink;
   return this;
 };
})();

var RectangularButton = function(length, width, label, action) {
 this.length = length;
 this.width = width;
 this.label = label;
 this.action = action;
};

withRectangle.call(RectangularButton.prototype);

var button3 = new RectangularButton(4, 2, "delete", function() {
 return "deleted";
});
```

---

By repeatedly defining an object solely in terms of another, classical inheritance establishes a series of tight couplings that glue the hierarchy together in an orgy of mutual dependency. 

Mixins, in contrast, are extremely agile and make very few organizational demands on your codebase — mixins can be created at will, whenever a cluster of common, shareable behavior is identified, and all objects can access a mixin’s functionality regardless of their role within the overall model.

## eval and Domain-Specific Languages (Marijn Haverbeke)

`eval` is a language construct that takes a string and executes it as code. This means that in a language with an `eval` construct, the code that is being executed can come not just from input files, but also from the running code itself.

Its semantics are confusing and error-prone, and its impact on performance is not always obvious.

...the question [is] of which variables it can see... there’s rarely a reason to want to access local scope. 

...evaluating in the local scope is not a good idea [because] it makes life quite a bit harder for the compiler. Knowing exactly what the code it’s compiling looks like enables a compiler to make a lot of decisions at compile time (rather than runtime), which makes the code it produces faster.

---

[There is a] very odd way in which JavaScript `eval` behaves — the distinction between local and global evaluation. `eval` is, historically, a regular global variable that holds a function.

...the `eval` is only done in the local scope if we can see, during compilation, that a call to eval takes place...

If you call eval in any other, more indirect way, it will not have access to the local scope, and thus will be a global evaluation.

For example, `eval("foo")` is local, while `(0 || eval)("foo")` is global, and so is `var lave = eval; lave("foo")`.

Another variant of global evaluation is the `Function` constructor. It takes strings for the argument names and function body as arguments, and returns a function in the context of the global scope... For most purposes, this is the preferred way to evaluate code.

...if you’re using the closure module pattern (an anonymous function as module scope), having a local evaluation anywhere in your module will incur a cost for all code in the module.

...the speed of a function created by new `Function` or a global `eval` is not adversely affected by the fact that it was created dynamically.

---

The most obvious use of `eval` is dynamically running code from an external source: for example, in a module-manager library that fetches code from somewhere and then uses a global `eval` to inject it into the environment...

In the past, `eval` was the easiest way to parse strings of JSON data, whose representation is a subset of JavaScript’s own syntax. In modern implementations we have JSON.parse for that, which has the significant advantage of not enabling code injection...

Most JavaScript-based text templating systems use some form of `eval` to precompile templates.

---

## Math Expression Parser and Evaluator (Ariya Hidayat)

Domain-specific languages (DSLs) are encountered in many aspects of a software engineer’s life: 
* configuration file formats, 
* data transfer protocols, 
* model schemas, 
* application extensions, 
* interface definition languages, and many others.

---

The first important thing to do to a string representing a math expression is lexical analysis — that is, splitting the string into a stream of **tokens**. Quite expectedly, a function that does this is often called a **tokenizer**. Alternatively, it is also known as a _lexer_ or a _scanner_.

The stream of tokens produced by the lexer does not give us enough information to compute the math expression. Before we can evaluate the expression, an **abstract syntax tree** (AST) corresponding to the expression needs to be constructed. This procedure is commonly known as syntactic analysis, and it is usually carried out by a **syntax parser**.

A popular technique to construct the syntax tree is **recursive-descent parsing**. In such a parsing strategy, we go top down and match the possible parse tree from the highest level.

Once a syntax tree is obtained, evaluating the expression associated with it is surprisingly easy. It is simply a matter of walking the tree, from the topmost syntax node through all children, and executing a specific instruction related to the type of each syntax node.

---

...consider the concept of evaluation context. For this purpose, we define the _context_ as an object that holds the variables, constants, and function definitions. When we evaluate an expression, we also need to pass a context so that the evaluator knows where to fetch the value of a variable, store a value to a variable, and invoke a certain function. 

Keeping the context as a different object promotes the separation of logic: the interpreter knows nothing about the context, and the context does not really care how the interpreter works.

...the lexer can be implemented as a language with a complex grammar may require a deeper recursive-descent parsing. In some cases, it is more convenient to handle some of the recursive aspect by using a stack-based shift and reduce.

---

## `Error` Handling (Nicholas Zakas)
Programming languages define a base set of rules that, when deviated from, result in errors so that you can fix the code. Debugging would be nearly impossible if errors weren’t thrown and reported back to you.

[I] think of throwing errors as leaving Post-it notes for myself as to why something has failed.

[It] helps to think of errors as built-in failure cases. It’s always easier to plan for a failure at a particular point in code than it is to anticipate failure everywhere. 
* This is a very common practice in product design, not just in code. 
* Cars are built with crumple zones, areas of the frame that are designed to collapse in a predictable way when impacted. 
* Knowing how the frame will react in a crash — which parts will fail — allows the manufacturers ensure passenger safety. 

Your code can be constructed in the same way.

...[if you] cannot identify all the places where a function will be called ahead of time, then you’ll likely need some error checking...

The best place for throwing errors is in utility functions...

Any type of object can be thrown, but an `Error` object is the most typical to use:

it’s treated the same way as an error that you didn’t throw. The difference is that you get to provide the exact text to be displayed by the browser.

...always include the function name in the error message, as well as the reason why the function failed, e.g. : 
throw new `Error`("addClass(): First argument must be a DOM element.");

JavaScript engines add a stack property to any `Error` object that is thrown. The stack property is a string containing a formatted stack trace leading up to the error being thrown.

ECMA-262 specifies seven error object types. These are used by the JavaScript engine when various error conditions occur:
1. `Error` Base type for all errors. Never actually thrown by the engine.
2. `EvalError` Thrown when an error occurs during execution of code via `eval()`.
3. `RangeError` Thrown when a number is outside the bounds of its range — for example, trying to create an array with –20 items `(new Array(-20))`. These occur rarely during normal execution.
4. `ReferenceError` Thrown when an object is expected but not available — for instance, trying to call a method on a null reference.
5. `SyntaxError` Thrown when the code passed into `eval()` has a syntax error.
6. `TypeError` Thrown when a variable is of an unexpected type — for example, `new 10` or `"prop" in true`.
7. `URIError` Thrown when an incorrectly formatted URI string is passed into `encodeURI`, `encodeURIComponent`, `decodeURI`, or `decodeURIComponent`.

You can create and throw each of these error types at any time in JavaScript by invoking the constructor of the same name, such as: `throw new TypeError("Unexpected type.")`;

---

Using a custom error type allows you to easily tell the difference between an error that was thrown intentionally and an unexpected error that the browser throws. You can create a custom error type easily by inheriting from `Error` and following a simple pattern:

```javascript
function MyError(message) {
 this.message = message;
}

MyError.prototype = Object.create(`Error`.prototype);
```

There are two important parts of this code: 
1. the message property, which is necessary for browsers to know the actual error string, and
2. setting the prototype to an instance of `Error`, which identifies the object as an error to the JavaScript engine.

...throwing your own error indicates that this condition is a known possibility (unlike native errors, which are frequently unexpected).

---

When an error occurs inside of the `try` clause, execution stops and is resumed inside of the `catch` clause. The thrown error is passed into [it]...

It’s also possible to omit the `catch` clause completely and just use a `finally` clause... 
* In this case, an error will cause execution to stop inside of the `try` clause and go immediately into the `finally` clause. 
* If an error doesn’t occur, then all of the statements inside of the `try` clause are executed, and then the statements in the `finally` clause are executed. 
In either case, you are saying that there is no special functionality when an error occurs.

...there is a performance hit for wrapping code in a `try`-`catch`-`finally` even when an error doesn’t occur. ...for code that is run a nominal number of times, the difference in execution time will not be apparent.

---

...top-level event handler called `window.onerror`. 
* This event handler receives four arguments: 
   * the error message, 
   * the URL that raised the error, 
   * a line number, and 
   * a column number.
* HTML5 specification was changed to specify a fifth argument to `window.onerror`, which is 
   * the actual error object.

Node.js has a similar mechanism for catching errors globally. The `process` object fires an event called `uncaughtException`...

---

## Other

...the most gorgeous and powerful mechanisms in sweet JavaScript: the ability to call any function you find lying about, in the context of any object you choose.

1. Both of the following these approaches are imperative, which means they rely on commands that act upon the machine state. An imperative program executes a sequence of commands that change the program’s internal state over and over again.
   1. Languages like Go and C are called procedural: their main programming unit is the procedure. 
   2. Languages like Java and SmallTalk are object oriented: their main programming unit is the object. 
1. Functional programming languages, on the other hand, are oriented around expressions. 
   1. Expressions — or rather, pure expressions — don’t have a state, as they merely compute a value. 
   2. They don’t change the state of something outside their scope, and they don’t rely on data that can change outside their scope.

...build your programs around composable functions that work with simple data types, is called data-driven programming.

JavaScript developers often start making overcomplicated object hierarchies without even considering whether there are simpler ways to solve the problem.

JavaScript’s built-in mechanism for defining a class of object and its behavior is the same mechanism used for defining any encapsulated operation: a function.