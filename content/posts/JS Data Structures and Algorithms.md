---
title: JS Data Structures and Algorithms (Groner, Loiane)
date: "2017-12-05"
template: "post"
draft: false
slug: "/posts/js-ds-algo-notes/"
category: "What I Read"
tags:
  - "Packt"
  - "JavaScript"
  - "Computer Science"
description: "Notes from a book I read one winter. (Tagline: \"This book is an accessible route deeper into JavaScript. You will gain an in-depth knowledge of how hash tables and set data structure functions, as well as how trees and hash maps can be used to search files in a HD or represent a database. We’ll also give you a better understanding of why and how graphs are largely used in GPS navigation systems in social networks.\")"
---

## Arrays

An array is the simplest memory data structure.

There are two data structures that have some similarities to arrays, but give us more control over the addition and removal of elements: stacks and queues.
* The `push` and `pop` methods allow an array to emulate a basic stack data structure.
* The `shift` and `unshift` methods allow an array to emulate a basic queue data structure.

JavaScript only supports one-dimensional arrays; it does not support matrices. However, we can implement matrices or any multidimensional array by using an array of arrays.
* The `every` method will iterate each element of the array until the return of the function is false.
* The `some` method will iterate each element of the array until the return of the function is true.
* If we need the array to be completely iterated no matter what, we can use the `forEach` function.
* The `filter` method returns a new array with the elements that the function returned true.
* The `reduce` method receives a function with the following parameters: `previousValue`, `currentValue`, `index`, and `array`. We can use this function to return a value that will be added to an accumulator, which is going to be returned after the reduce method stops being executed.
* The `sort` function can receive a parameter called `compareFunction`, which will be responsible for sorting the array:
```javascript
numbers.sort(function(a,b){
  return a-b;
});
```
The above code will return a negative number if `b` is bigger than `a`, a positive number if `a` is bigger than `b`, and zero if they are equal. This means that if a negative value is returned, it implies that `a` is smaller than `b`, which is further used by the sort function to arrange the elements.

---

## Stacks and Queues

A stack is an ordered collection of items that follows the LIFO (short for Last In First Out) principle.
* The addition of new items or the removal of existing items takes place at the same end.
* The end of the stack is known as the top and the opposite is known as the base.
* The newest elements are near the top, and the oldest elements are near the base.
* Example from real life: a pile of books.

A queue is an ordered collection of items that follows the FIFO (short for First In First Out) principle.
* The addition of new items or the removal of existing items takes place at opposite ends.
* The end of the stack is known as the tail and the opposite is known as the front.
* Example from real life: a line of people.
* Variants: priority queue (includes a number, either to [1] set the priority and add the element at the correct position, or [2] queue the elements as they are added to the queue and remove them according to the priority), and circular queue (tail item connects to front item.)

Side note: To **convert a decimal number to binary** representation, we can divide the number by 2 until the division result is 0. For example, number 20:
20 / 2 == 10 (rem == 0)
10 / 2 == 5 (rem == 0)
5 / 2 == 2 (rem == 1)
2 / 2 == 1 (rem == 0)
1 / 2 == 0 (rem == 1)
The binary representation, then, is 00101.

Careful: JavaScript has a numeric data type, but it does not distinguish integers from floating points: use Math.floor to get the integer value from e.g. division operations.

---

## Linked Lists

Linked lists store a sequential collection of elements.
* Unlike arrays, in linked lists the elements are not placed contiguously in memory.
* Each element consists of a node that stores the element itself and also a reference (also known as a pointer or link) that points to the next element. (The last node from the list will always have null as the next element.)

Array downsides:
* The length of an array is fixed, in most languages.
* Inserting/removing items from the beginning or middle of an array is expensive (because all following elements need to be shifted over.)

Linked List downside:
* If we want to access an element in the middle, we need to start from the beginning and iterate until we find the desired element. (In an array, we can directly access any element at any position.)

---

## Hashes

A **set** stores a `[key, key]` collection of elements, and a dictionary (or **map**) stores a `[key, value]` collection of elements. Unlike arrays, stacks, queues, and linked lists, it's a non-sequential data structure.

**Hashing** consists of finding a value in a data structure in the shortest time possible.
The most common **hash function**, called a "lose lose" hash function, creates a location (or hash value) for a given [key, value] on a table by:
1. summing up the ASCII values of each character in the string, then
2. using the modulo of that sum, as divided by an arbitrary number (this is done in order to work with lower numbers).

**"Lose lose"** hash functions result in frequent collisions (multiple keys having the same hash value.)

There are a few techniques to handle collisions:
* **separate chaining** -- creating a linked list for each position of the table, then storing the colliding elements in it. (It is the simplest technique; however, it requires additional memory outside the HashTable instance.)
* **linear probing** -- if the hash value at position index is already occupied, then we try index + 1, then index + 2, and so on. (This can be problematic in languages where we need to define the size of the array.)

