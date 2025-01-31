---
title: "Notes on a Failed (?) Project"
date: "2020-05-22"
template: "post"
draft: false
slug: "/posts/wwc-data-api-notes/"
category: "What I Do"
tags:
  - "EdTech"
  - "PostgreSQL"
  - "Rails"
description: "I've recently abandoned a toy app I thought was going to be awesome. Here's what I learned from working on it."
---

## What Are We Doing Here?

I'm smitten by the [What Works Clearinghouse:](https://ies.ed.gov/ncee/wwc/WhatWeDo) few things excite me as much as making the fluffy-and-qualitative crunchy-and-quantitative; and few things strike me as more important than determining, empirically, how best our species learns (_...well, and then building how we teach on that._)

Even better, it's a division of the NCEE (_taxpayer-funded!_), and their study-reviews are [freely available](https://ies.ed.gov/ncee/wwc/StudyFindings) (_open data!_) What's not to like?

Well, the site navigation. Between rollovers styled as buttons, nested drawers with `mouseout`-disappearance, and ambiguously-titled pagelinks... it's not my favorite of the IES' various search-and-exploration UI's. (_Love you [ERIC!](https://eric.ed.gov/)_) 😽

Compounding this, it's never explicitly described on the site how a WWC `Review` applies a `Protocol` and a `Standard` to a given academic `Study` (_which may be the subject of multiple combinations of the aforementioned_), from which it's possible that one or more `Findings` may be derived against `Outcome Measures`, or how they may be collated into an `Intervention Report`, which itself will cull and assess the data across multiple `Interventions`. 

(_I think I got that right, but don't hold me to it._)

In short: the WWC puts out a lot of good, good work... but it's harder to non-superficially engage with than I'd like. As such, a couple months ago I decided to build a site to facilitate more granular, in-depth discovery of their research.

## What Could We Do About It?

GitHub records that [my first pass at this project](https://github.com/ypaulsussman/wwc_sql) was pushed on April 19th (_and, IIRC, had been in progress for ~two weeks prior_); [the second, main repo](https://github.com/ypaulsussman/wwc_api) is  about as old. 

That's not a bad time-investment, and I've got no problem with curtailing a project that I steadily sense will offer diminishing returns. I do, though, want to derive _something_ more material out of the process.

Hence the following list: what I learned from the project. None are revelatory; some, retrospectively, are obvious; all, I believe, are worth tagging for future endeavors.

**First:** I learned not to reach for SQL for _everything,_ or at least not unthinkingly.
- RDBS's are amazing when you need a consistent store of data, simultaneously accessible by many people... and most of the time, you need just that.
- In the case of "_write-once-or-rarely, read-often_" data, however, pessimistic locking and write-ahead logs and everything ACID can feel like overkill.
- In that scenario, the data-modeling flexibility that a document-store (_even just_ `JSONB` _columns!_) offers can be a significant benefit.
- This becomes even more pronounced when (_as here: across three CSV's containing, I think, seven schema and nine foreign keys_) the initial data is seriously denormalized. Rough, _ad hoc_ K:V modeling would've saved me literally dozens of hours of data-munging drudgery.
- Ultimately, I think I still would have chosen to use SQL, simply because of the complex-query flexibility that it affords: but this is the first time (_outside of storing logs or other inverted-index work_) that I've really felt its structural trade-offs.

**Second:** somewhat contrarily, I learned that PostgreSQL full-text search is way more powerful than I had thought, and more performant.
- Whether by old-school [matview](https://thoughtbot.com/blog/optimizing-full-text-search-with-postgres-tsvector-columns-and-triggers) or new-hotness [generated column,](https://pganalyze.com/blog/full-text-search-ruby-rails-postgres) you need to index those vectors: but when you do, query-time plummets.
- Another "_seems self-evident, but here we are..._" parallels that: reducing the set of records-to-FTS prior also speeds up searches noticeably.
  - In future search-UI's, I plan to better foreground search filters (_be they toggles, a full sidebar, etc_), relative to the searchbar.
  - In addition, it may even make sense to invert the typical search-filtering system to be additive/inclusive, rather than exclusive (_that is, to start on the server with_ `ActiveRecord::QueryMethods.none`, _then chain_ `where` _clauses to **compose** the set of records to be FTS'd._)
- In terms of decreasing the _perceived_ wait time: I only got partially into an implementation of a dropdown with [trigram autocomplete](https://www.postgresql.org/docs/current/pgtrgm.html#id-1.11.7.40.8) prompts, but even putting together the possibility (_and that of_ `ts_rank`) was eye-opening.
- One unresolved question: I never spent the time to isolate why the controllers' `JSON`-serialization was taking so long. While each would require benchmarking to be sure, two solutions come to mind: 
  - Replacing `ActiveModel::Serialization` with a faster library (there are [options!](https://github.com/Netflix/fast_jsonapi)), or
  - Pushing the serialization logic from Rails into e.g. PostgreSQL's own `row_to_json`, to prevent AR instantiation entirely.

(_**Third:** I learned that PostgreSQL text functions aren't internally considered_ `immutable`, _because of their dependence on locale headers; as such, they_ [_need to be wrapped in a bespoke function_](https://github.com/ypaulsussman/wwc_api/blob/fd316fd53bb481f55a2f99d4848dbf237bc9498c/db/migrate/20200507003934_add_searchable_fields_to_studies.rb#L6) _in order to be used in e.g. index expressions, or generated columns... but I'm really, really hoping I never need to use that knowledge again!_) 🙀

**Fourth:** I learned that, even for one-offs and exploration, it _never_ hurts to use git, and very well may save you later. 
- That first-pass repo above was effectively scrapped because of its irreproducibility: even with notes, I couldn't reliably, repeatedly generate the same data from the same half-reverted, half-overwritten scripts and queries. 
- Commit-hash is security, and security affords exploration.

## Next steps

**Fifth** and finally, I learned to select side-projects which culminate in software that I _personally_ plan to use.
- Wanting to build an interface for frictionless exploration of the WWC data is selfless: it's also not, if we're honest, _actually_ what motivated me to undertake this app.
- More motivating was the desire to find connections within WWC's work to date: really, a temporary curiosity; research questions about 
  - the most effective interventions, 
  - the types of studies that were more- or less-frequently reviewed, 
  - the relationships between different protocols and findings...
- And I still have plenty of those questions! The problem (_"problem"_) is that they can most-efficiently be resolved, post ETL-munging, via individual DB queries: the UI I'd set out to build was largely superfluous, at least for personal use.
- As a consequence, when I _did_ encounter setbacks, working through them began to feel like a chore. And, alas, I have plenty of those to do after working hours already.
