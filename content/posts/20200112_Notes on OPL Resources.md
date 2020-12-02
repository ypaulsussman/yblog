---
title: "To Gem Or Not To Gem: Three CRUD Garnishes"
date: "2020-01-12"
template: "post"
draft: false
slug: "/posts/opl-crud-garnishes/"
category: "What I Do"
tags:
  - "PostgreSQL" 
  - "Rails"
description: "I had a small quotes-app I wanted to make in Rails, so I explored DIY'ing some common features (ones for which I might typically just add a package.)"
---

## Overview

I've long found three regions of web development to be complex and intimidating: authorization/authentication, full-text search, and 'modern' JavaScript integration with Rails.

I set out in late Autumn 2019 to acquaint myself with each: I decided to build [an app that would require all three](https://github.com/ypaulsussman/opl), one whose ostensible purpose would be simply to email me a quote every morning. (_I already had a_ [_commonplace book_](https://en.wikipedia.org/wiki/Commonplace_book)_, desultorily compiled over the last two decades, waiting at hand as the content._)

Before I could dive into those three features, though, I found myself grappling with some more-basic tasks.

Years ago, Steve Klabnik outlined the common practice of switching a new project's gems and architecture to match Rails' ["secondary default" stack](https://words.steveklabnik.com/rails-has-two-default-stacks). Every Rails app I've worked on made most-to-all of those changes: in addition, I've typically seen three identical RESTful-resource conveniences across them. (_Spoilers: UUID PK's, counter caches, and readable routes._)

The implementation details, though, have varied. For this app, I decided to test the same strategy for all three: to write the code myself, relying on Rails' built-in tools and eschewing more-featureful gem alternatives.

I'll walk through the selection and coding process for each below.

## Feature the First: UUID Primary Keys

The advantages to using a UUID for your models' primary-keys are listed [pretty comprehensively here](https://pawelurbanek.com/uuid-order-rails); still better, the steps to switch over from integer PK's has become _vastly_ simpler than [its earlier process](https://blog.arkency.com/2014/10/how-to-start-using-uuid-in-activerecord-with-postgresql/).

I followed the [Rails Guides'](https://edgeguides.rubyonrails.org/active_record_postgresql.html#uuid-primary-keys) happy-path, with few exceptions:

- [PostgreSQL's docs](https://www.postgresql.org/docs/11/uuid-ossp.html#id-1.11.7.53.5) suggest `pgcrypto` over `uuid-ossp` for randomly-generated UUIDs, so I used that extension;
- in addition, I made its `enable_extension` a separate migration, for a (_probably misplaced_) sense of atomicity, should it all have ended in disaster weeks down the road.
- Finally, after a couple cases of cutting my fingers on an overlooked `type: :uuid` or `id: :uuid` within a migration file (_resulting in the db assuming the_ `foreign_key` _id to be a_ `bigint`, _then erroring out_), I stumbled across [this nifty solution](http://fidalgo.pt/2017/10/11/uuids_in_rails_with_postgresql.html) of just configuring Rails' `generate` command to add them by default.

And that's been that!

Now, could the above steps be abstracted into a gem? Maybe: but the process is straightfoward enough that [it doesn't look like anyone's bothered](https://rubygems.org/search?utf8=%E2%9C%93&query=postgres+uuid), at least since Rails 4+, and (_having now implemented it even just once_) I'm not sure I'd consider such an affordance worth the downsides of a new dependency.

For UUID PK's in Ruby-on-Rails-on-PostgreSQL, then, the code-first solution seems fine.

## Feature the Second: Counter Caches

I'm more ambivalent about the saga of my second 'resource garnish,' counter-caching on associations.

This quote-a-day delivery app, shockingly enough, turns on two ActiveRecord models: `Author` and `Quote` (_no prizes for guessing where the_ `has_many` _association goes._) I'd wanted one of the sorting-options in `AuthorsController#index` to be by quote-count, so a simple `belongs_to :author, counter_cache: true` made perfect sense.

The complications arose with the second feature I'd wanted to use the `Quote` counter-cache for: a `destroy` callback on `Author` records, triggered whenever their `quotes_count` reached `0`.

On `Quote`-deletion, the callback worked fine; on changing ownership of, say, "_The coldest winter I ever spent was a summer in Duluth_" from "_Mark Twain_" to "_Beats Me,_" though? No amount of callback-wrangling could remove our now-quoteless `Author` from the db on `Quote`-update.

### `def next_paragraphs; <<~ INACCURATE_ASSUMPTION_BLOCK`

As far as I can tell, the `*_counter` class methods on `CounterCache` will [only fire on association-`create` and -`destroy`](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/counter_cache.rb#L161), not but not `update` (_e.g. changing a quote's authorship._) A couple posts discuss how to get around this; several recommend the [`counter_culture` gem](https://github.com/magnusvk/counter_culture).

And why not? Its features read like a list of rad-to-haves: in addition to caching-on-any-value-change, it offers caching on `has_many :through` associations, caching on scopes, and caching running-totals as well as current-counts.

But... I didn't need any of those. If I'd planned to grow the app in perpetuity, as a side-income source or ongoing public experiment, for example, I'd consider bringing in the gem purely for future options: should I _have_ needed one of those other caching features down the road, the reimplementation would have been a hugely unnecessary (_and self-inflicted!_) pain.

For this app, though, I knew it had a fairly circumscribed feature-list, after which `dependabot` would be the only source of change. Once [_auth, search, and Webpack_] were implemented, the app would effectively sit on Heroku for eternity: occasionally it would take in a new quote I ambled across; each morning it would distribute one to my inbox.

(_Also, I was pretty salty about having spent so much time on trying to get on-update cache-incrementing, and wanted to fix it myself._)

### `INACCURATE_ASSUMPTION_BLOCK end`

...Sigh. Now, to the tragic truth: I've included the above "_faulty reasoning HEREDOC_" both because

1. its underlying decision-process _is_ still sound, and
2. hopefully it'll serve to remind me, in the future, to triple-check each step of the logs' request-response cycle before digging into third-party code.

In actuality, updating the `belongs_to` record's association (_i.e. changing a_ `Quote`_'s_ `Author`) absolutely **is** an event that ActiveRecord counter-caches increment and decrement on, at least in the current (`6.0.2.1`) version of Rails.

In the process of coding through my own counter-cache fix (_..."fix"_), I realized that my misuse of `ActiveModel::Dirty`'s `*_was` method had been resulting in a falsey-eval on an `if`-check... which was the _actual_ cause of 'orphaned' `Author` records not deleting when their final `Quote` was moved to another owner.

(_In other words, RTFSQL. Server logs!_)

I resolved this first with a naive [instance variable around the `save`-cycle](https://github.com/ypaulsussman/opl/blob/4c83e52887c122cfc6561a4ea24b277a9607e62e/app/models/quote.rb#L12), then more recently discovered `previous_changes` ([_soon to be_ `*_previously_was`_!_](https://blog.bigbinary.com/2019/12/03/rails-6-1-adds-_previously_was-attribute-methods.html)) and condensed the orphan-`Author` deletion into [a single callback.](https://github.com/ypaulsussman/opl/blob/4fd2165edb88351724ab7393598f7dcd44ad745c/app/models/quote.rb#L30)

Fairly straightforward: but, ultimately, what I'd thought was one of `counter_cache`'s limitations was in fact my _own_ misunderstanding of what value a completely different ActiveRecord method points to, along the different stages of its `Model`-instance's lifecycle.

So my choice not to bring in a third-party library for counter-caching was _probably_ the correct one... but that choice was made from an incorrect premise... but that premise was only later uncovered as incorrect... via that choice not to bring in a third-party library.

Success? 😅

## Feature the Third: Routing By Slug

As much as every one likes e.g. `/parent_resource/e8dba4be-1a4a-4903-8a23-` `3052ee91d4e5/nesty_boi/260f43c7-5047-4452-8bef-088513ebcc8c/edit` festooned across their address bar (_or, worse,_ `cURL` _snippets_), I've found the adoption of readable slugs rapidly follows the adoption of UUID PK's in most codebases.

I've worked professionally on a couple Rails apps that implemented their own logic for CRUD'ing pretty-pathsg, even maintaining full historical-slug ActiveRecord models for link preservation. From my fairly minor interactions, most such slugging-systems seemed to have grown into varyingly brittle, difficult-to-reason-about headaches: but, when the primary alternative bills itself as a ["Swiss Army bulldozer"](https://github.com/norman/friendly_id), you can bet that I'll start with the lighter path.

My initial slug-routing needs were scoped similarly to my counter-caches: not only did I not _immediately_ need many of the features `FriendlyId` provides, but -- given the modest and fixed metrics for reaching feature-complete on this project -- I could somewhat-confidently predict I _never_ would.

Out of the box, Rails offers [fairly streamlined support](https://guides.rubyonrails.org/routing.html#overriding-named-route-parameters) for routing based on an attribute other than `:id`. The repeated `to_param` `Model`-instance methods were a foreboding of the WETness to come, but the actual setup for _using_ vanity slugs -- even transitioning over pre-existing attrs/fields for their use -- was painless.

The problems cropped up in slug _creation_: three models with three identically-named methods, each with by almost-identical lifecycle-callbacks and validations... that feels like a texbook case for extracting common logic to a `module` mixin, maybe shaping a convenient DSL, then passing around some beautiful beautiful blocks for differentiation.

[Hm... if only a gem provided that.](http://norman.github.io/friendly_id/file.Guide.html#Column_or_Method_) 😑

Even still, I'm uncertain of the total time-savings the gem would have provided. A (_...n embarrassingly large_) percentage of my time implementing vanity slugs (_and, on the next model, reimplementing, and..._) was actually spent debugging the edge case of a user [1] attempting to edit their slug, [2] receiving a validation error on uniqueness, [3] attempting to resubmit, and [4] being redirected to the `root` path.

In the end, the issue was a fairly straightforward one (_a dirty_ `params` _value not being reset before_ `render`), and [the fix itself was trivial](https://github.com/ypaulsussman/opl/blob/4fd2165edb88351724ab7393598f7dcd44ad745c/app/controllers/users_controller.rb#L54).

Based on prior experience, though? That detective work would have taken an order of magnitude longer still, had I needed to also contend with third-party-library code (_rather than a couple_ `*Controller#update` _snippets I'd put together a few hours prior._)

## Takeaways

[NIH syndrome](https://en.wikipedia.org/wiki/Not_invented_here) is a pain I've encountered, dozens of times, both at jobs and in the wild. And I'll allow that my typical response has been to

- roll my eyes,
- curse the ego-driven development of senior-dev peers,
- longingly glance through the repos of several established libraries that (_far more smoothly, and usually with better test coverage!_) implement exactly the features we've (_...at least partially_) bubble-gum-and-baling-wire'd together on our own,
- and only _then_ start tracking through the codebase for a solution.

Based on this experiment, though, I think I have a better appreciation of the _good_ intentions from which a hand-rolled scraping, or serializing, or paginating, or -- shudder -- test-running library can metastasize.

In each of the cases above, I'd be a little disappointed in myself if I _had_ reached for the first package a RubyGems search returned. And, at least in the latter two cases, the decision to DIY ended up providing unexpected benefits.

This project is a somewhat extraordinary one, though, in the sense of how tightly its completion-criteria are scoped: if it were intended for literally anyone else, I'd certainly take a longer look at integrating `counter_culture` and `FriendlyId` (_I plan to use both in the future!_)

However -- as I know the client very, very well (_and, indeed, his miserliness and general obstinacy: no point in setting out to please **that** clown_) -- I felt free to dig deeper into implementing some basics myself.

I suppose, then, that's a technology-agnostic benefit to the "_toy-app-for-one_" learning exercise: if you know, precisely and definitively, what release-ready looks like?

Then you can _afford_ to digress, to wander in the code, to explore a little more along the way. 🙂