The **djb2 hash function** is better than the "lose lose" hash function; really, it's one of the most highly recommended hash functions by the community:
```javascript
var djb2HashCode = function (key) {
      var hash = 5381; //initializing the hash variable with a prime number
      for (var i = 0; i < key.length; i++) { // iterating the `key` parameter 
                  hash = hash * 33 + key.charCodeAt(i); // multiplying the hash by a magic number, then summing with the key's ASCII value
        }
return hash % 1013; //modulo yet another random prime number
};
```

---

## Trees

A tree is an abstract model of a hierarchical structure.
* Each node has a parent (except for the first node at the top) and zero or more children.
* A tree node is often called a _key_.
* The top node of a tree is called the _root_.
* A node that does not have children is called an _external node_ or _leaf_.
* The pointers which represent the connections between the nodes are called _edges_.
* The _depth_ of a given node consists of the number of ancestors it has. (The root, then, is depth 0.)

A node in a **binary tree** has at most two children: one left child and one right child.
* This definition allows us to write more efficient algorithms for inserting, searching, and deleting nodes to/from a tree.
* Binary trees are frequently used in computer science.
* A binary search tree is a binary tree, but it only allows you to store nodes with lesser values on the left side and nodes with greater values on the right side.

There are three different approaches that can be used to traverse a tree (to visit all its nodes):
* An **in-order traversal** visits all the nodes in ascending order, meaning it visits the nodes from the smallest to largest. An in-order will first visit its left node, then the node itself, then the right node.
* A **pre-order traversal** visits the node prior to its descendants. The pre-order will visit a node first, then will visit its left node, and then its right node.
* A **post-order traversal** visits the node after it visits its descendants. The post-order will visit the left node, and then the right node, and at last, it will visit the node itself.

**Binary search trees** have a problem: one of the edges of tree can be much deeper than another. (This can cause performance issues when adding, removing, and searching for a node.)
* Although the average-case times for the lookup, insert, and delete methods are all O(log N) (where N is the number of nodes in the tree) the worst-case time is O(N).
* We can guarantee O(log N) time for all three methods by using a **balanced tree** - a tree that always has height O(log N).
* The important idea behind all of these trees is that the insert and delete operations may restructure the tree to keep it balanced. So lookup, insert, and delete will always be logarithmic in the number of nodes but insert and delete may be more complicated than for binary search trees.

Some balanced trees include:
* The Adelson-Velskii and Landis' tree (**AVL tree**) is a self-balancing BST tree, which means the height of both the left and right subtree of any node differs by 1 at most.
* A **red-black tree** is a BST with one extra attribute for each node: the color, which is either red or black.
   * Every node is either red or black.
   * The root of the tree is always black.
   * There are no two adjacent red nodes (a red node cannot have a red parent or red child.)
   * If a node is red, then both its children are black.
   * For each node with at least one null child, the number of black nodes on the path from the root to the null child is the same.
* A **heap** is a tree that satisfies the heap property: if P is a parent node of C, then the key (the value) of P is either greater than or equal to (in a max heap) or less than or equal to (in a min heap) the key of C. (The heap is one maximally efficient implementation of a priority queue.)

---

## Graphs

A graph G = (V, E) is composed of:
* V: A set of vertices
* E: A set of edges connecting the vertices in V

1. Vertices connected by an edge are called _adjacent vertices_.
2. A _degree_ of a vertex consists of the number of adjacent vertices.
3. A _path_ is a sequence of consecutive vertices, where v[i] and v[i+1] are always adjacent.
4. A _simple path_ does not contain repeated vertices.
5. A _cycle_ is a simple path, except for the last vertex (which is the same as the first vertex.)
6. A graph is _acyclic_ if it does not have any cycles.
7. Graphs can be _undirected_ (where edges do not have a direction) or directed (also called a _digraph_).
8. A graph is _strongly connected_ if there is a path in both directions between every pair of vertices.
9. Graphs can also be _unweighted or weighted_ (where the edges have weights.)

The most common graph representation is the **adjacency matrix**.
* Each node is associated with an integer (which is the array index.)
* The connectivity between vertices is a two-dimensional array.
* Example `array[i][j] === 1` if there is an edge from the node with index i to the node with index j; or 0 if there's no edge.
* Disadvantage: Graphs that are not strongly connected (sparse graphs) will be represented by a matrix with many zero entries, thereby wasting space in the computer memory to represent edges that do not exist.

Another representation is the **adjacency list**.
* This consists of a list of adjacent vertices for every vertex of the graph.
* We can thus use an array, a linked list, or even a hash map or dictionary. (For the latter, the key will be a given vertex, and the value will be an array of vertices that are adjacent.)

