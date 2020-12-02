---
title: Rethinking An ABE Literacy App
date: "2019-10-01"
template: "post"
draft: false
slug: "/posts/abe-literacy-app/"
category: "What I Think"
tags:
  - "EdTech"
  - "Language Learning"
  - "Learning"
  - "Literacy/ABE"
description: "I revisited the ideas underpinning a dictionary/word-recognition literacy app I wrote several years ago, and wrung my hands over whether to reimplement it."
---

## What Are We Doing Here?

For my solo project at [Prime's](https://www.primeacademy.io/courses/engineering) web-development bootcamp, I built [an app for my former students.](https://github.com/ypaulsussman/karen_english_picture_dictionary) And, sure, badly: but also more than two years ago, now!

This post is my long-delayed retrospective on the "[_Karen_](https://en.wikipedia.org/wiki/S%27gaw_Karen_language)_-English Picture Dictionary_," or KEPD. There are several decisions, both technical and pedagogical, that I would make differently: I suspect at least two could guide even unrelated future apps.

## What Could We Do About It?

### Foreground what the learner is _doing_ inside the app

I built the original KEPD with the assumption that selected-response activities (_in KEPD, multiple-choice questions_) would be enough for learners to build `form => meaning` associations for each vocab item.

They hypothesis was that:

1. a single, lone exercise-format is inefficient (_and likely insufficient_) for training word-recognition and decoding, but
2. the app could compensate by offering heterogeneous prompts, varying across four modalities (_in KEPD, L1 (Karen) writing, L2 (English) writing, L2 speech, and images._)

I now believe that system offered too little, and required too much.

For what was offered: no rich-media prettiness or UI sleekness can ultimately compensate for exercises that are unrelated to the real-life behaviors they purport to practice.

Partially, this was a flaw in how I understood the problem: originally, I'd envisioned the app as extra-class practice for the [CASAS](https://www.casas.org/product-overviews/curriculum-management-instruction/sample-test-items) exam. (_Many states tie student gains on that test to continued funding, but its_ [_construct validity is somewhat dubious_](https://eric.ed.gov/?id=EJ1164354).)

I'd hoped the app would partially liberate teachers from the unhelpful (_but often implicitly required_) "teaching to the test." And as such, I'd accepted that the app's primary vector for learning (_first distinguishing one L2 prompt from three distractors, then matching it to the correct image or L1 definition_), would offer meager [situational authenticity](https://espace.curtin.edu.au/bitstream/handle/20.500.11937/63341/261734.pdf).

What I handn't realized was that -- while the multiple-choice structure is similar across (_many_) CASAS questions and the KEPD exercises -- the _acts_ of discerning and selecting those choices could not be more different.

Consider the somatic actions that compose filling in the circle of a ScanTron with a #2 pencil. Consider the same constituent movements and behaviors for scrolling, swiping, and finally tapping a stylized circle (_one denoting "button"_) on a touchscreen.

The two sequences are wholly alien to each other: moreover, the latter demands a facility with mobile-app UX that many recently-arrived ABE/ESL learners (_quite reasonably!_) lack.

I'd still be curious to deploy the app in a different context, to measure its usefulness as a supplement for those thematically-organized units that underpin most ESL/ABE courses. I'm optimistic that it could help ~[NRS 2-3 literacy](https://nrsweb.org/sites/default/files/NRS-TA-Guide82019.pdf) learners (_who tend to be familiar at that point with e.g. a hamburger-menu icon, or with responding to an unexpected dropdown_) engage in vocabulary practice outside of the classroom.

Primarily, though, my takeaway was to henceforth view the process of building pedagogical software as a process of retroengineering:

- to start with the knowledge-constructing actions that the users should perform, and then
- to determine how the learning experience can elicit those actions, and
- only _then_ to determine how the available technologies can realize those elicitations.

Just as money is a bad master but an excellent servant, so too are even the most powerful tech-tools futile without the -- perpetual -- guidance of those learning objectives.

(_That said, powerful tools are still more fun than their counterparts. Which leads us to..._)

### Just learn React Native already

My second conclusion is to just embrace the "_mobile software for mobile hardware_" pitch, for reasons both selfish and sensible.

Selfishly: in native-mobile app development, cross-device testing is unpleasant but necessary; adding mobile-platform browser considerations on top, however, is an extra layer of pain that I'd prefer never to again encounter.

It appears the `SpeechSynthesis` API is _now_ [largely supported across browsers](https://caniuse.com/#feat=mdn-api_speechsynthesis): but, at the time I was building the KEPD, it wasn't on WebKit (_and thus, by extension, pretty much any browser living on iOS, Safari or not._) And the last thing any (_very, at the time!_) junior developer wants to encounter during a frantic solo-project dash-to-MVP is the need to engage in not merely cross-browser but cross-_device_ testing.

I mistrust the duopoly of walled-garden mobile stores -- especially in contrast to the open(_-ish enough_) standards underpinning web browsers -- enough that a more-tedious developer experience wouldn't sway me alone. More fatal to my plans for future [PWA](https://web.dev/progressive-web-apps/) experimentation was my observation of how students used their phones' web browsers: or, rather, literally never once did.

When "_App Store_" is effectively the user's sole search engine (_let alone app-discovery method_), expecting a workflow of

- "_yeah! Just open this 'browser' app,_
- _click the bar at top,_
- _type this impenetrable string of characters,_
- _navigate to the website,_
- _open this native overlay-widget and scroll a bit,_
- _intuit-then-select the 'save-to-home-screen' option,_
- _exit that 'browser' thing, then_
- _open the newly-present icon for the app you've_ actually _been looking for_"  

is, at best, a polite delusion.

Were there any indication that KEPD would be accessed from, say, in-classroom laptops, the calculation might be different. All feedback, though, indicated that such an app would be most desired and most utilized from within a student's smartphone, at home... and as far as I can tell, that means a native application.

So: if they won't (_or, really,_ can't) come? Don't build it.

(_Note the preceding two arguments don't even mention the_ "native widgets just handle better" _argument._)

## Next steps

I value the process of having built KEPD, inasmuch as I gleaned the above two experiences from it. They'll guide future software development, and really that's the priority: but, for my own satisfaction... _could_ they guide a KEPDv2? An app...

- pitched to students who already have at least L1 literacy, an app
- promising nothing other than basic-vocabulary reading- and listening-practice, and app
- making use of the Apple/Play stores and native OS widgets

Is that still worth building?

I don't even know: and I think that itself provides the answer.

I spent the first three-quarters of 2019 volunteering at a local ABE/ESL school's distance-learning and digital-literacy: and it was _great._ But I wouldn't presume to build a similar app for my students there: I see them once a week, for fewer than two hours. With little tangible idea of what their lives are like outside the classroom, who am I to proffer an app to use in their free time?

For most of 2016, I worked with a broadly similar cohort of ABE/ESL students. There, I had at least _some_ insight into their lives, and plans, and challenges... but those insights began to aggregate only after half a year of working full-time together, 40+ hours a week. And there it extended into the software's development, however imperfectly -- I was able to pass around the app, ask what (_then former_) students liked and didn't, even draft some help in writing the Karen transliterations.

I would love (_love love_ love!) to spend my time building useful tools for ABE/ESL learners, and practitioners: but now that I'm not even one of them anymore, any definition of "_useful_" has to come from somewhere else.

At the least, thanks the process of writing the above? I feel a little better about it.
