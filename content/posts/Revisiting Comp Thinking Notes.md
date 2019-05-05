---
title: Revisiting Notes on Computational Thinking
date: "2018-12-29"
template: "post"
draft: false
slug: "/posts/comp-thinking-revisitation/"
category: "What I Read"
tags:
  - "Teaching"
  - "Learning"
  - "Computational Thinking"
description: "These are my thoughts on rereading the main points I'd excerpted from several articles on computational thinking some 15 months prior."
---

## What Are We Doing Here?

### Code Kitty

* Back in the summer of 2017, I participated in the [Twin Cities Startup Weekend Education](http://communities.techstars.com/usa/twincities/startup-weekend/10569); 
* I still get a smile every time I dip by the site of [the team I helped with.](http://codekitty.org/) 
* I moved on after a few months:
    * I was more interested in 
        * the original pitch of conducting in-service teacher-training sessions, 
        * rather than the direct-to-K-6 workshops that the team (_reasonably!_) settled on; 
    * simultaneously, my own job started up a more-demanding greenfield project.
* During my time at Code Kitty, one project I undertook was a review of the literature around computational-thinking (_henceforth "CT"_) skills.

### Revisitations

One goal I have for this blog is 
* to prompt cyclical returns to previous work, after 
* an arbitrary time of reflection and personal maturation, which would then
* encourage me to build on previous work I'd done, thereby
* expanding prior avenues of research, contemplation, even tinkering.

To promote these revisitations, I plan for each post to end with a "_so what, now what?_" list of next steps: 
* some prompt or point-of-departure that I could return to, 
    * several weeks or months down the road, 
    * when I have
        * fresh eyes, 
        * greater skills, 
        * perhaps even a freer schedule.
* The first three-dozen or so `Notes` posts, however, lack that challenge to my future self: 
    * these posts, I'd ported over by Markdownifying old gDrive notes. 
    * Some are months or even years old.
    * The creation of "_Next steps_" sections are what I'm aiming for these first "_Revisitation_" posts to produce.

## First Takeaway: Overlapping Taxonomies

My first thought on perusing these articles, again, was of [XKCD’s take on standards;](https://xkcd.com/927/) my second, an uneasy memory of aligning [ACTFL](https://www.actfl.org/publications/guidelines-and-manuals/actfl-performance-descriptors-language-learners) tables to the original [CEFR](https://rm.coe.int/CoERMPublicCommonSearchServices/DisplayDCTMContent?documentId=090000168045bb52) descriptors to [ALTE's](https://www.cambridgeenglish.org/Images/28906-alte-can-do-document.pdf) implementation thereof to [ILR](http://www.govtilr.org/Skills/ILRscale1.htm) lists to...

It seems healthy, at such an initial stage, for `${_frameworks of describing and assessing CT_}` to proliferate; and I am too removed from the field to perceive whether whether they might inform, compete, or even merge with each other.

My worry, though, is that they’ll do none of those, but instead (_like language proficiency metrics!_) maintain largely geographically- and institutionally-decided realms of influence, thereby siloing research and practice.

I found [Google’s initial work](https://docs.google.com/spreadsheets/d/1SE7hGK5CkOlAf6oEnqk0DPr8OOSdyGZmRnROhr0XHys/edit#gid=218360034) done to compare computer science standards across countries to be a heartening guide; less so the facts that

1. no work appears to have been done on the document in the intervening year and a half since I first encountered it, and
1. it's kept in the presentationally-unprofessional Google Sheets (_though I suppose, somewhat amusingly, it **is** their product. Drink your own champagne, and all that._)

On revisitation, though, what strikes me most about that gSheet is the incapacity of a two-dimensional table to organize and display all the information I'd want, even for a subset of the information provided (in this case, any record where the value for the `Strand` field is `Computational Thinking`.)

### Next Steps (Part 01)

The next-step challenge to myself, then — the product to build or idea to research — would be a codebase to visualize how pre-existing CT standards overlap (_or do not._)

(_I’m leaving aside, for now, the fact that such a comparison would actually need to be undertaken, prior. That itself could be a pleasant first step, and — assuming that academic rigor isn’t a goal — a fairly low-key, nondemanding one._)

Could each standard be a `key:value` store 
* mapped to a visual node, which 
    * then themselves would be organized on a three-dimensional graph along with the axes of e.g. 
        * student age, 
        * standards provider, and 
        * generic subskill type? 
    * Or should a different piece of data be mapped to that visible monad?
* When accessed, how would the data in those (_presumably_) JSON blobs be displayed? 
* What data would they be required to contain, and what would be optional: 
    * descriptions of implementation? 
    * Links to third-party lesson plans and classroom artifacts?

## Second Takeaway: Lesson Plans and New Media

Contrasted with those of the other white papers and conference proceedings, my notes on the [teacher- and learner-focused PDFs from ScratchEd](http://scratched.gse.harvard.edu/guide/download.html) were startlingly brief, and effusive. And on review of those workbooks and guides? I'd say it’s still justified.

Reading through those documents is an actual joy: each of the three times I’ve passed through these two documents this week, I come across new design decisions that I’d like to adapt myself, for future projects:

- Including `Debug It!` activities in each unit, wherein students fix preexisting code rather than building _ab initio._ That former skill utilizes different thinking patterns, is equally difficult, and (_in my/anecdotal experience_) occurs far more commonly in both personal and professional coding.

- Visually-organized `Possible Path` sections at the start of each unit in the teacher's guide, for (_frequently overworked and under-pressure_) teachers to easily [approach, understand, and work from or adapt] while constructing their own curriculum. And, parallel to this, the preference to organize information in boxed, titled lists wherever possible.

- Including a list of suggestions under the header `Feeling Stuck?` - not only in the teacher's guide, but also the learner's workbook. (_I note, too, that some units included such suggestions as components under the more generic_ `Things to Try` _heading; I assume those units were found to be less challenging or more open-ended in... whatever the teaching equivalent of a playtest is. Is there no word for that? How is there no word for that?!_)

This list could go on. And even when I encounter a feature I don't terribly like, it prompts a more-careful thinking-through of design choices I'd not considered prior. 

As an example, I find the docs' common use of `${_the square commonly used to denote checkboxes_}` to serve as `${_what could either be an interactive checkbox, or a read-only bulletpoint_}` to be confusing:

![Highlighted checkbox ](/media/ScratchEd_bullet_or_checkbox_v2.png)

To me, this is a common visual cue: "squares with box shadow ask for the text following them to be `${_read, then either affirmed or enacted_}`, then the square itself is checked off in order to confirm the completion of that interaction with the text." 

Here, though, its usage is confounded by:

1. their parallel use of crosses to serve a possibly-identical function (_see above image; throughout the text, I was unable to locate a description of the reasoning behind when one would be used over the other — though this symbol-overlap appears to be rectified [in the V3 previews](http://scratched.gse.harvard.edu/resources/sneak-peek-third-edition-creative-computing-curriculum-guide)_), and
1. the absence of instructions for when, specifically, to check off a box, e.g. `Mix and match blocks in at least three different combinations` instead of `Mix and match blocks in various ways` (_though — if properly signposted to the reader/teacher — this may actually be a feature, as it allows the instructor to tailor each step, ad lib, to the constraints of their classroom/learning context, e.g. choosing whether it would be at least "two different combinations" or "three" depending on how much time remained in the lesson._)

What I would consider most important, though, is that I haven’t felt invited to overthink layout or component design choices within a curriculum in... I don’t know! That was... it was just a delight. 

And yet.

Throughout the reread, I kept returning to this feeling that these instructions and questions, these activities and lesson plans, this entire curriculum was constrained by its medium: that it was constricted by being static sheaves of paper. 

Its users have largely grown up with touchscreen applications from the age of ~18 months: for the learners, at least, an interactive, click-through guide may be an even more comfortable source of those instructions and questions.

On a more personal (_selfish?_) note, I think of my former ABE students -- new Americans, resettled by UNHCR/USRAP, and frequently denied formal educations throughout their lives -- and of their technological affordances (_that is, what devices they actually have lying around at home._) 

My anecdata would imply that such ELL parents/guardians have more experience with mobile apps than pen-and-paper, especially after a year or two in Minnesota. Should they work alongside a child learner of Scratch, my suspicion is they'd value a mobile-first app that presents both the Creative Computing Learner Workbook and Guide (_moreso, at least, than a 154-page PDF._) 

I'm particularly thinking of the (_again, anecdotally-common_) scenario in which a household has 1+ mobile devices, but only one laptop: in this case, the ability for a parent to access [_the instructions, help, and background that the Guide provides_] via mobile would be priceless. (_Anecdata #3: printers are expensive and ever-less-common generally; also, I've never seen one in any of my former students' apartments._)

Following the idea of an "_Guide on mobile; Learner Workbook on laptop,_" one more-distant opportunity arises: the ability for the guide to configure and themselves interact with the given Scratch that a learner is working on. I'm imagining the ability for one of my students to select -- via touchscreen button and constrained list of options -- a sprite, or background, or motion, or other Scratch variable... and then have their decision appear on their child's current Scratch. Completely impracticable, currently: but still hypothetically warms my heart.  

### Next Steps (Part 02)

[Something something hammer, something something nail.](https://en.wikipedia.org/wiki/Law_of_the_instrument) I'm a limited, immature programmer, but the one area I have some decent autonomy/skill in is web apps. (_The solution to all of life's problems._) Caveat aside, I see the next step here as a digital, interactive version of the Creative Computing Learner Workbook and Guide PDF's, one app each for teacher and for learner.

As much as [_superfluous CSS animations, state-management for a largely-presentational interface, and (of course!) user-tracking scripts_] are unalloyed goods, their addition intrinsically justified, I see a few immediate advantages that appification could provide, in particular for the content of the Learner Workbook.  

The first benefit could come from transferring the "Reflections" questions from pages in the workbook to HTML forms. I see this providing: 
1. typing practice for K-12 students;
    * I've read several accounts of diminished keyboard skills among younger learners, though actual data appears thin. 
    * Moreover, given that student use of Scratch mostly involves mouse-manipulation, rather than typing, this wouldn't necessarily result in a skill monofocus or excessive drilling.
1. a more structured, portable, analyzable repository of the students' reflections. 

The first dealbreaker-consideration that comes to mind is that of privacy. However, Scratch already does a good job, I think, of [ensuring limited, teacher-controlled access to student-generated data.](https://scratch.mit.edu/educators/faq#teacher-accounts) Obviously, someone with a law (_..as opposed to, say, linguistics_) degree is better qualified to make a pronouncement, but at least _prima facie_ I didn't see qualitative differences in {_the type of student output currently being saved and connected to an account_} and {_the type of student output elicited by the Reflections forms_}.

Second, the `Start Here`, `Things to Try`, and `Finished?` sections (henceforth bundled as "Instructions") could profit from the multimedia scaffolding that a web app can provide. I envision, as an example, an instance of Instructions that 
* begins (_as they now do, in the workbook_) with unadorned text, then 
* (_at a learner's request, perhaps, or on a timeout, or perhaps either of those, but hidden behind a teacher-selected flag_) 
* is supported by an attention-drawing icon around e.g. where to [_click, keypress, drag, etc_] enter, then finally 
* receives an animation of the actual HCI action to be undertaken, while 
* a voiceover describes each action, and/or descriptive text parallels it.

There is a Reflections-specific parallel, in that e.g. "_envision, aspect, incorporate_" (all student-facing words taken from the workbook) may not be language appropriately-graded to a particular age. I found myself noting, several times, that while an _activity_ seemed accessible to multiple ages in terms of technical complexity, it was the complexity of the English-language _Instructions_ that seemed most forbidding. 

(_As an aside, and extending my perhaps-unreasonable focus on ELL's of all ages_) this is a third, related-yet-subtly-different affordance that a web app could provide: tailoring of the instructions' linguistic complexity to the individual learner (_at the discretion of that student, their instructor, or even - egh - a standardized test._)

There's a final potential offering, across both Instructions and Reflections text, and I'm curious as to its empirical value. (_A moment, here, to reiterate my gratitude, here, for such a well-executed, thought-through set of materials -- the joy I've received from deconstructing and pondering over them surprised even me!_) 

As a learner, at least, I personally would value the ability for the app to display each step of a sequence individually. (_Possibly, though not necessarily, with the above-mentioned affordances._) That is, especially on a smaller screen, I'd find navigation- and task-completion smoother if I were able to consider the next Reflection question, or `Things to Try` instruction, alone on the screen -- moving forward and backward by keystroke or mouseclick. 

The UX question, here, and the research topic I'd find interesting to study, is how the learners interact with these two forms of viewing either list.  How necessary is it to have ability to transition between (seeing only the current instruction) and (seeing the entire list of instructions) in a sequence? And how important to have (_the option to shift between_) as an interactable e.g. toggle, vs having that option implicit (_i.e., seeing the entire list, but being able to focus in on one instruction via one's gaze/attention_)?  

One way to find out: but that's to build the damn thing.


