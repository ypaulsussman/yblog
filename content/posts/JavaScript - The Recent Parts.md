---
title: JavaScript - The Recent Parts (Simpson, Kyle)
date: "2019-03-09"
template: "post"
draft: true
slug: "/posts/js-recent-parts-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "JavaScript"
description: "Notes from a FEM workshop, I attended. (Tagline: \"This workshop explores a variety of features added to JS from ES6 to present (ES2019), and tries to get a sense of what parts we should be paying closest attention to.\")"
---

## Intro

- 1999-2009: "The Dark Ages"... ES3 didn't update; IE6 didn't update (_political infighting_)
- Inflection point: agreement that there would be nothing implemented in the spec _unless_ all parties agreed to faithfully implement it
- Another six years of discussion and disagreement
- On release of ES2015, new target: how to make releases smaller, and incremental (instead of feature-deluge every 5-10 years?)

- **Thesis:** JS is moving to becoming a more declarative (_vis-a-vis imperative_) language. Often, rather than creating new spaces in the API, replacing hacky workarounds with clear, descriptive, readable native replacements.

## Template Strings (aka Interpolated Literals)

- Slight misnomer there: no template actually exists.
- Instead, it's better to envision a string with some IIFE's inside.
- Ancillary pain-point: `` ` `` (that is, `2xbacktick, space, backtick, space, 2xbacktick` is the way to make a backtick render in Markdown.
- Potential ancillary pain-point: `\n` and other such characters are preserved, rather than excised (as they are with quoted strings.)
- **Tagged template strings** actually call the named function _on_ the template literal.
  - The component strings and the component interpolated-values are parameters.
  - All component strings are passed in as indices in an array (the first parameter);
  - Each component interpolated-value is each of the next arguments (often passed as rest param.)
  - Perhaps slightly more difficult to reason about, but so powerful: you can effectively create your own DSL/syntax inside the function.

## String Padding and Trimming

- Padding is ES2017; Trimming is ES2019
- Both now exist as methods on `String.prototype`
- `.padStart`/`.padEnd`
  - detects whether language is LTR or RTL and adds from there!
  - first param is _not_ how many characters you want to add; it's how many characters you want to pad up to!
  - second param is optional; it's what you want to pad with (by default it's the ASCII 32 empty space);
    - it truncates/repeats if the character count doesn't exactly match the padding-count neede
    - but it repeats from the left, regardless of whether the language is LTR/RTL
- `.trim` has existed for a long time; it trims from both sides
- `.trimStart`/`.trimEnd`, like predecessor, trim much more whitespace than the standard ASCII 32 character.

## Destructuring

- **De**composing a **structure** into its individual parts
- Assigns individual parts from a larger structure
- Left-hand side of the `=` equals is a _pattern_: the syntax describing the pattern expected from the right-hand side.
  - Destructuring will return `TypeError` when the structure doesn't match this pattern
- You can use the default operator within destructuring
  - Default values check strictly against `undefined`, so passing in `null` _won't_ trigger the default
- Alternative definition for '_rest param_' = '_gather syntax_'; I think I actually prefer the latter
- If you want to keep the full value as well as the destructured parts, chain an `=` equals, i.e. `var [elem1, elem2, ...rest] = fullArray = getFullArray();`
- You can declare the variables first, before assigning them via a destructure statement
- There's no reason, too, that the left-hand destructuring targets can't be e.g. object keys or array indices (_instead of variables_)
- You can also have an empty index within array destructuring (this is called _array elision_)
- You can use array destructuring, e.g. `[x, y] = [y, x]`, to perform more-succinct value-swapping
- Default your destructuring values (especially when declared as parameters) as much as possible: not only does it promote graceful degradation, but it's also good documentation for the (lower-t) types of data you're expecting.
- `const {foo: bar = 'baz'} = getDataObject()`
  - `foo` is source (property on the object that `getData()` returns)
  - `bar` is target (variable to which you assign the source)
  - `'baz'` is default
- Careful with object destructuring: you can't do e.g.

```js
var first, second

{a: first, b: second} = getDataObject()
```

...because the parser will read the curly braces as a block. Instead, you have to wrap the destructuring in a parens:

```js
var first, second

({a: first, b: second}) = getDataObject()
```

Alternatively, you could precede it with an assignment to the entire object:

```js
var first, second, fullObj;

fullObj = { a: first, b: second } = getDataObject();
```

- Note too that...

```js
var a, b

({a, b}) = getDataObject()
```

...is identical to...

```js
var a, b

({a: a, b: b}) = getDataObject()
```

- When destructuring, you can list the same source property multiple times, to different targets...

```js
({a, b, b: foo, b: anotherNewVariable}) = getDataObject()
```

...which can be very useful when you want to destructure out a full obj/array, as well as some of its own properties to the same level:

```js
function getDataObject() {
  return { a: 1, b: { c: 3, d: 4 } };
}

