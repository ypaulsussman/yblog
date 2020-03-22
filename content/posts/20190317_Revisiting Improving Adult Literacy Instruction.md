---
title: Revisiting 'Improving Adult Literacy Instruction'
date: "2019-03-17"
template: "post"
draft: false
slug: "/posts/improving-literacy-instruction/"
category: "What I Read"
tags:
  - "EdTech"
  - "Language Learning"
  - "Learning"
  - "Literacy/ABE"
  - "Teaching"
description: "I read 'Improving Adult Literacy Instruction' eighteen months ago; these are my thoughts on rereading my notes from it."
---

## What Are We Doing Here?

This document is strange to revisit: it’s notes from a [review-of-the-literature white-paper](https://www.nap.edu/catalog/13242/improving-adult-literacy-instruction-options-for-practice-and-research) that I had, apparently, elected to read for... fun? Sometime in the middle of my first salaried programming job?

Whatever my initial reasons -- and I’m not being coy when I say, eighteen months later, they remain wholly obscure to me -- I've since done nothing with the material therein. No application to toy apps, no usage in the classroom... it's sat on a filesystem, completely unused.

As such, my first instinct was just to surreptitiously delete the notes, to skip reviewing them entirely. But... recently I've spent so, so little time engaging with teaching, and language, and learning. I couldn't bring myself to `rm`.

And I’m glad I didn't!

## Revisitation

Holistically speaking, these notes have prompted me to envision literacy development in a context analogous to learning to code:

- they share a similar reliance on several individual subskills (_each integrated, and/or sequenced, to varying degrees_);
- in both cases, there exist several earlier mental models that may interfere with skill acquisition;
- and both deal in several levels of functional proficiency (_rather than a binary, so-unhelpful-as-to-be-meaningless "able to code"/"able to read."_)

I'm not sure to what level of detail it's useful to explore the analogy, or even whether to focus, instead, on areas in which the equivalence breaks down.

Still, I suspect successful practices in one field could be reenvisioned and applied, beneficially, for the other. '_Literacy bootcamp?_' '_Literacy repo?_' '_Literacy IDE's?_' ...well, why not?

More actionably, his report shortly followed [my navel-gazing](../../posts/how-brain-learns/) on the tension between "_perfecting pedagogical efficacy_" and "_buttressing the basic social affordances which make even passably-efficient learning possible_"; it was was refreshingly, bracingly clear about the more-important target.

(_Spoilers: the latter._)

The primary research priority it identified, alas -- "_engage learners for longer periods of time; encourage students to participate and persevere_" -- is the one I see the fewest ways for me to meaningfully impact.

Its other "_directions for future research,_" however, offer more to think about: and, reassuringly for my ego, several appear amenable to experimentation via software tools!

## Next Steps

One such research priority was explore technology's capacity to "_overcome the high cost of intelligent human labor, in this case literacy instructors._" I feel my dozen-odd years in the classroom give me some standing to make the comparison, here, of ABE instructors to smallholder farmers.

(_Bear with me._)

I once heard a product manager describe their role as being the "_master of scarcity,_" of deciding how and what they would prioritize in light of the perpetual insufficiency of resources. Pretty sure that guy never worked as a teacher, ABE or otherwise.

The hours of the day are so meagre, the baseline classroom tasks so exacting, and the cost of failure so high, that... well, there’s just not a ton of incentive to expend extra energy on even reasonably-substantiated innovations. Those demands breed a (_logical, exhausted_) pedagogical conservativism.

For a builder of software for teachers, then, accepting that reality means acknowledging that any such application is _a priori_ unhelpful to its users (_and thus, likely, dead on arrival_) unless it decreases, initially and tangibly, the amount of [_pre- / in- / post-_]class work the teacher needs to do.

Two tools come to mind that meet this requirement.

### Saving Teacher Daylight: Materials-Finder

The first is a way to better surface relevant materials during lesson preparation.

I'm not sure of the better usage-model:

1. via "pull," or a search engine for each institution's library of teaching materials, customizable by (_e.g. proficiency level of students, theme guiding the lesson, standards composing the curriculum and informing later assessments, etc._) or
2. via "push," or a chatbot integrated into the institution's record-keeping system: _"it looks like next Thursday you're teaching a course for the NRS 0-1 Class on Transportation, and need to fill out the following lesson-plan for it. Would you like to see some relevant vocab sheets, and associated exercises?"_

I suspect, though, that user-access isn't the thorniest component. (_The latter tool, after all, effectively includes the former within it; while faceted search is hardly_ easy _to implement, it's certainly doable._)

Rather, I see the greatest technical challenge as building an interface wherein any institution can

1. _ad lib_ input their preexisting materials (_paper textbook ToC's, parent-institution documents, local instructor-made exercises, and so, so much more_), and
2. receive, for each derived atomic unit of course material, a record with accurate metadata.

Automated arbitrary-data parsing and tagging, then? That's not trivial. I love me some PostgreSQL, but it'll take more than a `jsonb` column and some regex to process what most ABE centers have lying around on their shelves.

### Saving Teacher Daylight: Standards-Aligner

The second tool builds on that above "pull" model (_henceforth, affectionately, “lesson-planner Clippy."_)

The amount of time teachers (_usually resentfully_) spend aligning:

1. what they intuit, based on their professional experience, to be the best structure of a lesson, with
1. whatever two-dozen bullets of inaccessible standards were attached by the [_institutional, regional, federal, international, etc_] accrediting body

...is, at this point, essentially a meme. (_At least in my circles?_)

And yet.

Again, solely my circles, but: those standards often _do_ add value during the lesson-design process! If nothing else, they inject a second voice, or perspective: they encourage the lesson-builder to question their default assumptions, those rote course-formulas that creep into even the best teacher's practice over the semesters.

I propose that standards are often damned by their implementation, not their contents. No one wants an unaccountable, disembodied monitor casting a critical eye over the work they've just (_barely, yet painstakingly_) managed to complete on schedule.

What they might like is a dialogue with a peer, even a silicon one: especially _while_ constructing that lesson-plan.

Alongside suggesting relevant materials, the (ugh) “_lesson-planner Clippy_” bot could provide e.g. typeahead input prompts, conditional selected-response tools (_e.g. dropdowns, checkboxes, and radio buttons instead of text-fields_), and (_dismissable!_) warnings. Properly applied, this could both speed up task creation and encourage the teacher to integrate proven pedagogical best-practice. (_Such as, well, those listed in the_ `Principles of Learning for Instructional Design` _section of this very white-paper..._)

Admittedly, this envisions the sequence of lesson-plan creation as something akin to (_very complex_) form-filling, which is simply impractical for the structure and content of some syllabi.

For plenty of courses I've been part of, though, such a tool could fulfill that noblest, most praiseworthy goal: to return at least _some_ professional time back to our ABE instructors.

(_Both the continuing practitioners and those fallen, lapsed professionals who hope to someday return, at least as a volunteer. As soon as they better understand Rails' magic. And Docker. And hooks-based complex state-management in React. And-_)
