---
title: ABE Phonics App
date: "2019-10-03"
template: "post"
draft: false
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

So the background here is that I have two queues for which I’m trying to reach the bottom, in parallel: one is a series of (often one-line) jottings for an [app, course, PhD thesis, institution, etc] idea; the other is ~three-dozen files of extracted clippings and notes from various books (_some running to several pages each._) 

Successfully clearing either queue's items requires different skills, both analytic and compositional, so I’m taking it as an opportunity to apply some (_admittedly pretty naïve_) [interleaving,](https://www.scientificamerican.com/article/the-interleaving-effect-mixing-it-up-boosts-learning/) and doing my best to switch off between (developing/interrogating the ideas) and (organizing/contemplating the notes.) 

That latter queue, however, has about twice as much material, so I've been exploring some daydream-jottings I might otherwise have dismissed out of hand. Which has more than once put me in the interesting situation of engaging with line of text for which I retain absolutely no context: like the above! 

Specifically: [didn’t I already do this?](https://github.com/ypaulsussman/karen_english_picture_dictionary) And, sure, badly: but also, like... two years ago? This '_idea_' post has become, then, less of a brainstorm and more of a two-years-out retrospective on the "Karen-English Picture Dictionary," or KEPD.

## What Could We Do About It?

### Foreground as paramount what the learner is _doing_

My initial thought, and of a pedagogical nature: I set out to build to this with the contention that selected-response associations across four modalities (_L1 writing, L2 writing, L2 speech, and image_) would be enough to actuate users' mental construction of the requisite form:meaning maps.

I probably wasn't _totally_ wrong? But, as they say, there's a big gap between "necessary" and "sufficient."

This may partially have been an error in targeting: I envisioned to the app as something like extra-class practice for [CASAS](https://www.casas.org/product-overviews/curriculum-management-instruction/sample-test-items) -- that is, a tool to ablate some of the unhelpful (_but implicitly mandatory!_) "teaching to the test" that's necessitated by many states' tying of student gains on said test to continued funding (_...compounded by that test's [somewhat-dubious construct validity](https://eric.ed.gov/?id=EJ1164354)._)

I now believe those modalities to have simultaneously offered too little, and expected too much. 

In the case of the former, no media prettiness or UI efficiency can compensate for exercises which are themselves not terribly related to the real-life behaviors they purportedly practice. 

While "multiple-choice" unites both (_many of the_) the CASAS tests and the KEPD's exercises, the act of _selecting_ those choices could not be more different: consider the sequential component actions that compose filling in a ScanTron circle with a #2 pencil, versus tapping a stylized, immaterial button on an LCD screen. They're unrelated -- a triviality to those of us who've grown up in contexts where we do both with daily frequency, but unlinked, alien tasks to many of our students.



One reaction might be rather than using this as a tool for ABE/ESL literacy is using it as a variance on dual lingo where the learners are already familiar with the implications of, say, a hamburger menu Or a “share“ arrow emerging from a tray

### Just learn RN already

My second conclusion, on reassessment, is to acquiesce to others' "_native mobile software for native mobile hardware_" pitch.

Intrinsically I mistrust the duopoly of walled gardens, especially in contrast to the (_albeit idealized_) open standards underlying the browser space, but... well, there are undeniable utility reasons why that duopoly has so tenaciously maintained.

While it appears the `SpeechSynthesis` API is _now_ [largely supported across browsers](https://caniuse.com/#feat=mdn-api_speechsynthesis), at the time of my building the KEPD? WebKit (_and, by extension, pretty much any browser living on iOS, Safari or not_) did not, and the last thing any (_very..._) junior developer wants to encounter during a frantic solo-project dash-to-MVP is the needs to engage not merely in cross-browser but cross-_device_ testing. 

(_Admittedly, cross-device testing is going to be a necessity in any native-mobile development, as well: but adding browser sensitivities on top is one extra layer of pain that I would prefer never to again encounter._) 

Given the way things worked out, I wouldn't say I'm _still_ traumatized: but you also won't see me adding a `manifest.json` or `service-worker.js` to my applications for any reason other than to please [Lighthouse](https://developers.google.com/web/tools/lighthouse/v3/scoring#pwa) anytime soon.



---

### Confirm there's a need, and that problem

## And Why?

third: still no tool present in this space 

Hannah: “students never use software outside of lab.” 

Unless studying really is there full-time job,Optional homework, and especially self-directed up time is practice just isn’t very likely to happen, certainly not on a sustained time frame

On reflection, makes perfect sense — if my SRS software doesn’t shoot me a push notification, I forget about it for days on end (and then find myself with 47 cards to catch up on…) 

Biggest thing mitigating against building an app for any current students: no idea what their lives are like outside of the classroom, what they do during the time that I would be trying to convince him to use this application instead

Previously, when I was working with a similar population full-time, I had at least some of that insight: I would coordinate convoys took food banks on the weekend, I attended weddings and funerals, hell, sometimes I even took out a couple holders for coffee because it was fun and they wanted to know more about computers and ask the right questions

And that level of interaction really only came about after half a year of working full-time with several members of the community, 40 hours plus a week. That’s not gonna happen in my current once a week volunteering—as with language learning, it looks like it really is a numbers game, all about the hours put in

Nothing about us without us --> distrust pretty much anything that rhymes, but I've never seen fail as a guide for projects or products (or laws, or...)

## Next steps

