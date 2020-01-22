---
title: Revisiting Various React Notes
date: "2019-02-17"
template: "post"
draft: false
slug: "/posts/react-revisitation/"
category: "What I Read"
tags:
  - "React"
description: "Thoughts on my relationship to React, and how to leverage that relationship for future learning."
---

## Where Are We Coming From?

In contrast to my Ruby on Rails revistation, wherein I largely focused on what content was both `${presented in the learning materials}` and `${later used in my occasional interactions with the language/framework during working hours}`, in this revisitation I've focused more on what to do with the skills (such as they are) that I'd developed. 

For last five+ months (_save weeks when on dev support_), React has been my full-time occupation at work: importantly, not only in writing code, but also in reviewing the PR's of colleagues, including several much-senior developers. As such, there’s almost nothing in these three markdown files that I haven’t found myself applying at least occasionally over the last half-year. 

Instead, proceeding from the assumption that I've constructed a fairly workable beginner's grasp of React, I’m interested in what neighboring topic best intersect with that skillset: that is, what to learn next.

## Rereading Notes: Two Books, One Workshop

I read the first of these at my prior employer, in early 2018; I read the second while spending two months working through (_HAML, CoffeeScript, Backbone, Rails_) tickets to get up to speed with the new (_pre-React-rewrite_) codebase. 

The third occurred somewhere in between, but is suitably complex enough relative to the other two that I’m putting it at the end.

**_React Quickly_** 

Perhaps it’s this book's focus on “no theory, all practice,” but while revisiting these notes I was struck by one main realization.

With the exception of small asides, here and there (why _do_ I never use `setState` as a function? Wow, even if it's hideous, you _can_ use an IIFE as a child prop in JSX!), the content from this book has become almost second nature to me... but the that’s less reassuring than I would like. 

As it happens, the two regions of our codebase where I feel least confident are (via both our stats tracking and our API requests fired by Redux actions) how our Ajax calls are constructed. 

While gaining full fluency with the `XMLHttpRequest` API would have the added benefit of helping you to understand the technology underlying _any_ of the major frontend frameworks... for that same reason, it's likely not discussed in any of the texts about said frameworks. Meaning you'll have to search a little harder than normal.

**_Learning React_** 

Despite having encountered these throughout (_our particular implementation of_) Reduxland: re-read the “function as first class citizen” and “currying ” sections until you understand them instinctively. (_And write out the two examples in solely in ES5, and then again, solely in ES6, rather than the halfway version that currently exists._)

Lots of discussion around reasoning behind, and safe usages of, both `componentWillMount` and `componentWillReceiveProps`. From this vantage point, it's easier to see why they have been set on the path to deprecation.

Reading `$[the amount of discussion, even here, around dealing with latency in API calls}` reminds me of `${the amount of loading-spinner logic I've written in the last six months}`, which reminds me to that [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) is worth researching.

Rereading the details of action declaration, action creators, reducer combining, store subscriptions, and competing `compose` functions all remind me that [Suspense in about six months](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html#react-16x-mid-2019-the-one-with-suspense-for-data-fetching) is _extremely_ worth researching.

It seems like ever-more `${functionality that was formerly the purview of third-party libraries}`, then, accruing to the  React top-level API (_certainly the case if my intuitions are correct about Hooks'_ `useReducer`, _or perhaps_ `useCallback`/`useMemo` _for Reselect_), which leaves only one major feature absent the library (vis-a-vis, say, Angular or Vue.)

Well: what, then, _does_ React look like, when not used with a SPA? Do you need to manually set a `cache-control` header on the bundle, lest it lose the initial performance benefits? Even less exotically: what other client-side routing options are there? I've found several (e.g. [here](https://medium.freecodecamp.org/you-might-not-need-react-router-38673620f3d), [here](http://jamesknelson.com/routing-with-raw-react/), and [here](https://medium.com/@daveford/react-router-alternative-switch-acd7961f08db)), but none appear wholly production-tested. Is `react-router` essentially a necessity at this point? 

And, if so: how long until its functionality is subsumed and incorporated into the base React library? 

And, if soon: would that even be a bad thing?

I lack the answers to all three. 

**_Advanced React Patterns_** 

It’s only now, after months of working with three- and four-component deep render props, that I begin to see the intense merit of the “prop collection” and “prop getter“ patterns. But damned if it isn’t clear now...

There's something mildly dizzying about the fact that not so long ago, at the time of my taking these notes (_8? 9? months past_) I had noted down a couple hot! new! blog posts around the conveniences that the fully-supported Context API would bring to the ~~chore~~ process of props-passing.

And now that API has been superseded (_nota bene, I'd be the first to say rightfully_) by another method [_from within the same API._](https://frontarm.com/james-k-nelson/usecontext-react-hook/)

Damn, React team, you scary.

## Next Steps

The first `${nearest-cousin topic to study that this review points to}` is XHR; [this site](https://hpbn.co/xmlhttprequest/) hosts a (legal!) O'Reilly book that appears to cover it superbly, as well as 
1. the other most common browser API's, and 
1. several technologies that underpin them in turn. Add it to the list.

Following that: attempt to write the next React frontend that you work on using _solely_ the top-level API (this includes, if possible, adding `react-router` only when absolutely necessary.) Get comfortable with Hooks and Suspense.``