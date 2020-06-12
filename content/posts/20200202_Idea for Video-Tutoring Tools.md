---
title: "Maybe Build: A Speaking Tool for Video-Tutoring Platforms"
date: "2020-02-02"
template: "post"
draft: false
slug: "/posts/video-tutoring-tools/"
category: "What I Think"
tags:
  - "EdTech"
  - "Language Learning"
  - "Teaching"
description: "I've been thinking of a wraparound software to enhance how video-tutors teach another language."
---

## What Are We Doing Here?

Recently I learned an earlier employer, OKpanda, [had been acquired](https://medium.com/@adamgries/okpanda-has-been-acquired-by-alc-press-71ba2d5c0891); I've since been contemplating features that I had _wanted_ to build for that platform, but never got around to (_prior to moving out of Queens and into the forest._)

Before [_life, work, bingeable TV, the paranoid race against my own technical obsolescence_] grew, kudzu-like, all over my free time, I'd spent a decent amount of both 2018 and 2019 [refreshing and maintaining](../../posts/daily-ua-study-revisitation/) my Ukrainian-language skills -- at least partially through a weekly video-tutor.

I liked my tutor, and the medium more generally: but current video-tutoring platforms provide little more than a digital meeting-scheduler (_sometimes with an adjacent, oft-unused forum, or an monthly exhortational blog-post._)

What this means for a live lesson is that the content and interaction-patterns throughout the precious 30, or 60, or 90 minutes you have together is effectively unstructured, and thus:

1. conjured up, in real-time, from whatever pedagogical background the tutor may (_or may not!_) have, then
2. implicitly negotiated against what the learner [_expects from "a language lesson," or wants to learn, or even_ thinks _they want to learn._]

And that can easily end in a mess.

## What Could We Do About It?

So we need tools for the tutors: but of what kind? Several formats can be discarded out of hand.

Static `.pdf`-packs of "_suggested lessons_" are a teacher's nightmare: as brittle and inaccessible as they are difficult to adapt to an individual student's needs.

In-lesson multimedia risk eclipsing the lesson's human-interaction: which, after all, is the platform's unique pedagogical (_and, yes, commercial_) advantage.

A programmatic, interactive structure for fully implementing the flipped-classroom model (_perhaps a system of teacher-/student-facing browser dashboards, for content-dissemination and assignment-submission?_) appears better, initially, but it presupposes that:

1. the absence of peer-instruction is not fatal to the flipped model, and
2. the "_30/60/90 minute video session_" is not a too-limiting constraint on different forms of knowledge-construction (_either up Bloom's taxonomy or down Webb's DoK levels, whatever floats your boat._)

I'm skeptical on both counts.

I suspect a successful video-tutoring supplement must be both both flexible and unobtrusive: a tool that, rather than dictating the structure of a session, instead primes each participant to engage in certain learning tasks. (_And, equally, prepares the corresponding participant to expect such tasks or behaviors from their teacher/learner partner._)

Recently, I've been considering a video-tutoring tool evolved from the humble speaking-prompt.

### For the learner: SMS-based speaking-prompts...

I _personally_ have no concerns about jabbering away in half-formed fragments; this encompasses not merely English but pretty much any language I've haphazardly consumed a couple snippets of. (_Hi, Polish! Hi, Elasticsearch queries!_)

Most people don't share this disinhibition, though: eliciting unprepared speech remains among the foreign-language teacher's most difficult tasks. (_Indeed, it's perhaps surpassed only by the difficulty of deriving actionable, relevant exercises_ from _a student's impromptu spoken language._) Depending on their prior educational contexts, many adult English learners simply shut down if forced into unrehearsed speech.

Simultaneously, though, the opportunity for real-time verbal interaction (_via both dialogues and monologues with tight feedback-loops_) makes video-tutoring unique among current distance-learning options. So how to resolve this?

I like the format of a written prompt from the teacher, one that elicits an audio recording from the student.

It's well-suited to technologies you already know the learner to have, by virtue of their subscription to the platform (_that is: push notifications, with graceful degradation to SMS or even email; and audio-recording tools of at least smartphone quality._)

The format easily aligns with both individual learners' interests and the standardized levels of e.g. [the CEFR](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions).

Unlike in-session prompts, it allows the learner to experiment with verbal L2-production in a time-and-space featuring no interruptions or distractions (_from e.g. the teacher/interlocutor, or lesson timer, or network latency._)

Perhaps most importantly, a given task's difficulty can expand/contract to the proficiency level of the learner. Those least-comfortable speakers have the option to:

1. prepare notes which they can all but read from, if at first they need to; and also
2. cancel and repeat the recording, should they find themselves lost or stymied.

And -- as their competence and confidence increase -- _they'll_ be able to dictate the pace at which they diminish these affordances.

### For the teacher: browser-based speech-assessment tools...

That's all very well for the "_eliciting unprepared speech_" task -- what of the "_deriving relevant activities_"?

Just as the record process' asynchronous nature allows the learner to modulate their language-affordances, an asynchronous _evaluation_ process opens avenues for more involved, protracted, even cyclical [focus(es) on form.](https://journals.sagepub.com/doi/abs/10.1177/1362168816628627)

Assuming a moderately-trained human proctor is provided...

1. the written prompt (_as well as the language standard, or other e.g. thematic or functional frameworks to which the prompt was aligned_),
2. the audio excerpt itself,
3. a structured, searchable document of the student's prior/ongoing skills and content to master, and
4. a (_largely selected-response?_) web-form to guide corrective feedback and -- if requested -- follow-up assignments,

...then two features emerge.

First: accurate, insightful assessments can be implemented substantially faster -- thereby making meaningful feedback _at scale_ less forbiddingly difficult.

Second: the actual person _performing_ the assessment need no longer be the teacher. What had been the implicitly-remembered, or perhaps recorded-in-handwriting, details of the learner's [_encountered lexis, acquired structures, phonemes of difficulty, preferred topics, etc._] now accrete, lesson on lesson, into a semi-structured, readily-accessible digital document.

These two features combine for a sort of _kaizen_ learner-portfolio.

Each lesson adds just a few linguistic tokens, and notes on performance: they're elicited (_via the speaking prompt_) and then captured (_via the assessment UI_) by the tutoring platform itself.

By lesson twelve (_or six?_), however, these tokens and notes compound into a substantive, individualized learner-corpus: one both highlighted for L2-acquisition-salience _and_ indexed in a time-series.

That seems to me quite the powerful tool: certainly for precisely tailoring future lessons to the learner's needs, and even perhaps for linguistic research.

(_To be very clear, this system could also easily devolve into some_ [_Taylorist_](https://en.wikipedia.org/wiki/Scientific_management) _school-as-factory dystopia: celebrity-teacher video-personas cultivating swathes of followers/learners, all the while supported behind the curtain by what are effectively assessment-clerks._

_My hope is that, instead, it'd allow learners to either [1] feel no pangs of sunk-cost when first searching around for the teacher that best suits them, or [2] develop a cohort of instructors based on e.g. availability or specialization._)

### ...and a few variations, while we're at it

That teacher-facing assessment-backend, conveniently, is loosely-coupled to the learner-facing recording-frontend: as such, you could straightforwardly track divergences in learner performance against differing frontends.

I see several features to explore, initially.

For example, the speaking-prompt could be delivered in text format, or as a voice recording itself. It could arrive unadorned, or with a preceeding, learner-schema-activating text.

The pacing of its delivery could vary, as well: a prompt could be sent on booking a new lesson (_with its completion, optionally, as the explicit "entry ticket" to the session_); alternatively, a platform-subscription could trigger a cronjob to send a new prompt daily (_which the learner could then select from and -- again, optionally -- record in order to initiate a new session-booking._)

Further, this system takes each speaking-activity as a one-off: they're evaluated asynchronously prior to the lesson, then discussed inside a video lesson -- but never repeated, or compared against future work. This could easily be altered by sending a second opportunity, after the video session, to record the same prompt.

(_That second recording, too, could be adapted to elicit the usage of e.g. incidentally-occurring lexis or structures from the lesson, or particularly-difficult pronunciation identified by the assessment of the initial recording. Or vice-versa._)

In this scenario, the complexity of organizing and sequencing tasks inside each video-session increases rapidly, and in proportion to the count of "_extant_" recordings to distribute, assess, and then interact with during the lesson.

But the additional student data generated -- as well as the affective engagement from such an immediately-tangible progress report (_in the form of the two recordings' diff_) -- make it a worthy, if challenging, alternative system to trial.

## Next steps

Next steps?! 🤷‍♀️

As with so many of the 2010's VC-backed B2C web-apps, it looks like the initial, frantic user-aquisition race has subsided into a [comfortable](https://sg.news.yahoo.com/shanghai-based-startup-italki-raises-us-3m-help-081909094.html) [~duopoly](https://techcrunch.com/2020/01/22/language-platform-busuu-acquires-video-tutor-startup-now-plans-ipo/) for language-learning video-tutor software.

I don't want to deal with that.

What might be feasible (_and certainly more fun than wrestling for mindspace and market-share with entrenched businesses_) would be to just _build_ such a platform, but specifically for learners of a single L2/target-language.

In particular, a small one: a "_niche language,_" if you will.

This app is the sort of system to require several tightly-sequenced, thorough iterations, especially for the evaluation- and portfolio-building tools.

And -- to get the protracted usage and repeated engagement to provide the information on which such iterations depend -- you need passionate, involved users.

Such users, in turn, tend to be driven by an intrinsic motivation: wanting to learn a language not because it's required for school or a promotion, but just because they... genuinely like using it.

Time to marshal the [Ukrainian-language aficionados of the world](https://www.reactiongifs.us/wp-content/uploads/2013/08/dozens_of_us_arrested_development.gif), then!
