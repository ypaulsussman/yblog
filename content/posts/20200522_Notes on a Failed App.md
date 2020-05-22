---
title: "Notes on a Failed (?) Project"
date: "2020-05-22"
template: "post"
draft: true
slug: "/posts/wwc-data-explorer-notes/"
category: "What I Do"
tags:
  - "EdTech"
  - "PostgreSQL"
  - "Rails"
description: "I've recently abandoned a toy app I thought was going to be awesome. Here's what I learned from working on it."
---

## What Are We Doing Here?

I'm smitten by the [What Works Clearinghouse:](https://ies.ed.gov/ncee/wwc/WhatWeDo) few things excite me as much as making the fluffy-and-qualitative crunchy-and-quantitative; and few things strike me as more important than determining, empirically, the best ways our species learns and educates.

Even better, it's a division of the NCEE (_taxpayer-funded!_), and their study-reviews are [freely available](https://ies.ed.gov/ncee/wwc/StudyFindings) (_open data!_) What's not to like?

Well, the site navigation. Between rollovers styled as buttons, nested drawers with `mouseout`-disappearance, and ambiguously-titled pagelinks... it's not my favorite of the IES' various search-and-exploration UI's. (_Love you [ERIC!](https://eric.ed.gov/)_) 😽

Compounding this, it's never explicitly described on the site how a WWC `Review` applies a `Protocol` and a `Standard` to a given academic `Study` (_which may be the subject of multiple combinations of the aforementioned_), from which it's possible that one or more `Findings` may be derived against `Outcome Measures`, or how they may be collated into an `Intervention Report`, which itself will cull and assess the data across multiple `Interventions`. 

(_I think I got that right, but don't hold me to it._)

In short: the WWC puts out a lot of good, good work... but it's harder to get at in any non-superficial format than I'd like. As such, a couple months ago I decided to build a site to facilitate such discovery.

## What Could We Do About It?

Well, for this post at least, more like "_What Did We Try for A While to Do about It?_" 

GitHub records that [my first pass at the project](https://github.com/ypaulsussman/wwc_sql) was pushed on April 19th (_and, IIRC, had been in progress for ~two weeks prior_); [the second, main repo](https://github.com/ypaulsussman/wwc_api) is just about as old. That's not a bad time-investment, and I've got no problem with curtailing a project that I steadily sense will offer diminishing returns. I do, though, want to derive something more material out of the process.

Hence the following list of what I learned from the project: none revelatory, some retrospectively obvious, but all worth tagging in my mind for future endeavors.

**First:** I learned not to reach for SQL for _everything,_ or at least not without consideration.
- SQL is amazing when you need a consistent store of data being accessed by many people simultaneously... and most of the time, you need just that.
- In the case of a "_write-rarely-or-once, read-often_" data-source, however, pessimistic locking and write-ahead logs and everything ACID can feel like overkill.
- A document-store (_even just_ `JSONB` _columns!_) can make more sense, given its flexibility of modeling.
- This becomes even more the case when (_as here, across three CSV's containing seven schema and nine foreign keys_) the initial data is seriously denormalized. This would've saved me literally dozens of hours of data-munging drudgery: indeed, I might still be at it (_I'd certainly be stopping further ahead!_)

**Second:** somewhat contrarily, I learned that PostgreSQL full-text search is way more powerful than I had thought, and more performant.
- Whether by old-school [matview](https://thoughtbot.com/blog/optimizing-full-text-search-with-postgres-tsvector-columns-and-triggers) or new-hotness [generated column,](https://pganalyze.com/blog/full-text-search-ruby-rails-postgres) you need to index those vectors: when you do, though, query-time plummets.
- Another "_seems self-evident, but here we are..._" parallels that: reducing the count of records-to-FTS, within the request, is also incredibly useful for speed of search. 
  - In future search-UI's, I plan to better foreground the search filters (_be they toggles, a full sidebar, etc_), relative to the searchbar.
  - In addition, it may even make sense to invert the typical search-filtering system to be additive/inclusive, rather than exclusive (_that is, to start on the server with_ `ActiveRecord::QueryMethods.none`, _then chain_ `where` _clauses to **compose** the set of records to be FTS'd._)
- In terms of decreasing the _perceived_ wait time: I only got partially into an implementation of a dropdown with [trigram autocomplete](https://www.postgresql.org/docs/current/pgtrgm.html#id-1.11.7.40.8) prompts, but even putting together the possibility (_and that of_ `ts_rank`) was eye-opening.
- One unresolved question: I never spent the time to isolate why the controllers' `JSON`-serialization was taking so long. While each would need special profiling, two solutions come to mind: 
  - Replacing `ActiveModel::Serialization` with a faster library (there are [options!](https://github.com/Netflix/fast_jsonapi)), or
  - Pushing the serialization logic from Rails into e.g. PostgreSQL's own `row_to_json`, to prevent AR instantiation entirely.

(_**Third:** I learned that PostgreSQL text functions aren't internally considered_ `immutable`, _because of their dependence on locale headers; as such, they_ [_need to be wrapped in a bespoke function_](https://github.com/ypaulsussman/wwc_api/blob/fd316fd53bb481f55a2f99d4848dbf237bc9498c/db/migrate/20200507003934_add_searchable_fields_to_studies.rb#L6) _in order to be used in e.g. index expressions, or generated columns... but I'm really, really hoping I never need to use that knowledge again!_) 🙀

**Fourth:** I learned that, even for one-offs and exploration, it _never_ hurts to use git, and very well may save you later. That first-pass repo above was effectively scrapped because of its irreproducibility: even with notes, I couldn't reliably, repeatedly generate the same data from the same half-reverted, half-overwritten scripts and queries. The commit-hash is security, and security affords exploration.

## Next steps

**Fifth** and finally, I learned to select toy projects that culminate in software I personally plan to use across the future: not ones that satisfy a curiosity in the present.
- Wanting to build an interface for frictionless exploration of the WWC data is selfless: it's also not, if we're honest, _actually_ what motivated me to undertake this app.
- More motivating was the desire to find connections within WWC's work to date: really, research questions about the most effective interventions, the types of studies that were more- or less-frequently reviewed, the relationships between different protocols and findings...
- And I still have plenty of those questions! The problem (_"problem"_) is that they can most-efficiently be resolved, post ETL munging, via individual SQL queries: the UI I'd set out to build was, at least for my personal use, more of a hindrance than an affordance.
- As a consequence, when I _did_ encounter setbacks, working through them began to feel like a chore. And, alas, I have enough of those to do after working hours.
