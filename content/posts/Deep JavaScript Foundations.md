---
title: Deep JavaScript Foundations (Simpson, Kyle)
date: "2019-03-07"
template: "post"
draft: true
slug: "/posts/deep-js-foundations-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "JavaScript"
description: "Notes from a FEM workshop I attended. (Tagline: \"This course provides a deep exploration JavaScript fundamentals such as types and coercion, scope and closure, and the prototype system.\")"
---

## Intro

- We assume mental models about the code - then when a bug occurs, we blame the language, rather than the assumptions underpinning the model.

- C++/Java devs reading spec vs JS devs : low barrier to entry of JS possibly results in users feeling less responsible for understanding the tool.

- Abstract Operation

---

## Part 01: Types and Coercion

Coercion: don't avoid (as you've been told); instead, understand.

In JS, variables don't have types: the _values_ that are assigned to variables have types (_cf. C family, or Java._)

Types: `===` is not enough; need to understand. 

_Nota bene_ that `typeof` only returns a string, and only a small subset of possible strings.

@yuse - `Object.is()` = the "_quadruple equals_" - even works for `0` and `-0` (works for `NaN`, too, though `Number.isNaN` method is perhaps more semantic.)

### Primitive Types

- undefined
- string
- number
  - `0` and `-0` useful for when sth isn't moving, but you want to track the direction of its prior movement
  - careful: `toString(-0)` returns `"0"`
- boolean
- object
- symbol
  - used mostly for pseudo-private keys on objects
  - largely used in frameworks

### Not _exactly_ types, but have type-like behaviors

