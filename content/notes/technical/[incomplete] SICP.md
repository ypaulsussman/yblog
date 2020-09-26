# SICP Notes

## Berkeley 61A Lectures

### Lecture 04: Higher Order Procedures
- A first-class datatype can be...
  - the value of a variable
  - an argument to a procedure
  - the value returned by a procedure
  - a member of an aggregate
  - anonymous

### Lectures 05/06: User Interfaces (Alan Kay)

- Light-pens are are a bad input device 
  - continuous pressing on the button causes finger to go numb in ~20 sec
  - sketchpad discovered this in '62; we've been rediscovering it since

- The goal of user interface is to make a system that everyone can use _without_ losing any of the capabilities of the machine.

### Lecture 07: Orders of Growth (Time Efficiency)

- Timing is not a great measurement of algorithms; too many confounding variables.
- Better is calculating how many constant-time operations it requires, relative to the number of inputs (n)
- This... is big-O notation!
- Only one exception, usually, to "don't worry about constant factors" -- the videogame industry.
- Use big-Θ notation to asymptotically bound the growth of a running time to within constant factors above and below. 
- Sometimes we want to bound from only above: that's big-O notation.
- Big-O 'families' of time-complexity:
  - `O(1)`, `O(log n)`, `O(n)` => common in searching (respectively hash table, structured data, linear search)
  - `O(n log n)`, `O(n^2)` => common in sorting (former can be achieved by subdividing/sorting)
  - `O(n^3)` => matrix multiplication
  - `O(2^n)`, `O(n!)`, `O(n^n)` => 'intractable' operations: for any significant dataset, the program would never finish
  - 

### Lecture 08: Recursion and Iteration (Space Efficiency)

- Space efficiency less important now than in the e.g. 80's: computer memory just so much larger, now
- *Recursion* can be memory-intensive: 
  - each recursive call needs to wait until it receives a value from the function _it_ called
  - as such, each call needs to hold its own state in memory until it receives that value.
- *Iteration*, by contrast, "does the work on the way in" 
  - it passes its modified value(s) to the next call
  - this allows each call to release its hold on memory after calling the next function.
- A *tail call* is a subroutine-call performed as the final action of a procedure.
  - Tail calls can be implemented without adding a new stack frame to the call stack:
    - Most of the frame of the current procedure is no longer needed
    - That frame can be replaced (w/ small modifications) by the frame of the tail call.
    - The program can then jump to the called subroutine. 
  - Producing such code instead of a standard call sequence is called *tail call optimization*. 
  - *Tail-recursive* calls (when a function calls itself as a tail-call) are easier to optimize than general tail calls (less to modify!)


### Lecture 11: Calculator Example

- Three parts to any interpreter:
  - REPL/read-eval-print loop 
    - "print" b/c it logs whatever the eval's return-value is to the console
    - "loop" b/c last thing in it is a tail-call to itself
  - eval
  - apply



## MIT/HP Lectures
### Lecture 1a

- Computer science allows you to build "formal intuitions about _process_: a way to talk precisely about how-to knowledge"
  - Declarative knowledge: "what is true" (e.g. definition of a square root)
  - Imperative knowledge: "how to..." (e.g. how to pinpoint the square root of a number)

- A procedure is a way of talking about imperative knowlege.

- Each computing process is directed by a procedure, or series of patterns... patterns which can get very complex.

- This course is about techniques for controlling complexity. Three subtopics:
  - Black-box abstraction: suppress detail, such that you can build bigger (more powerful) boxes
  - Conventional interfaces: agreed-upon ways of connecting black-boxes
  - Metalinguistic abstraction: making new languages that suppress some details of the system and emphasize others

- Interesting: Abelson contrasts OOP not with FP, but rather with "operations on aggregates," manipulating streams of data. (_Which, yeah... basically sounds like FP._)

- The process of program-interpretation: a giant wheel of two processes, `eval` and `apply`, that perpetually reduce expressions to each other.

- Three primary components of a programming language:
  1. Primitive elements
  2. Means of combination
    - Combining an _operator_ with _operands_
    - NB operators themselves can be other combinations (e.g. `display (+ (5 3 (- 1 3)))` will return `6`) -- this is _composition_
    - Conditional syntax: 
      ```clojure
      (define (abs x)
        (cond ((< x 0) (- x))
              (else x)))

      ;; is identical to
      (define (abs x)
        (if (< x 0)
            (- x)
            x))
      ```
  3. Means of abstraction
    - `(define (square x) (* x x))` is syntactic sugar for `(define square (lambda (x) (* x x)))`
    - NB in other cases the parens following `define` matter:
      - `(define D (* 5 5))` will return `25` when `D` is called
      - `(define (D) (* 5 5))` will return that compound procedure of `(* 5 5)` when `D` is called -- you'll need to call `(D)` to return `25`

