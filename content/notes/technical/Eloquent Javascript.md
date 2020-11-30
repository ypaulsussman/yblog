# Eloquent JavaScript (3rd Ed)
- https://github.com/marijnh/Eloquent-JavaScript/tree/master/code/solutions

## Chapter 4: Data Structures: Objects and Arrays

- The `in` binary-operator, when applied to a string and an object, tells you whether that object has a property with that name. 
- As an alternative to the `in` operator, you can use the `hasOwnProperty` method, which ignores properties provided by object’s prototype.
- The difference between setting a property to `undefined` and calling `delete` on it is that
  - in the first case, the object still has the property (it just doesn’t have a very interesting value), whereas 
  - in the second case the property is no longer present: `in` will return `false`

- To _serialize_ data is to convert it from a tangle of memory addresses (_on your individual computer_) into a flat description (_that can be sent anywhere._)

**Exercises**
```js
// The Sum of a Range
function myRange(start, end) {
  return Array(end - start + 1)
    .fill(undefined)
    .map((_val, idx) => start + idx);
}

function mySum(numArr) {
  return numArr.reduce((acc, val) => acc + val, 0);
}

// Reversing an Array
function reverseArray(arr) {
  let rev = [];
  for (const item of arr) {
    rev.unshift(item);
  }
  return rev;
}

function reverseArrayInPlace(arr) {
  const halfway = arr.length / 2
  for (let index = 0; index < halfway; index++) {
    const placeholder = arr[index];
    const newIndex = [arr.length - 1 - index];
    arr[index] = arr[newIndex];
    arr[newIndex] = placeholder;
  }
  return arr;
}

// A List
function arrayToList(arr) {
  let list = null;

  for (let index = arr.length - 1; index >= 0; index--) {
    list = {
      value: arr[index],
      rest: list,
    };
  }

  return list;
}

function extractListVal(list, arr) {
  if (!list.rest) {
    arr.push(list.value);
    return arr;
  } else {
    arr.push(list.value);
    return extractListVal(list.rest, arr);
  }
}

function listToArray(list) {
  let arr = [];
  return extractListVal(list, arr);
}

const prepend = (el, list) => ({
  value: el,
  rest: list,
});

function nth(list, num) {
  if (!list) {
    return undefined;
  } else if (num === 0) {
    return list.value;
  } else {
    return nth(list.rest, num - 1);
  }
}
```

## Chapter 5: Higher-Order Functions
**Exercises**
```js
// Flattening
function myFlat(arr) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(val);
    } else {
      acc.push(val);
      return acc;
    }
  }, []);
}

// Everything
function myEveryViaLoop(array, test) {
  for (let index = 0; index < array.length; index++) {
    if (!test(array[index])) {
      return false;
    }
  }
  return true;
}

function myEveryViaSome(array, test) {
  return !array.some((val) => !test(val));
}

// Dominant Writing Direction

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function getScriptDirection(char) {
  let script = characterScript(char.codePointAt(0));
  return script ? script.direction : null;
}

function dominantDirection(text) {
  let scripts = countBy(text, getScriptDirection);

  scripts = scripts.filter(({ name }) => !!name);

  console.log("scripts: ", scripts);
  let total = scripts.reduce((n, { count }) => n + count, 0);

  return total == 0
    ? "No scripts found"
    : `${
        scripts.sort(function (a, b) {
          return b.count - a.count;
        })[0].name
      } is dominant`;
}
```

## Chapter 6: The Secret Life of Objects

- _Encapsulation_ is the system of separating interface from implementation, and a great idea.

- _Methods_ are object-properties that hold function-definitions. (Usually a method does something to the object it was called on.)

