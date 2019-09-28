---
title: Revisiting 'Fundamentals of PostgreSQL Administration'
date: "2019-09-28"
template: "post"
draft: false
slug: "/posts/fpa-course-revisitation/"
category: "What I Read"
tags:
  - "PostgreSQL"
description: "These are my thoughts on rereading my notes from an online \"Intro to PostgreSQL Admin\" course I took in the summer and fall of 2019."
---

Whew, lad. 101 days from June 19th to September 29th - what have I been _doing_?

The calendar confesses that, for the first month at least, I've got no excuse (_save a trip to New York for family and a wedding, followed by some camping along the river._) From July onwards, though, I can at least claim occupation of my weekends by an employer-sponsored online course: and, as of Tuesday, I'm happy to have completed EnterpriseDB's certification as a PostgreSQL 11... "Associate." 

Sure, it's not the most prestigious title in light of the time commitment, and trickiness of the exam: but I'm quite happy with the content covered.

While on a farewell-review of my notes, however, I was surprised by the bifurcation of my _sentiments_ toward that content.

The prompts on my flashcards largely divided into two sentence formats: "_How does_ `${Postgres perform activity 'foo'}`," and "_How would **you**_ `${achieve goal 'bar' within Postgres}`?"

Examples of the latter include: "_like output of that query you just ran?_ `\g ${path/to/file.txt}` _to the rescue,_" or "_Running_ `CLUSTER` _? Can't hurt to boost_ `maintenance_work_mem` _beforehand, then run_ `ANALYZE` _after,_ " or even "_getting tired of running_ `\x auto` _on every_ `psql` _start? Drop that boi in a_ `.psqlrc`_!_ "

I've used many of these skills several times - in some cases several _dozen_ times - since acquiring each, but I can't say I've felt any particular warmth to them. No antipathy, to be sure, but they're just... tools.

Certainly, each is a convenience or an empowerment, and I'm all about both of those. But compared to the former... to those facts and descriptors and _systems..._

Understanding how the shared- and WAL-buffers are read/written/flushed, or how vacuum workers' table- and row-selections are calculated, or how query-planning is optimized and weighted... I admit I'm a deeply strange little human, but at the moment of apprehending each of those? I low-key felt something reminiscent of first seeing Minnehaha, or the Incredible Cross-Sections of a subway terminal, or the Temple of Dendur.

I've been ruminating on this since. Broadly, is the "knowing-how" less beautiful than the "knowing-what"? Is `proceduralKnowledge > declarativeKnowledge` in usefulness, but `declarativeKnowledge > proceduralKnowledge` in... "wonder"?

It's possible that this is all just appreciation for PostgreSQL: it's admittedly a glorious architecture, an appreciably elegant, efficient human construction. But I've felt that before, in other contexts, and I don't notice an echo or similarity. Jet engines are 10,000 pieces of inestimable engineering, and I fundamentally grok that: but I do so without that same sense of sublimity. 

Instead, my hypothesis is that, while the procedural-knowledge learnings are more immediately useful, they don't initiate a conceptual restructuring in the way that declarative-knowledge learnings do. 

(_At least, not in this particular case: for context, prior to this I knew almost nothing about databases. When I read that PostgreSQL has a process that oversees not only its utility child-processes, but also each user-connection process, thereby eschewing threads altogether... my first reaction was "wait what's a process again lol?"_)

I'm thinking about the progressive nature of the knowledge-organization models that Frederick Reif depicted in his 1994 Millikan lecture: 

![Reif's models of knowledge-organization, 1994 Millikan lecture](/media/reif_millikan_1994.png)

In that light -- that is, if we take `${expansion of declarative-knowledge}` as a prerequisite for `${refining of conceptual- or strategic-knowledge}` -- then that (feeling of respect, of almost aesthetic appreciation, toward what are otherwise fairly inert concepts) may be a signpost of some deeper knowledge-restructuring taking place. And, perhaps more importantly, even if it _doesn't_ denote or imply that -- it's still a potentially-useful tool for instructors.   

So what are the applications of this? (_Note that I'm not discussing the possibilities for quantifying or even substantiating the phenomenon: that's, like, research - read, "hard and slow-rewarding" - and see above re: convenience and power, and my enjoyment of them._)

One practice comes to mind: we often introduce the teaching of new programming skills transactionally. (That is, "_here's how to accomplish_ `${task}` _in the time it takes to read this Medium post!_") 

And that's fine for how-to articles: in my experience, these tend to be written for (_and used by!_) learners with very extrinsic (_and very specific!_) motivations for learning.

But for a broader course of study, one that builds a range of smaller component skills (_skills that the learner, post-course, will need to choose, strategically, when and how apply_) -- for those models, I've found it's harder to fit an immediate "_study this, to be capable of that_" proposition.

There's plenty of research on intrinsic motivation by eliciting learners' curiosity/interest in the subject at hand. It seems worthwhile, then, to explore the relative efficacy of engaging that curiosity via introductory (_course-, module-, lesson-level?_) descriptions of the systems to be studied... but with a deliberately holistic intent.  

That is, a qualitative overview of the soon-to-be-quantitatified content, one with an emphasis less on granularity and more on structural elegance, or even grandeur.

...which, yes, despite my best intentions of six paragraphs ago, I now realize I've somehow managed to phrase as a proposal for... a primary study. "_When you're a recovering grad-student, everything looks like a spicy RQ._"
