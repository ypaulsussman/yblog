---
title: Meetup and Event Notes
date: "2017-12-06"
template: "post"
draft: true
slug: "/posts/meetup-and-event-notes/"
category: "What I Read"
tags:
  - "Ed Tech"
  - "Kafka"
  - "DNS"
  - "JavaScript"
  - "React"
description: "Notes from various events I've attended. My infrequency of participation leads me to compile them all into one document; if needed, I'll disaggregate later."
---

### Educelerate, September 2018: Jobs to Be Done, Part 01

Be careful of the trap of using user/client/customer data that you already have. It's easy, because it's already there: but don't take for granted that it includes all the information you need (because it almost certainly does not.) Be sure to ask yourself: what data do we wish we had?

Remember the McDonald's research on milkshakes, and their greatest number of purchases occurring at 9am (because that is what parents used to preoccupy their children on the way to school or kindergarten) -- in that case it was competing not with juice, or soda: but with an iPad or a pacifier. Be sure that you know exactly what your product is competing with, because it may not be what you think.

**Job to Be Done:** what does the customer want to achieve?

- Functional aspects (_cost, timing, duration, location -- start with these, to quickly narrow down/focus options_)
- Emotional aspects (_subjective requirements -- harder to reason about quantitatively, but ultimately with a higher ROI for persuasion_)
  - Personal - how the customer feels
  - Social - how the customer thinks society sees it

Good phrasing to start from: “_I need ${x} so that${y}._”

Focus on one JTDB at a time.

One product may have different jobs for different users.

This framework may also be used to shape process/project flows (e.g. buyer funnels)

**Adult Ed User Persona** (_for JTBD, p2_ --> which you skipped b/c of work constraints)

- Age 35
- Works at distro center
- \$50k/yr
- FTE
- HSE
- Two kids < 7yrs
- “I need `${a new job}`, so that `${[I can get more money, my family sees me as more of a role model, I can keep my body from falling apart]}`.”
- “I need `${flexibility in when/where I study}` so that `${I don’t lose my current job while retraining}`.”

---

### Jr Devs MPLS, June 2018: Intro to DNS

DNS resolver (for example, 8.8.8.8 for Google) first asks if it already knows the route; then, it’ll query (first the Root, then the TLD, then the Domain) servers to get ever more-precise information about the URL’s route.

DS only returns the route of the exactly-queried URL, allowing for “security through obscurity.” (If you asked for “example.com,” you’ll never be told about, for example, “secret.example.com”)

The browser, OS, and DNS was over each have their own cache, each checking for a saved IP address.

TTL (time to live) is how long you can cache an IP address before invalidating it.

- Benefits of a short TTL: changes will happen quickly; mistakes stay around for last time.
- Benefits of a long TTL: better performance; somewhat better security if you \*are\* hacked (and can then regain control before anyone sees what the hackers have added.)
- Average TTL in business tends to be around 1-4 hours.

The `dig` command looks up (as a default) the A Record of the site that is passed in as the argument.

Different records:

- A record: the main record.
- MX record: where to send the email for a domain.
- CNAME record: maps one name to another. (Won’t work on a “naked” or route to domain: must use for example “www.domain.tld,” not “domain.tld.”)
- TXT record: freeform, sometimes used to prove ownership (Google analytics does this)
- ALIAS record: not actually part of the DNS spec, but used to map CNAME records to “naked” domains.

There’s no such thing as a “DNS redirect”; it’s marketing for an HTTP redirect (the server queried just sends you on.) This room is important because it can confuse people: because it is HTTP, it means you won’t get e.g. SSH or FTP.

DNS is a common attack vector. If you control DNS? You control MX. If you control MX? You control the organization’s email. If you control the email? You basically control the organization...

---

### JSMN Meetup, May 2018: Lightning Talks

**React Native:**

- Expo:

  - Platform add-on for React Native
  - Avoid native code for (e.g. push, geolocation services, file storage, etc.)
  - Can update (...sort of) without pushing to App Store

- Styling in React Native:

  - Only Flexbox
  - Component scoped styles (good for modularity; bad for theming)