- Arrow/functions as methods:
  - The `call` method takes the `this` value as its first argument and treats further arguments as normal params.
  ```js
  // For:
  function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
  let hungryRabbit = { type: "hungry", speak };

  // This invocation:
  hungryRabbit.speak("I could use a carrot right now.");

  // is identical to:
  speak.call(hungryRabbit, "I could use a carrot right now.");

  ```
  - NB The above call-fn-as-method _doesn't_ work with arrow functions, which have no `this` of their own.
    - e.g. `const speak = (line) => `The ${this.type} rabbit says '${line}'`;`
    - will always return `The undefined rabbit says...`
  - Arrow functions can access the `this` of the scope around them, making them ideal for callbacks.
  ```js
  // Using an inline arrow-fn callback with `this` will work as expected:
  function normalize() {
    console.log(this.coords.map((n) => n / this.length));
  }
  normalize.call({ coords: [0, 2, 3], length: 5 });

  // But:
  function normalize() {
    console.log(this.coords.map(divisorFn));
  }

  //Will always return an array of `NaN`, for either of the below,
  // as the result of dividing by `undefined`
  const divisorFn = (n) => n / this.length;

  function divisorFn(n) {
    return n / this.length;
  }

  ```

- Prototypes and Classes
  - `Object.getProtoypeOf(foo)` will return `foo`'s parent-prototype (but not ancestors)
  - The `instanceof` binary operator (e.g. `foo instanceof Array` will return whether an object was derived from a specific class, anywhere in its inheritance tree
  - If you put the keyword `new` in front of a function call: 
    - the function is treated as a constructor; that is, 
    - an object with the right prototype is automatically created, 
    - the object is bound to `this` in the function, and 
    - the object is returned at the end of the function.
  - The prototype object used when constructing objects is found by taking the `prototype` property _of the constructor function:_
    ```js
    function Rabbit(type) {
      this.type = type;
    }
    Rabbit.prototype.speak = function (line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    };
    let weirdRabbit = new Rabbit("weird");
    ```
    - All JS functions automatically get a property named `prototype` , which by default holds a plain, empty object that derives from `Object.prototype` (and can be overwritten.)
    - The actual prototype of a constructor, then, is `Function.prototype`
    - By convention, the names of constructors are capitalized.
  - The `class` keyword starts a class declaration, which allows us to define, in a single place: 
    - a set of methods, and
    - a `constructor` function (into whose `prototype` the other methods are packaged )
    ```js
      class Rabbit {
        constructor(type) {
          this.type = type;
        }
        speak(line) {
          console.log(`The ${this.type} rabbit says '${line}'`);
        }
      }
      let killerRabbit = new Rabbit("killer");
    ```
    - NB `class` declarations currently allow only methods to be added to the `prototype`.
    - You can, however, create such properties by directly manipulating the `prototype` after you’ve defined the `class`.
    - Inside a `class` declaration, methods that have `static` written before their name are stored directly on the constructor function (rather than the prototype.)
  
- `Polymorphism` is code being written to work with an object of any shape, provided it has a certain interface (e.g. a `for / of` loop working with a variety of data structures, as long as they're `iterable`.)

- Symbols
  - In JavaScript, property names are _usually_ strings: but they can also be symbols.
  - The string you pass to `Symbol` is included when you convert it to a string and only used for visual recognition in e.g. the console.
  - It is possible to include symbol properties in object expressions and classes by using square brackets around the property name:
  ```js
  const toString = Symbol('makeAString');
  const myArr = [2, 4, 6]
  
  Array.prototype[toString] = function() {
    return `${this.length} cm of yarn`;
  };
  
  console.log(myArr.toString()); // → 2,4,6
  console.log(myArr[toString]()); // → 3 cm of blue yarn
  ```
  
- The Iterator Interface
  - The object given to a `for / of` loop is expected to have a method on it associated with the `Symbol.iterator` symbol 
  - The `Symbol.iterator` is defined by the language, and stored as a property of the `Symbol` constructor function
  - When called, that method should return an object that provides a second interface, `iterator`. 
  - This object should have a `next` method that returns an object.
  - That object should have: 
    - a `value` property (which provides the next value, if there is one), and 
    - a `done` property (which should be `true` when there are no more results and `false` otherwise).
  - NB `next`, `value`, and `done` property-names are plain strings, not symbols.

- Inheritance
  - The keyword `extends` indicates that this class shouldn’t be directly based on the default `Object` prototype but on some other class.
  - The `constructor` of such a class first calls its superclass’s constructor through the `super` keyword (to gain that class' instance properties.)
  - While encapsulation and polymorphism are generally regarded as wonderful, inheritance is now more controversial.
    - Encapsulation and polymorphism can separate pieces of code from each other, reducing the tangledness of the overall program.
    - Inheritance, however, fundamentally ties classes together, creating more tangle.
    - When inheriting from a class, you usually have to know _more_ about how it works than when simply using it.

**Exercises**
```js
// A Vector Type
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  length() {
    return Math.abs(this.x) + Math.abs(this.y);
  }

  plus({ x, y }) {
    this.x = this.x + x;
    this.y = this.y + y;
  }

  minus({ x, y }) {
    this.x = this.x - x;
    this.y = this.y - y;
  }
}

// Groups
class Group {
  constructor() {
    this._group = [];
  }

  static from(iter) {
    const newGroup = new Group();
    for (const item of iter) {
      newGroup.add(item);
    }
    return newGroup;
  }

  add(val) {
    if (this._group.includes(val)) {
      return;
    } else {
      this._group.push(val);
    }
  }

  delete(val) {
    const valIndex = this._group.indexOf(val);
    if (valIndex > -1) {
      this._group.splice(valIndex, 1);
    }
  }

  has(val) {
    return this._group.includes(val);
  }
}

// Iterable Groups
class IterableGroup {
  constructor() {
    this._group = [];
    this.iterationIndex = 0;
  }

  static from(iter) {
    const newGroup = new IterableGroup();
    for (const item of iter) {
      newGroup.add(item);
    }
    return newGroup;
  }

  add(val) {
    if (this._group.includes(val)) {
      return;
    } else {
      this._group.push(val);
    }
  }

  delete(val) {
    const valIndex = this._group.indexOf(val);
    if (valIndex > -1) {
      this._group.splice(valIndex, 1);
    }
  }

  has(val) {
    return this._group.includes(val);
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.iterationIndex === this._group.length) {
          return { done: true };
        } else {
          const value = this._group[this.iterationIndex];
          this.iterationIndex++;
          return { value, done: false };
        }
      },
    };
  }
}

// Borrowing a Method
// Solution: set `hasOwnProperty` as a symbol.
```

## Chapter 7: Project: A Robot

- The fact that something sounds like an object in reality (a robot, a parcel, a place) does not automatically mean that it should be an object in a program. 
  - Reflexively writing classes for every concept in your application tends to create a collection of interconnected/coupled objects that each have their own internal, changing state. 
  - Such programs are often hard to understand and thus easy to break.
  - Instead, gather the minimal set of values that define the program, or that the program needs, and compose objects based on them.

**Exercises**
```js
/* None of these seemed very fun 
 (they involved reading a lot of fairly terse code 
 in order to accomplish fairly open-ended, difficult-to-verify tasks)
 so I haven't done them (yet, at least.) */
```

## Chapter 8: Bugs and Errors

- When you know your program is malfunctioning, and want to find out why: 
  - Resist the urge to start making random changes to the code to see whether that makes it better. 
  - Instead, _think_. 
  - Analyze what is happening and come up with a theory of why it might be happening.
  - Then, make additional observations to test this theory;
  - or, if you don’t yet have a theory, make additional observations to help you come up with one.

- Putting a few strategic `console.log` calls into the program is a good way to get additional information about what the program is doing.

- The `throw` keyword is used to raise an exception.
  - _Exceptions_ can be any value. 
  - Raising one somewhat resembles a super-charged `return` from a function: 
    - it jumps out of the current function, then 
    - continues unwinding the stack, throwing away all the call contexts it encounters, 
    - all the way down to the first call that started the current execution. 
  - You can then set `catch` statements along the stack to handle the exception as it is zooming down the stack. 

- We often use the `Error` constructor to create our exception value.
  - This is a standard JavaScript constructor that creates an object with a `message` property. 
  - In most JavaScript environments, instances of this constructor also gather information about the call stack that existed when the exception was created, a so-called stack trace. 
  - This information is stored in the `stack` property and can be helpful when trying to debug a problem.

- JavaScript doesn’t provide support for selectively catching exceptions: either you `catch` all that bubble up, or you don’t catch any.
  - Usually we subclass `Error`, then use `instanceof`, to handle specific errors:
  ```js
  class InputError extends Error {}
  
  function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
  }

  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again.");
    } else {
      throw e;
    }
  }
  ```

**Exercises**
```js
// Retry
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(operand1, operand2) {
  const shouldFail = Math.ceil(Math.random() * 5) > 1;
  if (shouldFail) {
    throw new MultiplicatorUnitFailure("BORP");
  } else {
    return operand1 * operand2;
  }
}

function safeMult(o1, o2) {
  try {
    return primitiveMultiply(o1, o2);
  } catch (error) {
    if (error instanceof MultiplicatorUnitFailure) {
      return safeMult(o1, o2);
    } else {
      throw error;
    }
  }
}

// The Locked Box

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  getContent() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

function withBoxUnlocked(boxInteraction) {
  if (box.locked) {
    try {
      box.unlock();
      boxInteraction();
      box.lock();
    } catch (error) {
      box.lock();
    }
  } else {
    try {
      boxInteraction();
    } catch (error) {}
  }
}

const addGold = () => box._content.push("gold piece");
const waitPirates = () => {
  throw new Error("Pirates on the horizon! Abort!");
};

withBoxUnlocked(addGold);

try {
  withBoxUnlocked(waitPirates);
} catch (e) {
  console.log("Error raised:", e);
} finally {
  console.log("After, box locked?", box.locked);
}

```

## Chapter 9: Regular Expressions

- A regular expression is a type of object. 

- It can be built in one of two ways:
  - By constructor: `let re1 = new RegExp("abc");`
    - With this method, you can use concats/template literals to dynamically create expressions: `let regexp = new RegExp("\\b(" + name + ")\\b", "gi");`
    - Because you're passing a string, you need to add a second backslash in order to use special characters (like `\b`, above).
    - Likewise, inside the string var (above, `name`) you'll need to escape any chars that regexp might interpret with a special meaning:
    ```js
    const name = "dea+hl[]rd";
    let escapedName = name.replace(/[\\[.+*?(){|^$]/g, "\\$&");
    let regexp = new RegExp("\\b" + escapedName + "\\b", "gi");

    let text = "This dea+hl[]rd guy is super annoying.";
    console.log(text.replace(regexp, "_$&_")); // → This _dea+hl[]rd_ guy is super annoying.
    ```
  - By literal: `let re2 = /abc/;`
    - Here, you must put a backslash before any forward slash that you want to be part of the pattern (as opposed to ending it.)
    - Backslashes that aren’t part of special character codes (e.g. `\n` ) will be preserved, and (if they precede any of the characters with special meanings in regular expressions, e.g. `?` or `+`) will instruct the program to read the character itself.

- Common special characters
  - `\d` is for 'digits'; `\D` is the opposite
  - `\w` is for 'words' (alphanumerics); `\W` is the opposite
  - `\s` is for _any_ whitespace (including e.g. newlines and tabs); `\S` is the opposite
  - `\b` is for word boundaries
    - Either the start/end of the string, or any point in the string that has a `\w` on one side and a `\W` on the other
    - NB this boundary-marker doesn’t match an actual character; it just enforces that the rest of the regular expression only matches when such a boundary is present.

- Within square brackets:
  - A hyphen between two chars can be used to indicate a range, where the ordering is determined by the chars' Unicode numbers.
  - Special characters, such as `+` and `.`, lose their special meaning.
  - To express that you want to match any character _except_ the ones in the set, you can write a caret after the opening square bracket.
  - Use `[^]` (any character that is not in the empty set of characters) as a way to match any character across line breaks; `[.]` won't cross newlines.

- Outside square brackets:
  - Enclosing multiple chars in parentheses makes them count as a single element, as far as the operators following it are concerned.
  - A pipe indicates that either pattern to its left or the pattern to its right will match. (NB Parentheses can limit the part of the pattern that the pipe operator applies to.)
  - A plus sign after something indicates that the element may be repeated more than once.
  - A question mark after something indicates that the element is optional (it may match zero times, or one time.)
  - An asterisk after something indicates that the element may match any amount of times, including zero times.
  - `^` and `$` are a best practice to make sure the expression matches the whole line, not just part of it.
  - Braces after something indicates it should occur a specific number of times: 
    - Putting `{4}` after an element requires it to occur exactly four times. 
    - Putting `{2,4}` after an element requires it to occur at least twice and at most four times.
    - Putting `{4,}` after an element requires it to occur four or more times. 

- After the literal's closing forward-slash, you can denote case-insensitivity with an `i`

- Regular expression objects have several methods. 
  - The simplest is `test`: `console.log(/abc/.test("abcde"));  // → true`
  - `exec` will return `null` if no match was found; if one was, it returns an object with information about the first match:j
    - An `index` property that tells us where in the string the successful match begins,
    - An `input` property that returns the original string argument, and
    - An array containing the match(es) in string format:
      - The first item will always be the match.
      - When the regular expression contains parentheses-grouped subexpressions, those will be the second+ items: `console.log(/bad(ly)?/.exec("badly")); // → [ 'badly', 'ly']`
      - If a parentheses-grouped subexpression is not matched, its item will be `undefined`: `console.log(/bad(ly)?/.exec("bad")); // → [ 'bad', undefined]`
    - `String.match` behaves similarly: 
      - `console.log("one two 100".match(/\d+/)); // → ["100"]`
      - One important difference: if called globally, `match` will instead return an array containing _all_ matched strings: `console.log("Banana".match(/an/g)); // → ["an", "an"]`
    - The `match` and `exec` methods can usefully pair with subexpressions to for extract parts of a string:
      ```js
      function getDate(string) {
        let [_, month, day, year] =
          /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
        return new Date(year, month - 1, day);
      }
      console.log(getDate("1-30-2003"));
      // → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)
      ```

- The `Date` class:
  - The `new Date()` constructor takes either one or seven arguments.
    - If seven: 
      - The first three are required.
        - They are year, month, and day.
        - Unlike all others, month starts from 0 (i.e. `11` === December)
      - The last four arguments are optional.
        - They are hours, minutes, seconds, and milliseconds.
        - If not provided, they're set to zero.
    - If one: 
      - It's treated as a timestamp.
      - Timestamps are the number of milliseconds since the start of 1970 (in the UTC time zone.)
  - It has several `get*` methods.
    - `getMonth`, `getHours`, `getMinutes`, and `getSeconds` return what you'd expect.
    - `getDate` returns the day of the month (the third arg).
    - `getFullYear` returns the year (`getYear` gives you the year minus 1900; it's largely useless.)
    - `getTime` returns the (milliseconds since 1970) timestamp.

- String values have several methods that take regular expressions.
  - The `search` method
    - `String.indexOf` can't be called with a regex argument
    - `String.search` returns the first index on which the expression is found, or `−1` when it isn’t found
    - It can only ever start its search from the `0` index, unlike `String.indexOf` 
    - To perform such a search, you need to set the `lastIndex` property on the regex itself (which must be `g`lobal or stick`y`), then call `exec` (_yes this is hacky_):
      ```js
      let pattern = /ba/g;
      pattern.lastIndex = 5;
      let match = pattern.exec("foo bar baz");
      console.log(match.index); // → 8

      ```
  - The `replace` method
    - The first of its arguments can be a regular expression, in which case it will only replace the first match
    - If that regexp-argument is suffixed with `g`, it will replace all matches:
      ```js
      console.log("Borobudur".replace(/[ou]/, "a"));  // → Barobudur
      console.log("Borobudur".replace(/[ou]/g, "a")); // → Barabadar
      ```
    - The second argument of `replace` can be a string, or a function.
    - If a string: 
      - You can use `$1` through `$9` to refer the text that matched against the first (second, third... ninth) subexpression in the first argument.
      - You can use `$&` to refer to the the whole match (including all subexpressions)
    - If a function, any matching groups will passed to the function as the arguments following the first one (which will be the entire match), e.g.
      ```js
      let stock = "1 lemon, 2 cabbages, and 101 eggs";
      function minusOne(_match, amount, unit) {
        amount = Number(amount) - 1;
        if (amount == 1) unit = unit.slice(0, unit.length - 1);
        if (amount == 0) unit += "s";
        return amount + " " + unit;
      }

      // \d+ is bound as 'amount', \w+ as 'unit'
      console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

      // → 0 lemons, 1 cabbage, and 100 eggs
      ```

- Some operators are "greedy"
  - The repetition operators ( `+` , `*` , `?` , and `{}` ) match as much as they can, and only backtrack after.
  - If you put a question mark after them ( `+?` , `*?` , `??` , `{}?` ), they match as little as possible, moving forward in the string only when the remaining pattern does not fit the smaller match:
  ```js
  const stripCommentsGreedy = (code) => code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
  const stripCommentsNonGreedy = (code) => code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");

  console.log(stripCommentsGreedy("1 /*a*/ + /*b*/ 1")); // → 1 1
  console.log(stripCommentsNonGreedy("1 /*a*/ + /*b*/ 1"));  // → 1 + 1
  ```

- To scan through (and operate on) all occurrences of a pattern, use `exec` inside the condition of a `while` loop:
  ```js
  const input = "A string with 3 numbers in it... 42 and 88.";
  const number = /\b\d+\b/g;
  let match;
  while (match = number.exec(input)) {
    console.log("Found", match[0], "at", match.index);
  }
  // Found 3 at 14
  // Found 42 at 33
  // Found 88 at 40
  ```
- By default regular expressions work on code units, not actual characters/codepoints.
  - You can add the `u` option to a regex to ensure it reads codepoints rather than code units.
  - You can pair the `u` option with `\p` inside the regex to match a given Unicode-standard property:
    ```js 
    console.log(/\p{Script=Greek}/u.test("α"));  // → true
    console.log(/\p{Script=Arabic}/u.test("α")); // → false
    console.log(/\p{Alphabetic}/u.test("α"));    // → true
    console.log(/\p{Alphabetic}/u.test("!"));    // → false
    ```

**Exercises**
```js
// Regexp Golf
/ca(r|t)/         // car and cat
/pr?op/           // pop and prop
/ferr(et|y|arri)/ // ferret, ferry, and ferrari
/ious$/           // Any word ending in ious
/\s(\.|,|:|;)/    // A whitespace character followed by a period, comma, colon, or semicolon
/[\w]{7,}/        // A word longer than six letters
/^[^eE]+$/        // A word without the letter e (or E)

// Numbers Again
/^[+\-]?([\d]+[\.]?[\d]*|[\d]*[\.]?[\d]+)([eE][+\-]?[\d]+)?$/
```

## Chapter 10: Modules
- A better alternative to `eval` is to use the `Function` constructor, which takes two arguments
  - The first is a comma-separated string listing all args
  - The second is a string containing the function body
  - This variant wraps that second arg in its own function value, so it doesn't interfere with other scopes
    ```js
    let add = Function("a,b", "return a + b;");
    console.log(add(2,3)); // → 5
    ```

- Under the hood, CommonJS' `require` behaves something like this:
  ```js
  require.cache = Object.create(null);
  function require(name) {
    if (!(name in require.cache)) {
      // In this code, `readFile` is a fictional version of the browser/node 
      // method that [1] reads a file and [2] returns its contents as a string.
      let code = readFile(name);
      let module = {exports: {}};
      require.cache[name] = module;
      let wrapper = Function("require, exports, module", code);
      wrapper(require, module.exports, module);
    }
    return require.cache[name].exports;
  }
  ```
  - Because `require` is a normal function call, taking any kind of argument, it can be hard to determine the dependencies of a module without running its code.
  - CommonJS modules create an empty interface object for you (bound to `exports`.)
    - However, you can replace that with any value, by overwriting `module.exports`.
    - This is done by many modules to export a single value (instead of an interface object.)

- JavaScript introduced its own, native ES modules in 2015
  - Instead of calling a function to access a dependency, they use a special keyword, `import`.
  - Similarly, the `export` keyword is used to export things. 
    - It may appear in front of a function declaration, class declaration, or binding definition (`let`/`const`/`var`).
  - An ES module’s interface is not a single value but a set of named bindings.
    - When you `import` from another module, you import the binding, not the value
    - This means an exporting module may change the value of the binding at any time, and the modules that import it will see its new value.
  - When there is a binding named `default`, it is treated as the module’s main exported value.
    - `default` can precede a function declaration, class declaration, or expression: `export default ["Winter", "Spring", "Summer", "Autumn"];`
  - ES module imports happen _before_ a module’s script starts running. 
    - That means import declarations may not appear inside functions or blocks.
    - In addition, the names of dependencies must be quoted strings (not arbitrary expressions.)

## Chapter 11: Asynchronous Programming