### Lecture 1b

- Substitution rule: to evaluate an application...
  1. evaluate the operator to get the procedure,
  2. evaluate the operands to get the arguments,
  3. apply the procedure to the arguments,
  4. copy the body of the procedure, substituting the invocation's arguments for the formal parameters, then
  5. evaluate the resulting new procedure.

- Basic conditional strcture: (If <predicate> <consequent> <alternative>)

- An _iteration_ is a system that has all its state in explicit variables.


## Chapter 1. Building Abstractions with Procedures

### 1.1  The Elements of Programming

- Why are we using Lisp as the framework for our discussion of programming?
  - Lisp descriptions of processes (_procedures_) can themselves be represented and manipulated as Lisp _data_. 
  - There are powerful program-design techniques that rely on this ability to blur the traditional distinction between 'passive' data and 'active' processes.
  
- Every powerful language has three mechanisms for combining simple ideas to form more complex ones:
  - _primitive expressions_, which represent the simplest entities the language is concerned with,
  - _means of combination_, by which compound elements are built from simpler ones, and
  - _means of abstraction_, by which compound elements can be named and manipulated as units.

#### 1.1.1  Expressions

- This is a _compound expression:_  `(+ 137 349)`
  - It's formed by combining 
    - expressions representing primitive data, like the numbers `7` or `2`, with 
    - an expression representing a primitive procedure, such as `+` or `*`. 
  - Expressions formed by 
    - delimiting a list of expressions 
    - within parentheses, to denote procedure-application
    - are called _combinations._
  - In lisp, every expression has a value.

- An aside: _prefix notation_ may be somewhat confusing at first; but 
  - it can accommodate procedures with an arbitrary number of arguments: `(+ 21 35 12 7)`
  - it easily extends to allow combinations to be nested: `(+ (* 3 5) (- 10 6))`


#### 1.1.2  Naming and the Environment

- A critical aspect of a programming language is the means it provides for using names to refer to computational objects. 
  - the _name_ identifies a _variable_ 
  - whose _value_ is the _object_.

- `define` is Scheme's simplest means of abstraction. 
  - it lets us 
    - use simple names to refer to 
    - the results of compound operations.
    - That is, `(define size 2)` causes the interpreter to associate the value `2` with the name `size`.
  - Note e.g. `(define x 3)` is _not_ a combination: it does not apply `define` to the arguments following it.
    - Such exceptions to the general evaluation rule are called _special forms._
    - The set of these expressions, each with its own associated evaluation-rule, constitute the language's syntax.

- The interpreter must maintain some sort of memory to keep track of these name-object pairs, in order to both associate values with symbols _and_ later retrieve them.
  - This memory is called the _environment._
  - The environment, ultimately, determinines (as instructed) the meaning of the symbols in expressions. 

#### 1.1.3  Evaluating Combinations

- To evaluate any given combination, the interpreter itself follows a recursive procedure. It:
  1. First evaluates the subexpressions of that combination, then
  2. Applies 
     1. the procedure that is the value of the leftmost subexpression (_the operator_) to 
     2. the arguments that are the values of the other subexpressions (_the operands._)

#### 1.1.4  Compound Procedures

- _Procedure definitions_ are a powerful abstraction technique
  - They allow a compound operation to 
    - be given a name and then 
    - referred to as a unit.
  - The general form of a procedure definition: `(define (<name> <formal parameters>) <body>)`
    - The `<name>` is a symbol 
      - to be associated with the procedure definition 
      - in the environment.
    - The `<formal parameters>` are the names 
      - used within the body of the procedure 
      - to refer to the corresponding arguments of the procedure.
    - The `<body>` is an expression (or sequence of expressions) 
      - it will yield the value of the procedure application 
      - when the formal parameters are replaced 
      - by the actual arguments to which the procedure is then applied.
  - An example: `(define (square x) (* x x))`
  - The `<name>` and the `<formal parameters>` are grouped within parentheses, 
    - just as they will be in actual calls to the procedure, after it's defined.

- Observe that there are two different operations being combined:
  - we are creating the procedure, and 
  - we are giving it the name `square`. 
  - It is important to be able to separate these two notions: 
    - to create procedures without naming them, and 
    - to give names to procedures that have already been created.

 

#### 1.1.5  The Substitution Model for Procedure Application