- _undeclared variable_ = not a type, but has a predictable behavior (`typeof` returns `"undefined"`, even though it's quite different from a variable which simply has nothing assigned to it.) _Nota bene_ that `typeof` is the only operator that can reference an undeclared variable and not throw an error (it returns `"undefined"`)
- `null` = primitive type, but wonky behavior (`typeof` returns `"object"`); original ES1 spec advised `undefined` to "unset" non-object types, and `null` to "unset" objects.
- _functions_ = callable objects; subtype of object (`typeof` returns `"function"`)
- _arrays_ = indexable objects; subtype of object (`typeof` returns `"object"`)
- `bigint` = stage 3 proposal (`typeof` will return `"bigint"`)
- `NaN` = IEEE-754 spec for bitpattern that represents less '_not a number_' and more '_invalid number_'
  - Propagates out - can't include a `NaN` in any equation and not get a `NaN` back.
  - Only char that's not equal to itself
  - `isNan()` operator will return true for things that are _not_ numbers, but also _not_ `NaN` (e.g. strings) -- the utility coerces its param to a number before checking.
  - ES6 provides the `Number.isNaN` method, which will work properly.
  - Hot take: `NaN` should be returned from e.g. Array methods that return `-1` for an un-located index

### Fundamental objects

- AKA built-in objects AKA native functions
- Java-esque: bolted-on objects from
- Always use `new` for `Object()` `Array()` `Function()` `Date()` `RegExp()` `Error()`
- Don't use `new` for `String()` `Number()` `Boolean()` - use literal instead, to get the actual type

### Abstract Operations

- Not part of ECMAScript: a conceptual step
- Each performs type conversion/coercion
- `ToPrimitive(hint)`
  - `hint` can be `number` or `string`
    - `number` tries `valueOf()` first, then `toString()`
    - `string` tries `toString()` first, then `valueOf()`
    - If neither, throws error
  - Inherently recursive: if return is not primitive, will invoke again
- `ToString()` gives representation of value in string form
  - Very careful with Array stringification; it's all unexpected corner cases
  - ES6 symbol `toStringTag` allows you to overwrite second of `[object Object]`
  - You can overwrite `toString` within an object to e.g. JSON stringify the contents
- `ToNumber()` gives representation of value in number form
  - Careful: empty string and `null` both return `0`
  - `undefined`, however, returns `NaN`
  - Strips all whitespace, so `""` and `" \n\t"` both evaluate to `0`
- `ToBoolean()` is "pretty straightforward";
  - it doesn't use `ToPrimitive` but rather
  - uses a lookup table to check the closed set of falsiness (rather than the truthiness set, which is open.)
- There are others, but the above three are the most commonly-used.

### Coercion

- **Operator Overloading:** using e.g. the `+` symbol for string concatenation, or coercion-to-string
- **Boxing:** form of implicit coercion (from primitive to object counterpart, e.g. `string` to object wrapper around string.) One of JavaScript's unsung USP's (cf. Java.)

His preferences:

- Use `String()` `Number()` `Boolean()` to make coercion explicit. Use e.g `> 0` rather than checking number's inherent truthiness (for e.g. `Array.length`)
- Implicit coercion is OK for [`undefined`, `null`] vs e.g. `{}`
- Don't allow polymorphic functions! Insist that a function only takes e.g. numbers, and throws error otherwise.
- Don't (_need_) to go as far as e.g. strictly-typed languages, or TypeScript: one of JS's strengths is its multiparadigm format, which is enabled by its dynamic type system.
- Don't write the _what_, or even (often) the _how_ in the code comment: write the _why_ - the reasoning behind the specific choices you made.
  - Every comment should include a word/phrase of causality: "_because_", "_in order to_", "_so as to not_", etc.

JS's implicitness is sometimes sketchy, but sometimes very, very useful. "_Implicit_" is neither magic, nor bad: it's abstracted. The goal is to hide unnecessary details, refocusing the reader and increasing clarity.

Useful: focuses the reader on what's important
Dangerous: obscure to reader
Better: when the reader understands the code

### Equality

- Avoid `== true` or `== false`; whenever possible prefer the `ToBoolean` lookup
- `==` first checks if the two values have the same type; if so, it runs `===`
- `==` considers `null` and `undefined` as equal
- `==` uses `ToNumber` abstract operator, thus preferentially coercing mixed comparators to `number` type.

* Think of `==` as (_slightly dangerous_) convenience wrapper around `===`;
* Reserve `===` to indicate it's a space where you don't know the types, or...
  - If you might receive a `0`, `""`, or `" "` (_because of unexpected coercions_); or
  - If you might be dealing with non-primitives (_e.g. objects containing properties, arrays, etc_)

### TypeScript, Flow, and type-aware linting

"_Useful, but fixes problems in a way that makes code worse; I have a different way to solve the problem._"

Underrated benefit: tells us when certain operations are invalid (_i.e. subtracting a string._) Unfortunately, can't get this, really, without the rest of it.

Danger of inline syntax annotations: potential vendor lock-in (_code-comment annotations exist, but rarely used._)

It's not in JavaScript's DNA to statically-type its [variables, parameters, returns, properties, etc]: we type our values. Doing so goes against JavaScript's strengths.

Typl => `github.com/getify/typl`

- his alternative, lighter project.
- Uses standard JS: template tag e.g. `` string`foo` ``

## Part 02: Scope and Closures

### The Lexical scope system of JavaScript

- JavaScript organizes scopes with functions and (as of ES6) blocks.
- Lexical scoping are all determined at _compile_ time, not at _run_ time.
  - Dynamic scoping = decided at runtime (_i.e. where a function is called determines its scope, rather than where that function is declared_); only major example is BASH scripting.
  - JavaScript is a two-pass system (parsed/compiled beforehand, then executed/run/interpreted by the JS engine)... in a weird way, it's closer to a compiled language like Java.
  - Side note: A "true" scripting language (e.g. BASH) doesn't parse beforehand: it'll e.g. "run lines 1-3 before tripping over the syntax error on line 4."
- A formal declaration in the compile phase _becomes_ a target reference in the execution/run phase.
- `var foo = 'bar';` actually has two parts:
  - the first (memory allocation of `var foo`) is handled by the compiler;
  - the second (value assignment of `bar`), by the engine (at execution.)
  - Thus `undefined` [_variable exists, with no value_] is very different from "undeclared" [_no variable exists in a scope to which we have access_]
- All variables are either:
  - receiving an assignment (_target reference_), or
  - delivering a value that you're requesting (_source reference_).
- For a function:
  - An argument is the source reference; a parameter is the target reference.
  - You assign the argument to the parameter, which then is passed into the function's scope.
- Properties aren't variables! Attached to objects, they don't participate in lexical scope at all.
- If, at runtime, we cannot find the variable in our current scope, we check the above/containing scope.
  - "Shadowing": two variables of the same name in different scopes (_so they don't overlap._)

### Autoglobals: a JS Quirk.

- If you assign to a never-declared variable, the global scope will implicitly create it for you. `"strict mode"` will (_thankfully_) instead throw an error.
- Even out of strict mode, source references to undeclared variables throw a `Reference Error`.
- `"strict mode"` is an example of a **pragma.** @ytodo: research more how they are parsed/compiled/interpreted.
- Classes and modules both assume/behave as if `"strict mode"` is applied.

### Function declarations [vs] named function expressions [vs] anonymous function expressions

- Function declarations, e.g. `function myFunc(){}` add their name to the enclosing scope;
- function expressions, e.g. `const myFunc2 = function myFunc3(){}` add their name to _their own_ scope, e.g.

```js
console.log(myFunc); //logs fn definition
console.log(myFunc2); //logs fn definition
console.log(myFunc3); //throws ReferenceError
```

His preference is to use named function expressions over anonymous function expressions, because:

1. For recursion (_or for event handlers, for unbinding itself; or for referencing properties on the function_) the name of the function expression provides a reliable (_read-only_) reference to itself.
2. More debuggable stack traces (the expression name)
3. More self-documenting code

Prefer named functions over anonymous ones.

- If you can't envision a name, it's a good indicator that the function is too large.
- Anon functions really only have one advantage, which is the block-scope binding offered by an arrow function.

### Block Scoping

- Instead of an IIFE, you can use a block (more lightweight, semantically)
- Using a `var` inside a block is problematic, though, b/c it'll actually attach to the containing function scope.
- A block isn't a scope, then, until a `let` or `const` is declared inside it.
- That is: use `let` only when you _want_ to signify "_hey, this variable should remain in this block; doesn't need to exist inside the scope of the entire function_"
- Otherwise, use `var`!
- One nice use of `let`:
  - if you only need a variable for a couple lines,
  - wrap it in an explicit block,
  - declare it with `let`,
  - use it as you modify an external variable,
  - then the `let` conveniently disappears!

### Hoisting

- ...is an English-language convention that _doesn't actually_ represent what occurs in the parser.
- Instead, as described above:
  - during the parsing/compile time, the variable is first allocated, and
  - only _then,_ during execution/runtime, the value is assigned.
- `var` hoisting gets dangerous, b/c easily becomes confusing
- `function` hoisting can be quite useful, b/c
  - if you drop all your function's at the end of the code,
  - you can then easily see the execution logic when you open the file.
- `let` ostensibly "_doesn't scope_"
  - Reasoning: when declared, it doesn't get initialized the way a `var` does (_albeit to_ `undefined`);
  - History: `const` "_needed_" this "_temporal dead zone_" so you can't access/view an initialized `const` before it's had a value assigned; `const` got it, so `let` did as well.

### Closure

- Historical background: JS' implementation of closure was somewhat startling in the 1990's, as it was one of the first 'mass-market' languages to use it (_a la Lisp and Scheme._)
- Closure occurs when a function 'remembers' its lexical scope _even when_ the function is executed outside that lexical scope.
  - Careful: you don't close over/preserve access to a _value_ -- you close over a _variable._
  - That is, it's the preservation of linkage to a variable, not capture of a value!
- Closure is almost a necessity for first-class functions (_otherwise, how does the function retain its variable references?_)

### Module

- Assigning (a set of variables and functions) as properties of an object = NOT modules; instead, the "namespacing" pattern.
- Can't be a module without _encapsulation_: the notion of control over visibility/access. (Whereas namespacing really just gathers different variables together.)
- How do modules encapsulate data and behavior? Via closure.
- Creating a module by assigning values to a workshop via an IIFE is similar to the Singleton pattern:
  - the variables created 'go away' (are no longer accessible externally) once called, but
  - the 'module' created retains access/reference to variables created during the call of that IIFE.
- This lends itself very nicely to the Factory pattern.
- Side note: To use modules in node, you'll have to use a different filetype: `.mjs`
- Only one ES6 module per file -- current view when developing is just convenience provided by (Webpack? Babel?)
- ES6 modules are singletons: only run once. Multiple imports = multiple references to the same module.

## Part 03: Object(s)-Oriented Programming

### `this`

- A function's `this` references the function context, determined _entirely_ by how the function is called.
  - This is very similar to (indeed, "_JavaScript's version of_") dynamic scoping!
  - Outcome: makes functions more flexible/reusable
- Four ways to call functions:
  - Implicit binding (defining function within object; using `this.*` to refer to other properties w/in object)
  - Dynamic binding (used for function reuse: defining function-with-a-`this`-reference as a method across multiple objects)
  - Explicit binding (sharing function across multiple objects, e.g. with `.call`)
  - Hard binding (using `.bind` function to invariably set the `this` context)
- Heuristic to use to manage the ~~unpredictability~~ _flexibility_ of `this`:
  - if you find that every one of your calls (to `this`-aware functions; that is, functions making use of `this.*`) needs to be using `.bind` to be safe,
  - then it's probably time to use a closure/lexical scope instead.
- The `new` keyword is syntactic sugar around "_invoke this function, with a new empty object as the `this` context._" In sequence, it:
  1. Creates a new, empty object;
  1. 'Links' that object to another object (its prototype);
  1. Calls the function with `this` set to the new-empty-object;
  1. If no `return` is set, assume return of `this`;
- If no `this` can be found, you'll either:
  - get the global scope, or
  - in `"strict mode"` get `undefined` (which will then throw a `TypeError` as you attempt to access a nonexistent property.)
- Conclusion: you can't infer the `this` keyword context via the location of the function's assigment: only through the location of the function's call.
- Order of precedence for determining `this` is:
  - Was function called with `new`?
  - Was it called with `.call`, `.apply`, or `.bind`?
  - Was it called on a context object (a "call site," as e.g. a method)?
  - Default: `global` object/`undefined` (in strict mode).
- Arrow functions' "lexical `this` behavior"
  - It's **not** a hard-bound reference to the parent object (a la `.bind`)
  - Instead, it's a function that doesn't _have_ a `this` context (that is, it doesn't define a `this` keyword.)
  - As a result, thresolves lexically (bubbling up)
  - They do have a lexical scope, however!
  - Arrow functions also do not have a prototype (they're not created a `constructor`)
    - This is why, as a weird corner case, you can't call `new` on an arrow function

### `class {}`

- Ostensibly syntactic sugar on the `prototype` system
- `extends` provides inheritance: unchanged!
- dynamic `this` binding: unchanged!
  - many use (an arrow function in the `constructor`) to 'fix' that dynamism
  - this results in... a brittle, confusing version of the module pattern
- `super` provides (relative) polymorphism... does _not_ exist outside of the `class` system

### Prototypes

- Objects are always created by "constructor calls" (i.e. `new` -- _not_ related to `class`'s `constructor` method)
- The implication of traditional class-based programming: it's fundamentally a copying-based operation.
- Problem: JS doesn't copy, at all; instead, it _links_ to its prototype.
- `prototype` is an object,
  - it's a property on the `Object` function
  - it includes e.g. `toString` and `valueOf`
  - all non-primitives derive from it
  - it includes the `constructor` property
    - this points back at the `Object` function
    - it largely exists solely to maintain the illusion that this is a class-based system
    - to reiterate: all the heavy work is done by the four-step process, above, that `new` enacts
- `__proto__` goes up to `Object`, then calls either `Object.getPrototypeOf()` or (...very rarely necessary) `Object.setPrototypeOf()` with the `this` context of the call site.

### Behavior Delegation

- Better definition than '_prototypal inheritance_': OLOO ("_objects linked to other objects_")
- Really, JavaScript (and Lua) have better claim to the term "object-oriented programming" (C++, Java, Ruby et al should instead use "class-oriented programming"... but that ship's sailed.)
- Practice: use `Object.assign` and `Object.create` to link objects

---

### Side notes

- **Add to projects list:** "_I Don't Know Ruby_" -> leverage understanding of JS to understand Ruby (how it differs; how similar featuers are displayed/implemented differently). Adapt topic structure of 'You Don't Know JS'?
- **Add to projects list:** app allowing you to trade EN lessons for code reviews (foreign, skilled developers)
- **Ask Monday:** Gabe & CeCe - how do you keep up / learn re: Ruby?
- Wow, the compiling process sounds (_via e.g. lexing, tokenization, parsing, abstract syntax tree_) very similar to NLP.
- This course's exercises is a good example of how badging could integrate with FEM: student writes the code from the prompt, then pushes to e.g. GitHub; adds readme w/ description of differences between how they solved it and how the instructor solved it (or which principles they applied, if it's a creative project); those are the URL's added to the badge.
