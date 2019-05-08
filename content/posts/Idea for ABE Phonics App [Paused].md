---
title: ABE Phonics App
date: "2019-05-05"
template: "post"
draft: true
slug: "/posts/abe-phonics-app-idea/"
category: "What I Think"
tags:
  - "Ed Tech"
  - "Teaching"
  - "Learning"
  - "Language Learning"
  - "Literacy"
  - "ABE"
description: "A return to the ideas underpinning a literacy app I wrote several years ago, and some thoughts on whether it would be valuable to reimplement."
---

## What Are We Doing Here?

```
> Use lightweight SVG's as multimedia component, to prompt/associate/describe basic words.
> 
> Push exercises instead of relying on pull of user; mobile instead of desktop
> 
> Predictive text as tool for sight-reading / chunking phonemes (click full word to more-quickly construct sentence)?
>
> - Original scribble
```

So the background here is that I have two parallel queues that I’m trying to get to the bottom of, in parallel: one is a series of (often one-line) jottings for an app/course/institution idea; the other is ~three-dozen files of extracted clippings and notes from various books (_some running to several pages each._) 

Clearing an item from a given queues requires different skills, both analytic and compositional, so I’m taking it as an opportunity to apply some (_admittedly pretty naïve_) [interleaving,](https://www.scientificamerican.com/article/the-interleaving-effect-mixing-it-up-boosts-learning/) and doing my best to switch off between (expanding/attacking the ideas) and (revisiting/editing the notes.) 

That latter queue, however, has about twice as much material, so I've been exploring some daydream-jottings I might otherwise have dismissed out of hand. Which has more than once put me in the interesting situation of engaging with line of text for which I retain context, like the above. 

Specifically: [didn’t I already do this?](https://github.com/ypaulsussman/karen_english_picture_dictionary) And, sure, badly: but also, like... two years ago?


## What Could We Do About It?

This '_idea_' post has become, then, less of a brainstorm and more of a two-years-out retrospective on what I would do differently, were I to rewrite that application.

---

Number one: 

mobile first -- SpeechSynthesis API not supported at the time on webkit browsers 

PWA's can be cool, but I often wonder if the effort expended would not be better allocated in just creating a mobile app... and then I spend more than 30 seconds looking at what it takes to build a native mobile app.

third option i wasn't aware of at the time -- react native. somewhat

That said, this may be a case for the process is more important than end product—-Lighthouse is an incredible guide for, and most of the criteria you need to meet before it will allow you to claim “PWA status” will be beneficial for any visitor/device/bandwidth to your app.

---

second: images probably not enough, at least by one metric 

CASAS => not test solely of EN or literacy, but also of bundled cultural knowledge

One reaction might be rather than using this as a tool for ABE/ESL literacy is using it as a variance on dual lingo where the learners are already familiar with the implications of, say, a hamburger menu Or a “share“ arrow emerging from a tray

The other might be, on a v2, to create a better admin dashboard for bilingual users to add L1 translations -- but even that presupposes/demands L1 literacy on the part of the student

---

third: still no tool present in this space 

Hannah: “students never use software outside of lab.” 

Unless studying really is there full-time job,Optional homework, and especially self-directed up time is practice just isn’t very likely to happen, certainly not on a sustained time frame

On reflection, makes perfect sense — if my SRS software doesn’t shoot me a push notification, I forget about it for days on end (and then find myself with 47 cards to catch up on…) 


## And Why?

Biggest thing mitigating against building an app for any current students: no idea what their lives are like outside of the classroom, what they do during the time that I would be trying to convince him to use this application instead

Previously, when I was working with a similar population full-time, I had at least some of that insight: I would coordinate convoys took food banks on the weekend, I attended weddings and funerals, hell, sometimes I even took out a couple holders for coffee because it was fun and they wanted to know more about computers and ask the right questions

And that level of interaction really only came about after half a year of working full-time with several members of the community, 40 hours plus a week. That’s not gonna happen in my current once a week volunteering—as with language learning, it looks like it really is a numbers game, all about the hours put in

Nothing about us without us --> distrust pretty much anything that rhymes, but I've never seen fail as a guide for projects or products (or laws, or...)



## Next steps