A third representation is an **incidence matrix**.
* Here, each row of the matrix represents a vertex, and each column represents an edge.
* The connectivity between the two objects using a two-dimensional array, as array[v][e] === 1 if the vertex v is incident upon edge e, or 0 if the vertex is not along that edge.

Each implementation has its own benefits.
* An incidence matrix is usually used to save space and memory when we have more edges than vertices.
* Adjacency matrices are fastest at finding out whether given vertices v and w are adjacent.
* Adjacency lists are probably better for most other problems, however.

The idea of graph traversal algorithms is that:
* we must track each vertex when we first visit it, and
* keep track of which vertices have not yet been completely explored.
* To completely explore a vertex, we need to look at each edge of this vertex.
* There are two algorithms that can be used to traverse a graph.

The **breadth-first search algorithm**...
* ...visits each layer of the graph at a time.
* ...will start traversing the graph from the first specified vertex, then will visit all its neighbors (adjacent vertices) first.
* ...stores the vertices in a queue, such that the oldest unexplored vertices are explored first.

The **depth-first search (DFS**) algorithm...
* ...has a three-step system:
   * will start traversing the graph from the first specified vertex, then
   * will follow a path until the last vertex of this path is visited, then
   * will backtrack and then follow the next path.
* ...that is, it explores the edges out of the most recently discovered vertex u. (Only edges to non-visited vertices are explored.) Then, when all edges of u have been explored, the algorithm backtracks to explore other edges where the vertex u was discovered.
* ...stores vertices in a stack, thus exploring them by lurching along a path, visiting a new adjacent vertex if there is one available.

**Topological sorting** (or topsort or even toposort) is used in order to specify the order that some tasks or steps need to be executed in. It is only applied to directed, acyclic graphs (a DAG.)

If we want to calculate the shortest path in weighted graphs (e.g. the shortest path between cities A and B, an algorithm used in GPS and Google Maps), BFS is not the best algorithm. Alternatives include...
* Dijkstra's algorithm,
* The Bellman–Ford algorithm,
* The A* search algorithm, and
* The Floyd–Warshall algorithm.

---

## Searching and Sorting Algorithms

Sorting and searching algorithms are widely used in daily problems: you need to sort first, then search the information given.

Bubble Sort:
* one of the simplest sorting algorithms
* one of the slowest sorting algorithms
* system:
   * compares every two adjacent items, and
   * swaps them if the first one is bigger than the second one.
* (Thus items tend to move up into the correct order, like bubbles rising to the surface.)
* Variant: _Improved Bubble Sort_ doesn't compare numbers that are already in place. (This is still complexity of O(n^2).)

Selection Sort:
* an in-place comparison sort algorithm
* system:
   * finds the minimum value in the data structure, then
   * places it in the first position, then
   * finds the second minimum value, and
   * places it in the second position, and so on.
* This is also complexity of O(n^2).
* Like the bubble sort, it contains two nested loops, which are responsible for the quadratic complexity.

Insertion Sort:
* builds the final sorted array one item at a time
* system:
   * assumes that the first element is already sorted, then
   * compares: should the second item [stay in its place (or) be inserted before the first item]?
   * compares: should the third item [stay in its place (or) be inserted before the first item (or) be inserted before the second item]?
* better performance than selection / bubble sort when sorting small arrays
* still unusably slow

Merge Sort:
* complexity of O(n log n): not great, but usable in some cases
* recursive
* system:
   * divides the original array into smaller arrays, until
   * each small array has only one position, then
   * merges these smaller arrays into bigger ones, until
   * one single sorted array is composed.

Quick Sort:
* most commonly-used sorting algorithm
* complexity of O(n log n), but performs better than most other O(n log n) algorithms
* also uses the divide and conquer approach (but without splitting them as the merge sort does)
* system:
   * selects the middle item in the array (the 'pivot'); then
   * creates two pointers:
      * the left one points to the first item of the array;
      * the right one will point to the last item of the array.
   * moves the left pointer until it find an item that is bigger than the pivot; also
   * moves the right pointer until it finds an item that is smaller than the pivot; then
   * swaps those two items. Next,
   * repeat this pointer-movement (the "partition operation") until the left pointer passes the right pointer. Finally,
   * repeat the previous steps for all sub-arrays (first sub-arrays with smaller values, and then sub-arrays with greater values.)

**Side Note:** The JavaScript Array class defines a `.sort` method, but ECMAScript does not define which sorting algorithm needs to be used. Each browser can implement its own algorithm: Firefox uses merge sort for its implementation, while Chrome uses a variation of quick sort.

Sequential Search
* most basic search algorithm
* most inefficient search algorithm
* compares each element of the data structure against the element desired

Binary Search
* requires prior sorting of data structure
* system:
   * selects value in the middle of the array;
   * if the selected value is less than the desired value, move right and repeat, but
   * if the selected value is greater than the desired value, move left and repeat.