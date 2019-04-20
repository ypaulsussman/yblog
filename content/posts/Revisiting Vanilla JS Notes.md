---
title: Revisiting Vanilla JS Notes
date: "2019-03-04"
template: "post"
draft: false
slug: "/posts/vanilla-js-revisitation/"
category: "What I Think"
tags:
  - "JavaScript"
  - "Computer Science"
description: "Thoughts on JavaScript, data structures, algorithms, and my prior studies of each."
---

## Where Are We Coming From?

Best efforts aside, I've maintained an anxious chip on my shoulder for having missed ~~much~~ <small>all</small> of the traditional CS coursework, prior to my career as a developer.

Colleagues in the earlier stages of their professional life have confided, with some surprising frequency, that such studies contribute much less to their daily success as a programmer than, say, internships, personal projects, university-sponsored hackathons, etc. An equal percentage of more-senior developers, however, equivocate concerningly when the topic comes up around the lunchtable.

Obviously, not all slices of CS-BA/BS-FOMO are equally compelling. I’m more comfortable with my lacuna of expertise in, say, chipboard control tasks than I am with that whiteboard Scylla and Charybdis, Data Structures and Algorithms.<sup>1</sup> To at least prepare myself to remedy this in the future -- to be pointed in the right direction, should the need arise to undergo that training -- over the last 18 months I’ve essayed multiple lukewarm introductions to both fields.

Each of these three note-sets has gone unopened and unreferenced since the time of their completion, so this revisitation carries with it a frisson of uncertainty: had I used _any_ of this content, even unconsciously? Or is it simply too many layers of abstraction below what I typically find myself working on?

## Rereading Notes: Two Books, One Workshop

Somewhat unfairly, I'd lumped [_Object-Oriented JavaScript_](https://www.packtpub.com/web-development/object-oriented-javascript-second-edition) in with the two more explicitly-related texts, largely because I didn’t have a better bucket to add it to. These notes promptly repaid this slight by being the only document featuring content that I _have_ actually made use of at work or home in the last ~year. So much for unconscious usage.

I wonder what the "reacquaintance" corollary to the [Baader-Meinhof complex](https://en.wikipedia.org/wiki/Baader%E2%80%93Meinhof_effect) would be titled. In the back of my head, I dimly store the difference between passing-by-reference and passing-by-value, and if queried I could easily-enough dredge it up: but (_as the distinction appears so rarely in my daily coding, at least_), it was unexpectedly refreshing to encounter the explicit definitions, laid out clearly and with enumerations of its most-common gotcha (e.g. "_whoops I **did** just mod the original...right?_") Especially when that gotcha then randomly resurfaces 2-3 times in the following week or so.

I wonder, too, if I'm seeing fewer and fewer cases of the `.call`/`.apply` methods because ES6 modules have made encapsulation easier to both [1] reason about and [2] tighten... or if I just don’t work enough within lower-level utility packages/libraries that (_appear to_) rely on more classical OOP practices. Either way, I should keep an eye out for them in the wild: it (_unscientifically_) feels, at least, like they were omnipresent in our (Backbone/jQuery/CoffeeScript) legacy code.

And, finally, the warmest of warm fuzzies: though I hadn't thought about them via their generic descriptions (_as presented here_), each of the mentioned design patterns almost instantaneously connected to a vivid example in our code base. I recall the early sense of frustration at not being able to grok, _a priori_, e.g. Factory [vs] Observer [vs] Singleton: oh, what a difference twelve months of Ruby makes.

## Next Steps

Parallel to your conclusions from the React revisitation (_that is, on learning more about underlying browser technologies_), when you get a second, spend some time more-deeply learning:
1. [the details of `history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History_API#The_pushState()_method), and
2. [the most common usages, and methods for use, of `document.cookie`.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)

And, you know, beyond that? Maybe the most meaningful takeaway from these three texts is the realization not every review **does** need to conclude with a toy-app to spec out, or a resolution for future involvement/action.

Sometimes, the sum of a Revisitation (_big R, as in "an instance of this experiment you're undertaking to return to notes you've written in the past"_) really can be to simply take a pore-through at the materials, reflect on whatever value studying them has provided to you in the time intervening, and move on. 

And that's okay!

--- 

<sup>1</sup>Not, to be clear, because I have any driving interest in working at a FAANG: but rather because my inference, based on those lunchtable conversations, is that thinking through the problems offered in those courses is good training for the sort of problem-solving that goes into architecting and leading development on an at-scale web app. 

Which, for all I know, might be hilariously inaccurate?