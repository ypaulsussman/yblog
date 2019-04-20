---
title: Data Structures and Algorithms (Gandolfo, Bianca)
date: "2018-06-27"
template: "post"
draft: false
slug: "/posts/data-structures-algorithms-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "Computer Science"
description: "Notes from a FEM workshop I attended. (Tagline: \"This is a practical class is for students who are very comfortable with the JavaScript language but want to level up on their data structures and algorithms for interviews.\")"
---

First-Timers Only: good place to get started with open-source contributions.

You should be able to speak to each “Skills” bullet on your resume: why you chose it; what you used it for; something you liked/didn’t about it; what surprised you about it; etc.

Don’t just read interview questions: practice, and not only that? Practice with a timer, for interview verisimilitude (and also to clue you in on when to look for hints/references.)

[Awesome site for visualizations of data structures and algorithms.](https://visualgo.net/en)

Especially if you’re writing something to memory with each calling, recursive functions can rapidly add to space complexity, and even cause stack overflows.

`==` will compare that the properties of two objects are all the same; `===` will compare that they’re actually the same object (i.e. located at the same spot in memory.)

You can pretty much always use recursion instead of a loop... but it’s rarely worth the space complexity on the stack, or the difficulty of reasoning about.

---

## Common Datatypes

* **Linked Lists**
   * Great for data insertion/deletion
   * Often used to build other data structures
   * Nodes can be anywhere in memory: just need the right pointers.
   * No exact corrolary in JS: but very important structure in languages w/o dynamic arrays
   * Flexible size
   * Fast operations at each end (updating just means the modification of one pointer, usually)
   * Costly lookups, however
* **Stacks/Queues**
   * Keeping track of things on other data structures
   * Fast operations! (Stack: push/pop; Queue: enqueue/dequeue)
   * Both can be implemented from Arrays (with push/pop, or push/unshift)
   * Unshift doesn’t have constant complexity, but rather typically linear complexity (i.e. O=n), b/c you need to shift the length of the array (depends on implementation: it’s often optimized for in modern browsers.)
   * Good examples of Stacks: back button history; undo button history
* **Arrays**
   * Elements held in contiguous memory
   * Array !== String, b/c Strings are immutable (x/c in Ruby & PHP, where they’re just implementations of Arrays)
   * Arrays in JS are dynamic, so no need for memory allocation when declaring
   * Fast lookup and append
   * Slow insertion/deletion
* **Hash Tables**
   * Not ordered
   * Each index created by a hash function (takes a value; returns an integer key)
   * Great for fast lookups, because of flexible keys
   * Insert and remove at constant time, from magic of the hashing function
   * Slow worst-case lookups, b/c single-directional (however: we usually judge by average case, b/c worst-case is so rare when strategy below is followed. This is often called “amortized time complexity.”)
   * When a hash table is 50% full, best practice is to double hash size and re-hash each value (so as to redistribute them evenly across the new memory space); 50% has been researched as the point at which the frequencey of hash-collisions becomes dangerous.

---

When a parameter is **passed by reference**, the caller and the callee use the same variable for the parameter. If the callee modifies the parameter variable, the effect is visible to the caller's variable.

When a parameter is **passed by value**, the caller and callee have two independent variables with the same value. If the callee modifies the parameter variable, the effect is not visible to the caller.

---

## New JS Hash Table Implementations!

`Set` datatype:
* Only saves key, but key can be any datatype
* Doesn’t use dot/bracket notation; instead, .has/.get/.set methods
* Often used to quickly check that something has/hasn’t been called (?)

`Map` datatype:
* Key:value pair, but key can be any datatype
* Doesn’t use dot/bracket notation; instead, .has/.get/.set methods

---