- NativeBase

  - Cross-platform component library
  - Great for bootstrapping!
  - Not great at separating themes.
  - Still not universal set of code.

- React Native Router Flux 4.0: now declarative, but mediocre documentation.
- Use browser stack for E2E testing (android only)
- Reselect: selector library for manipulating state from store. Check this out!

**Intersection Observer API:**

- Allows you to set reactions based on element’s position in the viewport -- via a native JS API.
- Previously, you could use `requestAnimationFrame` to throttle e.g. `onScroll` events... but it was not very performant.
- Major use-case: lazy loading!
- Intersection observer is asynchronous
- It’s on all browsers except for Safari.
- Check out David Walsh and MDN for intros.

---

### JSMN Meetup, January 2018: The JS Event Loop

**Lightning Talk: building a client-side, real-time collaborative editor**

- [OT vs CRDT](https://stackoverflow.com/questions/26694359/differences-between-ot-and-crdt&sa=D&ust=1543023893835000) for data structures -- latter is much newer (since 2011, vs 1989!) but more scalable
- WebRTC...

  - Has a data channel (as well as a audio/video)
  - Requires a ‘signalling server’ to initiate a connection (but only that: no user data is exchanged)
  - Uses UDP by default (but can use TCP)
  - Uses \[1\] a STUN server and \[2\] a TURN server to traverse network address translators (gateways that are located in the path between two endpoints of communication)

- Google is pushing [QUIC](https://en.wikipedia.org/wiki/QUIC&sa=D&ust=1543023893837000) pretty hard (as an alternative to TCP)

**Main talk:**

- *Threads* are the sequences onto which functions add memory operations (for order of execution.)
- *Single-threaded systems* are easier to debug, and more logical to reason about: but they are prone to stack overflows/slower performance.
- The *callback queue* ignores callbacks within your own functions; it only holds API callbacks.
- Methods on the `window` object are API’s - {`XHR`, `setTimeout`, `requestAnimationFrame`} all aren’t part of ECMAScript!
- Note: using any of the above to set a function onto the callback queue? Just use a Promise...
- Multiprocessing/parallel computing in JS:
  - HTTP request (use another computer’s core... I mean it is multithreading lol), but doesn’t scale (by data transmitted), and network-dependent.
  - GPU’s (library called GPU.JS- but uses limited subset of JS, and lots of interoperability issues.)
  - Web Workers (no access to DOM: but it is actual multithreading!)

---

## React MPLS, January 2018: Redux and Sagas

Unidirectional data flow allows for a declarative render-tree (each component is only responsible for rendering itself.)

Store is expressed as a tree; reducers take an action and return new state.

The meat of a function should be in the reducer (not the action).

*Thunk* allows an action creator to return function, not object (which Thunk then immediately calls), allowing us to interact asynchronously with the action. Problem: easy to fall into callback hell.

The Saga *pattern* solves async/compound state updates, managing disparate activities as a single transaction by composing a “compound action” (series of callback functions; none may interact with others; each comes with “compensating function” in case of an error.)

The Sagas _library_ enables doesn’t truly allow for Saga pattern -- but gets pretty close.

_A generator_ is a function that you can halt the iteration/performance of, from within the object. (Generators underpin async/await!)

A saga is the top-level generator that responds to an event type.

A task is called from a saga, and exist within them. (The difference is mostly semantics.)

Inside a saga/task, you yield a value to pass it back to the `redux-saga` middleware -- generally we’re yielding effects (an object, much like those the reducers pass along.)

`takeEvery` vs `takeLatest`-- if an action is called multiple times, `takeEvery` will perform all of them. This allows for really fine-grained control over how multiple events interact with each other.

`take` simply takes the next case of this event.

You can yield a `promise` from any saga or task by `yield delay` (imported from `redux-saga`.)

`yield select` will be passed the latest state for the redux store; that’s how you interact state from within the sagas.

`yield spawn` and `yield fork` allow you to connect disparate tasks, and it doesn’t matter when each completes - you can pick back up when you’re ready.

`yield cancel` allows you to shut down a task without (necessarily) triggering an error.

`yield cancelled()` will return true if a task has been passed into `yield cancel()`

---

### Skyway Software Symposium, December 2017: Intro to Apache Kafka

**Terminology**

- Record: key, value, and timestamp
- Topic: categories of records

**4 API's:**

1.  Producer API: publish a stream to 1+ topic
2.  Consumer API: subscribe and process topics' records
3.  Streams API: transform and retransmit incoming streams
4.  Connector API: build producer/consumers which connect topics to non-Kafka systems

**Some Distinctions**

- Request/Response app: receive one message; return one message.
- Batch-process app: receive many messages; return many messages.
- Request/Response app: send message to specific receivers.
- Publish/Subscribe app: send message aligned w/ category, unaware of who may be subscribed to that category.

**Problems, at enterprise scale:**

- pipeline sprawl entangles data-flow and data-integration.
- everything is synchronous: OK for UI, but business logic is too-often asynchronous.

As such, relying solely on req/res calls for large businesses is impossible.

Bold claim: all data can be beneficially viewed as event streams where...

1.  "event" means "an immutable record that something changed", and
2.  "stream" means "data pipeline with triggers to react, process, and transform that data."

[_Side note:_] sensor data works very well as event streams.

[_Side note:_] DB's can be event streams! (A sequence of updates to a table.)

**Kafka** is a platform for management of many, many event streams.

Logging an offset is just appending to the end of a partition: therefore, consumers are cheap! (So: Kafka decouples reader and writer costs very, very well.)

Kafka `Connect` is where the really cool stuff happens. There are several hundred preexisting connectors to leverage.

Kafka's USP vs traditional enterprise messaging are: scale, guarantees, and the stream process.

### Startup Week EdTech Founders' Panel, October 2017

Participants:
- IGDI lab (individual growth and development indicators)
  - U of M - proud history of general outcome measures
  - Early Learning Labs
- Urturn: gMaps of desired ed outcomes
  - "Mimicking mint.com, Fitbit"
  - 790 kids per counselor in MN (50th); national avg, 500
- Kidblog - online publishing for k-6
- Fanschool - fantasy sports for learning

Do your project/product for fun, then when it becomes overwhelming set up a company.
* "Small bets" -- first on your own, in your class; then using gsites for a few friends; then trial with [4.0 Schools](https://4pt0.org/) -- each time testing a (_progressively more important_) hypothesis
* Steve Blank: “_a startup is just discovery process for a business: once you have sustainable scalable model, then it's a business._” A startup is inherently temporary -- it's a search for a model, not an institution.

Selling to k-12 is hard; selling to teachers is hard; offering trainings is hard. 
* License with channel partners (_established selling to schools_) if selling in the above spaces.
* If selling to a school? Max 2 or 3 year contract (so can re/negotiate).
* Public schools will buy in March-May; pay in June -- must prepare for this.
* Pricing: math must be easy for buyer
* Use competitive analysis to get at a pricing model.
* Follow the money -- e.g. the ESSA title 4 "family involvement" grant exists. Ask the school: how going to spend that fed cash? (_Answer, often: "we hadn't thought about it / we didn't even know we qualified..."_)
* Help school write grant in order to pay for your product. [Teaching Strategies LLC](https://teachingstrategies.com/contact/support/) provides grant application boilerplate on site for schools (!)

Large recent expansion in ECE financing, in order to improve achievement gap... big question on everyone's mind, currently: what to do with that money?

Lots of grant money out there, too -- ok to focus on those, not traditional startup funding sources. Example: SBIR (_small business innovation research_) grants are underrated: follow ‘em.

Cherish opportunities to learn about business: it’s none of our backgrounds. Learn to write a business plan -- participate in MNCup b/c it forces you to write one

[Traction](https://www.cmiteamwork.com/documents/BookReport-Traction.pdf) -- the book to read; recommended by literally 3 out of 4 participants as “maybe most important book” -- crucial for maximizing meetings.

Take lessons from [Amazon Inspire](https://www.edsurge.com/news/2017-06-26-what-happened-to-amazon-inspire-the-tech-giant-s-education-marketplace), too (_OK, but... which?_)
