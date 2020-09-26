---
title: Digging into Node (Simpson, Kyle)
date: "2019-05-09"
template: "post"
draft: true
slug: "/posts/digging-into-node-notes/"
category: "What I Read"
tags:
  - "Node"
  - "Javascript"
  - "Frontend Masters"
description: "Notes from a live workshop I attended. (Tagline: \"This workshop focuses on the fundamental concepts in Node.js, and build them up to understand how we can get the most of Node.js in our applications.\")"
---
# Digging into Node

## Intro

* Binary extensions vs compiled -- issue, apparently for both bundler and npm! @ytodo: read more about difference
* Google's JS engine, V8 = just another C++ program... so you can write your own bindings to it
* Node - not just "JS on the server" -- really cool element = concept of event loop 
* Actual origin of node = 'high-throughput, low-latency socket servers' 
    * Didn't even need to be JS! Originally was node.rb... 
    * Ruby can't do I/O-bound tasks w/ asynchrony well; JS has it for free
* I/O = e.g. read/writes to filesystem, not CPU-bound (which is 2-4 orders of magnitude faster)
* Threads = good for concurrency at CPU level; not so efficient at I/O-bound tasks
* On server, node best at 'middle-end' features - routing, templating, data validation, etc 
    * they all bridge gap between client and server logic
    * lets backend become stateful JSON API; lets frontend focus on UI; processes data between them

---

## ex1 - Paths, Files, Arguments, EnvVars 

* POSIX subsystem - how C-style programs interact with OS
    * Three streams model I/O to program (input, output, error)
    * Node made design decision to follow same system, via `process` object
* Streams are a first-class citizen/data structure in node
    * Hook into them w/ e.g. `.stdout`, `.stderr` 
    * `console.log` does many things _in addition to_ calling `.stdout`
    * note that `.write` with a string as a param is way less efficient than passing it binary/file data
* `node x1.js 1>/dev/null` => reirects anything on the `stdout` stream to the '_bytes trashcan_' (`/dev/null`); 
    * `2>` would do the same for the `stderr` stream
    * takeaway here: in node, don't use `console.log`, even though you can! 
    * stream-writes way more powerful (for other programs)
* `stdin` more quirky/finicky/influenced by shell state than other two streams
    * we use `process.stdin.read()` rarely
    * more common is preexisting package, `getstdin`
* `#! /usr/bin/env node` => shebang command; 
    * OS offers `env` file; 
    * it finds the executable with the same name as argument 
    * this lets you not list every possible path to the node file
* `process.argv` => array of arguments; first two are path to node version and path to file
    * so, in practice, often just use `process.argv.slice(2)`

We'll use the `minimist` package to parse args by regex (node doesn't provide this by default). The underscore key below holds the 'overflow' that minimist wasn't able to parse:
```js
exercises $ ./ex1.js --foo='bar' -c9
{ _: [], foo: 'bar', c: 9 }
```

Second `minimist` param is how to interpret specific argument names:
```js
var args= require('minimist')(process.argv.slice(2),
  {
    boolean: ['true'],
    string: ['filename']

  })
```

* Alternative to `minimist` = `yargs`; it's a little more featureful, and autogens help list

* `path` => node package, to resolve pathnames
    * uses `__dirname` as location if we give it a relative path
    * otherwise, uses absolute path 
* `__dirname` => magic variable provided by node; provides current directory of current file
* `fs` => another node package, for filesystem 
    * by default its `readFileSync` will pull out binary buffer from file
    * `console.log` will immediately stringify this buffer!
    * need to use `process.stdout.write` instead
    * alternative, pass encoding format (e.g. 'utf-8') as second param to `readFileSync`
    * `readFile` is async version
        * Node: "everything that's not part of startup (e.g. `require`) should be asynchronous" ...but _everything_ in a command-line script is "part of the start up" 
        * `readFile` expects a callback