var {
  a,
  b,
  b: { c, d }
} = getDataObject();
```

- _Named arguments_: a new call-site syntax pattern where you put everything into an object, then destructure the param
  - Downside: need to remember the names of params, and to wrap arguments in an obj
  - Upside: never have to worry about parameter sequence again!
- Restructuring: instead of using `Object.assign`, or Underscore's `_.extend`, a la...

```js
 ajaxCall(Object.assign({}, myDefaultsObj, mySettingsObj);
```

...use "restructuring," where you declare a function that maintains the defaults in the parameters. The function, then, returns all those parameters, overwritten if they were passed in as arguments to that function.

## Array.prototype.find and Array.prototype.includes

- Unlike the `.filter` method, returns the first value in the array for which the callback returns `true`
  - Corner case: returns `undefined` if nothing returns `true`... but will do the same if `undefined` is the actual value returned
  - Can be resolved by using `.findIndex` which will return `-1` if nothing's found
- `.includes` will return boolean re: whether the first param exists (and, as second optional parameter, the position in the array from which to begin searching)
  - unlike `.indexOf`, will work properly with `NaN`

## Array.prototype.flat and Array.prototype.flatMap

- `.flat` takes an argument (default is 1), then removes nesting for as many levels as specified by that argument
- `.flatMap` is very common in functional programming
- `.flatMap` is basically 'flatten while you map, instead of after' - it's more performant than `.map().flat()`
- Great use of `.flatMap`: can use it to add/remove items from a `.map`, by conditionally returning an empty array (_which then disappears during the flattening_)

## Iterators and Generators

- Generator: declarative way of creating iterators
- Iterator: a way to consume anything that is a data source, one value at a time (_a controller over how to access that data stream_)
- In ES6, made data types iterable:
  - `Symbol.iterator` is a special location on them that can be invoked to provide the pre-first location
  - calling `.next` on it will return an object with the value for that location, and a `done` boolean.
- The `spread` operator is an iterator! So is `for...of...` (this is why it doesn't work, by default, on objects.)
- `function *foo()` is a generator function:
  - when invoked, _they don't run_.
  - Instead, they produce an iterator.
  - With each call of `.next` on that iterator, it returns whatever the next `yield` statement in the iterator.
  - Don't `return` a value from a generator; make the last `return` empty, such that it can spread.
- Make sure, on your given data structure, that sb can access key, value, and (tuple of entry.)

## RegExp Improvements

- Lookbehind expressions now exist! (_with slightly different syntax from lookaheads._)
  - Some background: lookahead expressions
    - assertion that '_when I match, I want to say my match occurs **only if** the thing right after it is true._'
    - Not new: in JS for 10+ yrs
    - examples: `$` (end of string), `(?=foo)` inclusive (i.e. "_foo_" must be next characters), `(?=foo)` exclusive (i.e. "_foo_" must _not_ be next characters)
- Now have named capture groups, via angle-brackets(prior, needed to refer to them by number.)
- Now have `s` for 'dotall mode'
  - a la `m` multiline, `i` case-insensitive, `g` global
  - it allows `.` to match across newlines
- Soon will have `/u` for 'unicode-aware mode' (by default, JS regexp only pays attention to ASCII)

## `async` function and `await` keyword

- You could use the '`sync/async` pattern' even in ES6,
  - by calling promises within a generator...
  - but it'll require calling via some sort of runner, e.g. Koa or Bluebird
- `await` does this natively, within an `async` function definition
  - Can only use `await` within an async function; can't use within a function contained by an async function (e.g. as a callback)
  - Synchronous/eager iterators (e.g. `map`, `forEach`, etc) don't know to pause when they come across a `Promise`
  - We don't have a lazy asynchronous iterator, yet, natively; the `fasy` library provides an eager asynchronous iteration, however
- One drawback: `await` only works with promises, not `thunk`s or other "thenables"
- Second drawback: scheduling 'starvation' can occur, where the promise keeps adding an event to the microtask queue, which it then consumes, before adding another event, then consuming...
- Third drawback: not externally cancellable! The `CAF` library can provide this, via cancellation tokens. (_Most common use-case is, as expected, timeouts._)

## `async* ... yield await`

- `await` is essentially a "pull" operation: "_do nothing until I get this data back_"
- Generators are the flip side, in that `yield` can function as the "push" operation (or, really, as a "pull", for e.g. `yield fetch (url)` - though that's confusing!)
- ES2018, they've created a new function type that combines the two.
- Instead of a promise that waits to return until it has all its data, you'll get a lazy-loading asynchronous function that returns iterators (not a promise!) as it receives it.
- This provides lazy asynchronous iteration, with the syntactic sugar of [for await... of.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

So: synchronous or asynchronous, pull or push: we now have all four in the language.

---

### Side Notes

- Problem with relying on code comments: it's one more source of truth... and thus one more way that the codebase can become out of date and thus misleading.
- "Cancellation is a deep-tree problem"
- Research topic: people getting/not getting hired out of (Prime, UMN, others) = trends?
