---
title: Revisiting 'Fundamentals of PostgreSQL Administration'
date: "2019-09-28"
template: "post"
draft: false
slug: "/posts/postgres-admin-course/"
category: "What I Read"
tags:
  - "PostgreSQL"
description: 'On rereading my notes from an "Intro to PostgreSQL Admin" course, I began to consider the beauty of declarative knowledge: and how to leverage it in the classroom.'
---

## What Are We Doing Here?

For the last three months, I've been spending nights and weekends on an employer-sponsored online course; as of Tuesday, I'm happy to have completed [EnterpriseDB's certification](https://www.youracclaim.com/badges/db1a7e0c-5b68-4529-a5af-e2f9887fc72d) as a "_PostgreSQL 11... Associate._"

On a farewell-review of my notes, I was surprised by how my sentiments bifurcated.

My flashcards' prompts generally took two sentence formats: "_Describe how_ PostgreSQL _performs process_ `${foo}`," and "_Given constraints `${bar}`, how would_ you _achieve goal_ `${baz}` _within PostgreSQL?_"

Examples of the latter include:

- "_Like output of that query you just ran?_ `\g ${path/to/file.txt}` _to the rescue,_" or
- "_Running_ `CLUSTER`_? Can't hurt to boost_ `maintenance_work_mem` _beforehand, then run_ `ANALYZE` _after,_ " or even
- "_Getting tired of running_ `\x auto` _on every_ `psql` _connect? Drop 'em in a_ `.psqlrc`_!_ "

I've used many of these patterns and commands frequently since acquiring them, but it's not like I've felt any particular _warmth_ to them. No antipathy, but they're just... tools.

Each is certainly convenient, sometimes even empowering. Compared, however, to:

- The write-ahead logs' lifecycle, from buffer to segment to archive, or
- How vacuum workers' table- and row-selections are calculated, or
- The system for parsing, planning/optimizing, and executing queries...

I admit I'm a strange little human, but I don't exaggerate here. Each of those struck me as -- I use this term carefully -- [something sublime.](https://en.wikipedia.org/wiki/A_Philosophical_Enquiry_into_the_Origin_of_Our_Ideas_of_the_Sublime_and_Beautiful)

I've been ruminating on that difference ever since.

## Waterfalls, Pyramids, and Point-in-Time-Recovery

Is [procedural knowledge](https://plato.stanford.edu/entries/knowledge-how/#ProDecKno) greater than declarative knowledge in usefulness, here, but lesser in... aesthetics, or wonder? In truly complex systems, at least, is the "_knowing-how_" less beautiful than the "_knowing-that_"?

Maybe. One possibility is that -- while my PostgreSQL procedural-knowledge learnings were more-immediately helpful at work -- they didn't initiate any conceptual restructuring.

The complementary declarative-knowledge learnings, however, fundamentally reworked my (_heh_) catalog of mental models. They grew the range of _tools I can think with._

I'm reminded of the progressive knowledge-organization models that Frederick Reif depicted in his 1994 Millikan lecture:

![Reif's models of knowledge-organization, 1994 Millikan lecture](/media/reif_millikan_1994.png)

In that model, the humble declarative knowledge that I constructed over this PostgreSQL course appears to be the incipience of stage `(a)` above, and thus too (_if we accept the three as a sequence_) the prerequisite for those latter `(b)`, `(c)` refinements.

My aforementioned -- respect? appreciation? awe? -- toward those complex but ultimately static concepts might well, then, signal an underlying process: an ongoing, otherwise-unrecognized reorganization of knowledge.

(_Whether those rearragements occurs following or during the construction of the new knowledge is a fascinating research question -- but one I leave aside as not immediately salient to the rest of the essay._)

I instinctively contrast the above sequence to how we so commonly introduce the learning-process: for new programming skills, at least, it's most-frequently a transactional, outcome-prioritized format.

Which is often quite fine: for a how-to article, "_Let's learn to accomplish_ `${task}` _in the time it takes to read this Medium post!_" is effective as both tagline and organizing principle. When propelled by extrinsic, specific motivations for learning, that's exactly what I desire.

For a broader course, however -- one that inculcates a range of skills which the learner, post-course, will need to strategically decide when and how to apply -- such an immediate "_study this => be capable of that_" proposition seems ill-fitting, even inaccurate. What could take its place?

## Next Steps

There's plenty of research on intrinsic motivation, in terms of both [its educational value](https://www.apa.org/science/about/psa/2018/06/motivation) and [best practices](https://www.kqed.org/mindshift/53426/four-research-based-strategies-to-ignite-intrinsic-motivation-in-students) for [its elicitation.](https://www.gse.harvard.edu/news/uk/16/09/intrinsically-motivated) Thus far, the study of how to develop intrinsic motivation has largely focused on cultivating learners' sense of self-determination. (_And productively so!_)

I'd be curious to explore the relative efficacy of eliciting learners' curiosity/interest in the subject at hand. Is there a corresponding increase in engagement via introductory (_course-, module-, lesson-level?_) descriptions of the systems to be studied... but with a deliberately holistic perspective?

I'm envisioning a qualitative overview of the soon-to-be-quantitatified content, one with an emphasis on its structural elegance, even grandeur. At least [one organization's already done something similar](https://www.aosabook.org/en/index.html), with what appear to be excellent results: what would a similar approach in a formal classroom?