* `get-stdin` => returns promise 
* So, three ways to get external values: reading from files, from passed-in arguments, and from prexisting envvars

---

# ex2 - Streams

Note, though, that pulling 11 chars into memory is fine; pulling say a 1gb data file, less so. This is where node's stream processing really starts to shine.
* Check out the [node stream handbook](https://github.com/substack/stream-handbook)
    * Read stream/write stream => 'simplex', unidirectional stream
    * Duplex stream = not covered here
    * `process.stdout` = writable stream (so can be piped, as below)
* Call `.pipe` method on a readable stream, passing the writable stream as its argument
    * Return value from a `.pipe()` call is another _readable_ stream
    * This means you can chain!
    * Similar: call the `push` method on a readable stream to add data 
* Method on `fs`, `.createReadStream`, will give you new (readable) stream
    * `.createWriteStream` requires a path as its param
* Creating these requires only ~56kb (?) of memory at a time, even on giant files
* `stream` package is provided by node; it provides the `Transform` constructor;
    * `Transform` has one method to implement, `transform`;
    * `transform` takes three params, `chunk, encoding, callback`
* `zlib` package also native to node; provides streams-based (un)zipping for Gzip/Brotli compression 
    * @ytodo: brotli compression? research

---

# ex3 - Asynchrony 

* `end` event is fired when a stream method finishes
* All the async interfaces in node are optimistic -- they act as though they'll definitely finish
* Promises are kind of a black box for asynchrony: can't really set a timeout
* CAF is one tool to provide this cancelability 
* `Promise.all` for when all promises (regardless of sequence) resolve 


---

# ex4 - DB reads/writes

* sqlite doesn't require you to run a separate db server: it's literally just a module modifying a `.db` file using the OS' filesystem.
* `util.promisify` => takes a function expecting callbacks; returns function expecting promises
* In node, uses `let` for all blocks and `var` for all function scopes

---

# ex5 - HTTP

* `http` module handles gory details
* `node-static-alias` => wrapper around `node-static` 
    * (static-file server for mime-type handling, content-length, etc) 
    * wrapper has slightly more declarative routing
* `req/res` are streams -- HTTP streams, but streams nonetheless
* Most node router middleware boils down to a series of `if`-statements
* Over 10mb of JSON sent over wire? Use a stream; otherwise, HTTP's built-in chunking should work fine

---

# ex6 - Express

* The `express` function itself returns an automatically-generated function definition, which is then passed to `http.createServer`
* `app.get` for GET requests; `app.use` for any request types
* `express.static` also static file server; almost identical to `node-static`
* You can pass into `app.use` a function with three params `(req,res,next)` 
    * `next` is a function you call after processing to move to the next `app.*` listener
    * if you _don't_ call next, it'll assume you've done everything you need and return
* @ytodo: scott moss' intro to using Express as an API

---

# ex7 - child processes

* `child_process` => you call it with `spawn` to spin up separate process
    * `.spawn` params: first is the command to run; second is an array of string arguments
    * it returns an object with standard I/O streams that you use to communicate with it
    * that object does so with its `.on` method
* Use `node-fetch` package to mimic browser's `fetch` api, when you want to make outbound requests
* Note: child processes are actually pretty heavy -- better to find different way for replicating `ActiveJob` / worker dynos

---

## Conclusion

* Debugging in CLI environment = unpleasant; not very detailed. Instead, use Chrome DevTools remotely!
    * Open `chrome://inspect/#devices`
    * Discovers and listens to `localhost` port by convention; no need to configure
    * Avoid `Open dedicated DevTools for Node` link... unclear what it's for, but doesn't really do anything
    * Next, when running node script from CLI, pass `--inspect` flag
    * Note: you have to check the `Pause on caught expressions` checkbox in `Sources` tab to enter actual debug mode
    * `NDB` is a packaged version of the Chrome tools that many prefer to accessing through the browser itself 
* Streams, really, are the fundamental thing to understand


