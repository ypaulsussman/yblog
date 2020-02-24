---
title: "Maybe Build: A Speaking-Prompt Tool for Video-Tutoring Platforms"
date: "2020-02-02"
template: "post"
draft: false
slug: "/posts/video-tutoring-tools/"
category: "What I Think"
tags:
  - "Ed Tech"
  - "Teaching"
  - "Learning"
  - "Language Learning"
description: "Ideas for an ancillary, wraparound feature that could enhance the one-on-one video-tutor language-learning experience. (Shockingly, I don't get paid by the hypen.)"
---

## What Are We Doing Here?

Well, in the case of this article? There's an immediate impetus, a recent impetus, and also a background impetus.

Most topically, I recently finished a (_fairly protracted if somewhat trivial_) [Rails toy app](../../posts/opl-big-three-notes/) [with a couple garnishes](../../posts/opl-resource-notes/); for this weekend, I'd wanted to return to some language- or learning-related topic.

And one such topic might be video tutors for language learning! A few months ago, [my old employer OKpanda was acquired](https://medium.com/@adamgries/okpanda-has-been-acquired-by-alc-press-71ba2d5c0891); ever since, I've been running a background process, contemplating features that I had _wanted_ to build for that platform, but never got around to prior to moving out of Queens and into the forest.

Finally, as an ongoing influence, it so happens I'm not just a (_retired_) dealer: I'm a user as well. Before (_life, work, professional development, paranoia about my own technical obsolescence_) overtook my weekend mornings and other free time, I'd spent a decent amount of both 2018 and 2019 [refreshing and maintaining my Ukrainian-language skills](../../posts/daily-ua-study-revisitation/) -- at least partially through a weekly video-tutor. 

While I liked that experience, the service provided by current video-tutoring platforms is effectively that of a meeting-scheduler -- sometimes with an adjacent forum, or an exhortational monthly blog-post.

What this means for a live lesson is that the content and interaction-patterns throughout (_the precious 30, or 60, or 90 minutes you have together_) is effectively unstructured, and thus [1] conjured up in real-time by whatever pedagogical background the tutor may have, then [2] implicitly negotiated against what the learner (_expects from "a language lesson," or wants to learn, or thinks they want to learn._)

And -- while I often got lucky -- that can easily end in a bit of a mess.

## What Could We Do About It?

It's not clear what good alternatives would be. Static `.pdf`-packs of "suggested lessons" are a teacher's nightmare: as brittle and inaccessible as they are difficult to adapt to an individual student's needs. In-lesson multimedia risk overshadowing the human-interaction element -- that element which, after all, is the platform's unique commercial and pedagogical advantage. 

Some programmatic, interactive structure for implementing flipped-classroom projects (_a system of teacher- and student- facing UI's for content dissemination/assignment?_) might be better, but it presupposes [1] the absence of peer-instruction is not fatal to the flipped model, and [2] the "30/60/90 minute video session" is not a too-limiting constraint on different forms of meaning/knowledge-construction, either (_up Bloom's taxonomy or down Webb's DoK levels, whatever floats your boat._) I'm skeptical on both counts.

Contrasting these options, I suspect a successful video-tutoring suppplement must be both both flexible and unobtrusive: a tool that, rather than specifying-then-dictating the structure of a session, instead primes each participant to engage in certain learning tasks. (_And, equally important, prepare the other participant for what to expect from their teacher/learner partner._) 

Recently, I've been considering a video-tutoring tool evolved from the humble speaking-prompt.

### For the learner: SMS-based speaking-prompts...

I personally have no concerns about blithely jabbering away in broken fragments; fortunately for me, this encompasses not merely English but pretty much any language I've haphazardly consumed a couple snippets of. 

Many (_more-reasonable_) people do not share this disinhibition: eliciting unprepared speech remains one of the most difficult tasks of the foreign-language teacher. (_Indeed, it's perhaps surpassed only by the task of deriving actionable, relevant exercises_ from _a student's impromptu spoken language._)

Depending on the educational contexts they've inhabited prior, many adult English learners will simply shut down if forced into unrehearsed speech. (_This is especially easy when, you know, they're both paying for and allocating free time to language lessons... in that context, the opt-out becomes trivial._)

Simultaneously, though, the opportunity for real-time verbal interaction (_both in dialogue and in tight feedback-loops for monologues_) is one of the key benefits of video-tutoring sessions. So how to resolve this contradiction?

I like the flexibility provided by a written prompt that requests an audio recording. Not only is it well-suited to technologies you already know the learner to have, by virtue of their platform-subscription (_that is: push notifications, with graceful degradation to SMS or even email; and audio-recording hardware of at least telephone quality_) -- but its difficulty also expands/contracts to the comfort level of the user.

The written speaking-prompt format is easily alignable to a both a topic of interest and a level of e.g. the CEFR; moreover (_contra in-session prompts_) it provides the learner the opportunity to experiment with verbal L2-production in an area/time featuring no distraction or chance of interruption (_from e.g. teaching-interlocutor, or timer, or even background events._) 

Perhaps most importantly, the least-comfortable speakers have the options [1] to prepare notes which they can all but read from, if at first they need to; and also [2] to cancel and repeat the recording if they find themselves lost or stymied. And, as their speaking competence and confidence increase, they'll be able to dictate the pace at which they diminish these affordances.

### For the teacher: browser-based speech-evaluation tools...

This is all very well for the "_eliciting unprepared speech_" half of that aforementioned classroom-challenge; what of the "_deriving relevant activities_" part?

Just as the asynchronous nature of the recording allows the learner to modulate their levels of support, the asynchronous nature of the evaluation provides the opportunity for both more-involved, protracted, even cyclical [focus(es) on form.](https://journals.sagepub.com/doi/abs/10.1177/1362168816628627)

Assuming a moderately-trained human proctor is provided [1] the written prompt (_as well as the language standard or any other e.g. thematic or functional frameworks to which the prompt was aligned_), [2] the audio excerpt itself, [3] a structured, searchable document of the student's prior/ongoing (_skills and content to master_), and [4] a (_largely selected-response?_) web-form to guide (_corrective feedback and, if requested, follow-up assignments_), then two features emerge.

First, at-scale meaningful feedback becomes less of an human-dependent concern: accurate, insightful assessments become substantially faster with both [1] readily-provided context about the learner, and [2] scaffolded processes for recording-analysis and linguistic feedback. 

Second, the actual person performing the assessment need no longer necessarily be the teacher, as (_what had been implicitly-remembered or perhaps recorded-in-handwriting_) details of the learner's [_encountered lexis, acquired structures, phonemes of difficulty, preferred topics, etc._] all begin to accrete, lesson on lesson, into this readily-accessible digital document. 

These two features combine for a sort of _kaizen_ learner-portfolio. Each lesson adds just a few linguistic tokens and notes on performance, first elicited and then recorded by the assessment tool itself: but by lesson (_six? Twelve?_) these tokens and notes compound into a substantive, individualized learner-corpus, both highlighted for L2-acquisition-salience and indexed in a time-series. That seems to me a quite powerful tool, both for research and for tailoring future lessons precisely to the learner's needs.

(_To be very clear: this system could_ also _easily devolve into some Taylorist factory-dystopia, as celebrity-teacher video-personas are supported behind the curtain by what are effectively assessment-clerks. My hope is instead it'd allow learners either to feel no pangs of sunk-cost when first searching around for the teacher that best suits them, or to develop a cohort of instructors based on e.g. availability or specialization._)

### ...and a few variations, while we're at it

That learner-portfolio-generating backend, conveniently, could support several different versions of the initial learner-facing elicitation-tool: indeed, one metric you could track is changes in learner performance across different frontends.

I see several points of divergence one could immediately test against. For example, the speaking-prompt could be delivered in text format, or as a voice recording itself. It could arrive unadorned, or with a preceeding, learner-schema-activating text.

The pacing of its delivery could vary, as well: one prompt could be sent on the booking of a new lesson (_with its completion as the explicit "entry ticket" to the session_), or an e.g. monthly platform-subscription could trigger a cronjob to send a new prompt daily (_which the learner could then select from à la carte, and record in order to initiate a new session-booking._) 

The system described above considers each speaking-activity to be a one-off for a given student: evaluated asynchronously prior to the lesson, then discussed and perhaps replicated, or used as a point of departure inside a video lesson -- but never compared against future work. This could easily be altered with two chances to record: the first as described, without external preparation -- but then a second recording, of the same prompt, sent after the video session. 

This (_pre- and post-lesson two-recording model_) could further be adapted to elicit, in that second recording, the usage of incidentally-occurring lexis or structures from the lesson, or particularly-difficult pronunciation identified by the assessment of the initial recording. 

The organization and sequencing of (_extraclass student recordings_) in relation to (_live video-lesson tasks_) increases rapidly in complexity, given the multiple recordings to manage, interact with, build on. The additional student data generated, however, as well as the affective engagement provided by (_such an immediately-tangible progress report in the form of the two recordings' diff_) both make it seem a worthy, if challenging, alternative to explore.

## Next steps

Next steps? Hm... that's a big shrug-emoji from me, dog. :/ As with so many of the VC-backed B2C web-apps of the 2010's, it looks like the initial frantic user-aquisition bloodsport has subsided into a [comfortable](https://sg.news.yahoo.com/shanghai-based-startup-italki-raises-us-3m-help-081909094.html) [duopoly](https://techcrunch.com/2020/01/22/language-platform-busuu-acquires-video-tutor-startup-now-plans-ipo/), or thereabouts, for the language-learning video-tutor space.

What might be feasible (_and certainly more fun than attempting to wrest user-mindspace and market-share from well-entrenched companies_) would be to build such a platform -- a video-tutoring-with-extraclass-prompts application -- specifically for a single L2/target-language. In particular, a small one: a niche language, if you will. 

This app is the sort of system that I would expect to require several tightly-sequenced, thorough iterations, especially for the evaluation- and portfolio-building tools. And to get the protracted usage and repeated engagement necessary to provide (_the information on which such iterations would depend_), you need passionate, involved users. 

And such users tend to be driven by an intrinsic motivation: wanting to learn a given language not because it's required for a certification, or because it's conducive to their employment, but because they just... genuinely like using it.

Time to marshal the [Ukrainian-language aficionados of the world](https://www.reactiongifs.us/wp-content/uploads/2013/08/dozens_of_us_arrested_development.gif), then!