- To evaluate [a combination whose operator names a compound procedure], the interpreter follows a process similar to evaluating [a combination whose operators name primitive procedures]. 
  - It:
    - first evaluates the elements of the combination and 
    - then applies 
      - the procedure (the value of the combination's operator) to 
      - the arguments (the values of the combination's operands.)
  - One difference: to apply a compound procedure to arguments, it follows the _substitution model._
    - That is, it:
      - evaluates the body of the procedure, but 
      - with each _formal parameter_ replaced by the corresponding _argument_. 
    - NB: the purpose of the model is to help us think about procedure application, not to describe how the interpreter really works. 
      - Typical interpreters do not evaluate procedure applications by manipulating the text of a procedure to substitute values.
      - The 'substitution' is typically accomplished by using a local environment for the formal parameters.

- There are two evaluation-models, describing different sequences:
  - Applicative-order evaluation
    - 'evaluate the arguments, and then apply' 
      - First evaluate the operator and operands,
      - then apply the resulting procedure to the resulting arguments
    - Described in section 1.1.3
    - What the interpreter actually uses
  - Normal-order evaluation
    - Do not evaluate operands until their values are needed.
    - 'fully expand, and then reduce' 
      - first substitute operand expressions for parameters until 
      - it obtains an expression involving only primitive operators, 
      - then perform the evaluation. 

```clojure ;; actually scheme but the highlighting is right
;; Given
(define (f a)
  (sum-of-squares (+ a 1) (* a 2)))

(f 5)

;; AOE

(sum-of-squares (+ 5 1) (* 5 2)) ;; step 1

(+ (square 6) (square 10)) ;; step 2

(+ (* 6 6) (* 10 10)) ;; step 3

(+ 36 100) ;; step 4

136

;; NOE

(sum-of-squares (+ 5 1) (* 5 2)) ;; step 1

(+ (square (+ 5 1)) (square (* 5 2))) ;; step 2

(+ (* (+ 5 1) (+ 5 1)) (* (* 5 2) (* 5 2))) ;; step 3

(+ (* 6 6) (* 10 10))  ;; step 4

(+ 36 100)  ;; step 5

136

```

- Lisp uses AOE:
  - Additional efficiency obtained from avoiding multiple evaluations of expressions, e.g. `(+ 5 1)` and `(* 5 2)` above
  - NOE becomes much more complicated to reason about for procedures that are too complex to be modeled by substitution

- Still, NOE is a valuable tool (see later chapters.)

#### 1.1.6  Conditional Expressions and Predicates

- In Lisp, the syntax for notating _case analysis_ is `cond`:
    ```clojure
    (define (abs x)
      (cond ((> x 0) x)
            ((= x 0) 0)
            ((< x 0) (- x))))
    ```
  - The first expression in each pair is a _predicate._ 
    - That is, an expression whose value is interpreted as either true (`#t`) or false (`#f`).
    - In Scheme, when the interpreter checks a predicate's value, 
      - it interprets `#f` as false. 
      - Any other value is treated as true.
  - If none of the predicates is found to be true, the value of the `cond` is undefined.
  - An alternative syntax:
    ```clojure
    (define (abs x)
    (cond ((< x 0) (- x))
          (else x)))
    ```
     - `else` is a special symbol that that always evaluates to a true value.
  - A third syntax: 
    ```clojure
    (define (abs x)
      (if (< x 0)
          (- x)
          x))
    ```
      - `if` is a restricted type of conditional that can be used when there are precisely two cases.
        - In a `cond` clause, each <expression> _may_ be a sequence of expressions.
        - In an `if` expression, the <consequent> and <alternative> must both be single expressions. 

- Three logical-composition operations:
  - For `(and <e^1> ... <e^n>)`,  the interpreter evaluates the expressions <e> one at a time, left-to-right; 
    - If any <e> evaluates to false, the value of the `and` expression is false, and the rest of the <e>'s are not evaluated. 
    - If all <e>'s evaluate to true values, the value of the `and` expression is the value of the last expression.
    - e.g. `(and (> x 5) (< x 10))`
  - For `(or <e^1> ... <e^n>)`,  the interpreter evaluates the expressions <e> one at a time, left-to-right;
    - If any <e> evaluates to a true value, that value is returned as the value of the or expression, and the rest of the <e>'s are not evaluated. 
    - If all <e>'s evaluate to false, the value of the or expression is false.
    - e.g. `(or (> x y) (= x y)))`
  - For `(not <e>)`, 
    - the value of the returned expression is true when the expression <e> evaluates to false, and false otherwise. 
    - e.g.`(not (< x y)))`
  - NB that `and` and `or` are _special forms_, not _procedures_, because the subexpressions are not necessarily all evaluated. (`not` is an ordinary procedure.)

#### Exercises

http://community.schemewiki.org/?sicp-solutions
https://repl.it/languages/Scheme/

#### 1.1.7  Example: Square Roots by Newton's Method

https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book-Z-H-10.html#%_sec_1.1.7