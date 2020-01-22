---
title: Rethinking An ABE Phonics App
date: "2019-10-01"
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

That latter queue, however, has about twice as much material, so I've been exploring some daydream-jottings I might otherwise have dismissed out of hand. Which has more than once put me in the interesting situation of engaging with line of text for which I retain absolutely _no_ context: like, for example, the excerpt above! 

Specifically: [didn’t I already do this?](https://github.com/ypaulsussman/karen_english_picture_dictionary) And, sure, badly: but also, like... two years ago? This '_idea_' post has become, then, less of a brainstorm and more of a many-months-out retrospective on the "Karen-English Picture Dictionary," or KEPD.

## What Could We Do About It?

### Foreground what the learner is _doing_ inside the app

My initial thought, and of a pedagogical nature: I set out to build to this with the contention that selected-response associations across four modalities (_L1 writing, L2 writing, L2 speech, and image_) would be enough to actuate users' mental construction of the requisite form:meaning maps.

I probably wasn't _totally_ wrong? But, as they say, there's a big gap between "necessary" and "sufficient."

This may partially have been an error in targeting: I envisioned to the app as something like extra-class practice for [CASAS](https://www.casas.org/product-overviews/curriculum-management-instruction/sample-test-items) -- that is, a tool to ablate some of the unhelpful (_but implicitly mandatory!_) "teaching to the test" that's necessitated by many states' tying of student gains on said test to continued funding (_...compounded by that test's [somewhat-dubious construct validity](https://eric.ed.gov/?id=EJ1164354)._)

I now believe those modalities to have simultaneously offered too little, and expected too much. 

In the case of the former, no media prettiness or UI efficiency can compensate for exercises which are themselves not terribly related to the real-life behaviors they purportedly practice. 

While "multiple-choice" unites both (_many of the_) the CASAS tests and the KEPD's exercises, the act of _selecting_ those choices could not be more different: consider the sequential component actions that compose filling in a ScanTron circle with a #2 pencil, versus tapping a stylized, immaterial button on an LCD screen. They're unrelated -- a triviality to those of us who've grown up in contexts where we do both with daily frequency... but unlinked, alien tasks to many of our students.

Not only does (the process of matching an input to the correct translation, amongst three distractors) not carry much situational authenticity: it also demands a facility with mobile-app icons and interactions that many recently-arrived ABE/ESL learners are (_quite reasonably_) lacking.

So, then: I'd unintentionally built an app that [1] required an excessive level of digital literacy to navigate and, if that condition were met, [2] repaid it with (_pleasantly designed!_) self-paced drills of minimal extrinsic (_via test-oriented prep_) applicability.

In a rewrite, rather than deploying KEPD as a tool for NRS 1 literacy training, I'd reposition the app as a supplement to homework for those post-initial-literacy learners (NRS 2-3) who are already familiar with the implications of, say, a hamburger-menu icon, or with responding to the appearance of an unexpected dropdown. 

(_My hope is that this version of the app would then be approached and used as a simple vocabulary-builder, rather than a tool for acclimation to the world of semimonthly standardized test-taking._) 

### Just learn RN already

My second conclusion, on reassessment, is to acquiesce to others' "_native mobile software for native mobile hardware_" pitch.

Intrinsically I mistrust the duopoly of walled gardens, especially in contrast to the (_albeit idealized_) open standards underlying the browser space, but... well, there are undeniable utility reasons why that duopoly has so tenaciously maintained.

While it appears the `SpeechSynthesis` API is _now_ [largely supported across browsers](https://caniuse.com/#feat=mdn-api_speechsynthesis), at the time of my building the KEPD? WebKit (_and, by extension, pretty much any browser living on iOS, Safari or not_) did not, and the last thing any (_very..._) junior developer wants to encounter during a frantic solo-project dash-to-MVP is the needs to engage not merely in cross-browser but cross-_device_ testing. 

(_Admittedly, cross-device testing is going to be a necessity in any native-mobile development, as well: but adding browser sensitivities on top is one extra layer of pain that I would prefer never to again encounter._) 

Given the way things worked out, I wouldn't say I'm _still_ traumatized: but you also won't see me adding a `manifest.json` or `service-worker.js` to my applications for any reason other than to please [Lighthouse](https://developers.google.com/web/tools/lighthouse/v3/scoring#pwa) anytime soon.

More fatal to the PWA hypothesis was my experience with students' usage of their phones' web browsers: or, rather, its complete absence. (_Requisite disclaimer that this describes not merely an anonymous aggregate of prior ABE/ESL students with whom I've interacted, but also... like 80% of the smartphone-owning populace writ large._) 

When "_App Store_" is the sole search engine, let alone app-discovery method, on a user's device... the process of "_open this "browser" app, click the bar at top, type this impenetrable string of characters, navigate to the website, open this native overlay-widget and scroll a bit, intuit then select the save-to-home-screen option, exit this "browser" thing, then open the newly-present icon_" workflow is at best a polite delusion. 

If they won't come, don't build it: and you'll note both the preceding cases against a web-app don't even dip into the "_native just handles so much better_" argument. Were there any indication that a tool like KEPD would be engaged with from, say, in-classroom laptops, that would be a different calculation. 

Every feedback I got, though, was that it would be most desired within the context of a student's mobile phone, at home: and as far as I can tell, that means a native application.

## And Why?

Alright, then: an application pitched to students who already have at least L1 Literacy, an app promising nothing other than basic-vocabulary reading- and listening-practice, an app making use of native OS widgets. Is it still worth building?

Damningly, I don't even know -- which I think itself provides the answer.

I spent the first three-quarters of 2019 volunteering as a teacher at the distance-learning/digital-literacy lab in a local Minneapolis ABE/ESL school, and it was _great._ (_Commitments interfered with Q4, but I'm looking forward to the New Year..!_) 

To my mind, the strongest argument against building a similar app for any current students is the presumption it would imply: with little-to-no idea of what their lives are like outside the classroom, who am I to proffer alternative uses of their free time?

Previously, when I was working with a similar ABE/ESL population, I had at least some relevant insights: I would coordinate convoys to food banks on the weekend, I attended weddings and funerals, sometimes I even took out a couple elders for coffee because it was fun and they wanted to know more about computers.

But that level of interaction really only came about after half a year of working full-time with several members of the community, 40+ hours a week. Expecting anything similar from one-hour once-a-week volunteering position strikes me as... aggressive. Aggressively _optimistic,_ but still aggressive.

## Next steps

"_Nothing about us without us._" I distrust pretty much anything that rhymes, but I've yet to see that dictate fail as a guide for projects or products. I would _love_ (_love love love!_) to spend my time building useful tools for the learners and practitioners of the ABE/ESL world: but now that I'm not even one of those two anymore, I think any definition of "_useful_" has to be detailed by genuine stakeholders. So, for now at least, I think I'm out of the space.

But, at least, thanks the process of writing the above? I feel a little better about it. 
