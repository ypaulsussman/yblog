---
title: "To Gem Or Not To Gem: Notes On A CRUD App"
date: "2020-01-12"
template: "post"
draft: false
slug: "/posts/opl-resource-notes/"
category: "What I Do"
tags:
  - "Rails"
description: "Some bikeshedding on decisions made while building a toy quotes-app in Rails: mostly when to DIY common features for which one could just as easily use a package."
---

## Overview

Several months ago, I summarized [my hand-wringing](../../posts/mentor-finder-notes/) about whether to use [_Devise, Ransack_] or [_hand-rolled auth, full-text search_] by stating that I'd elected to choose "_not the rightest, but the lightest code.... probably not wise: but... catchy?_" and that I was "_curious to see how I look back on these two choices, six months down the road._"

In classic fashion, I haven't actually touched the repo in discussion since... well, almost literally the day I published that post (_the nonprofit realized the need for a robustly-searchable directory wasn't there_) -- so in fact I \*have\* no regrets about those two design decisions! Wonderful luck -- but, as it turns out, (_entirely self-inflicted_) trouble was brewing at my desk all the while.

I'd set out at the end of Autumn 2019 to get more comfortable with several aspects of web development I've found intimidating: authz/authn, granular search, and the marriage of the modern JavaScript toolchain with Rails' historical asset pipeline.

I decided to integrate these three fields into [an app that I'd been planning to build regardless](https://github.com/ypaulsussman/opl), one whose primary purpose would be simply to email me a quote every morning off a list I'd been desultorily compiling since literally the Clinton Administration.

And, naturally, before I could even get stuck into the tricky stuff, I found myself grappling with decisions about how to set up the underlying RESTful resources. Three garnishes to the standard MVC architecture became visibly necessary, and in each case I chose the same solution (_write the code oneself, eschew featureful gems, 'rightest not the lightest' contra above, etc._)

I'll walk through each of those three features below.

## Feature the First: UUID Primary Keys

This feature was the most straightforward to commit to: one [recent post on UUID PK's in Rails](https://pawelurbanek.com/uuid-order-rails) lays out their advantages pretty comprehensively.

That said, I only encountered that article well _after_ my implementation, here; the [first such post that I'd read](https://blog.arkency.com/2014/10/how-to-start-using-uuid-in-activerecord-with-postgresql/) left me more than a little apprehensive. Fortunately, the time-span between those two posts is indicative: between Oct 2014 and Nov 2019, the process of implementing UUID PK's in Rails has _vastly_ simplified.

I began from the [Rails Guides overview](https://edgeguides.rubyonrails.org/active_record_postgresql.html#uuid-primary-keys), with few exceptions: [PostgreSQL's docs](https://www.postgresql.org/docs/11/uuid-ossp.html#id-1.11.7.53.5) suggest using `pgcrypto` over `uuid-ossp` for such tasks, so I used that extension; in addition, I made its `enable_extension` a separate migration, for a (_probably misplaced_) sense of atomicity, should it all have ended in disaster weeks down the road.

Finally, after a couple cases of cutting my fingers on an overlooked `type: :uuid` or `id: :uuid` within a migration file (_resulting in the db assuming the_ `foreign_key` _id to be a_ `bigint`, _then erroring out_), I stumbled across [this nifty solution](http://fidalgo.pt/2017/10/11/uuids_in_rails_with_postgresql.html) of just configuring Rails' `generate` command to add them by default. And that's been that!

Now, could the above steps be abstracted into a gem? Maybe - but the process is straightfoward enough that [it doesn't look like anyone's bothered](https://rubygems.org/search?utf8=%E2%9C%93&query=postgres+uuid), at least since Rails 4+, and (_having now done it even once_) I'm not sure I'd consider the convenience worth the risks that come with the addition of any new library/package.

For UUID PK's in PostgreSQL-on-Ruby-on-Rails, then, the code-first solution seems fine.

## Feature the Second: Counter Caches

I'm more ambivalent about my implementation of the second 'resource garnish,' counter-caching on associations.

This quote-a-day delivery app, shockingly enough, turns on two ActiveRecord models: `Author` and `Quote` (_no prizes for guessing where the_ `has_many` _association goes._) I'd wanted one of the sorting-options in `AuthorsController#index` to be by quote-count, so a simple `belongs_to :author, counter_cache: true` made perfect sense.

The complications arose with the second feature I'd wanted to use the `Quote` counter-cache for: a `destroy` callback on `Author` records whenever their `quotes_count` reached `0`. Deleting a bunch of quotes you never want to see again? No problem... but changing ownership of, say, "_The coldest winter I ever spent was a summer in Duluth_" from "_Mark Twain_" to "_...shrug emoji?_" -- no amount of callback-wrangling could remove our now-quoteless from the db.

Frustrated and planless, I resorted to the final Hail Mary: I read the actual library code.

`next_paragraphs <<~ INACCURATE_ASSUMPTION_BLOCK`

It turns out that, as far as I can tell, the `*_counter` class methods on `CounterCache` will [only fire on `create` and `destroy`.](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/counter_cache.rb#L161) Several SO posts discuss how to best get around this; many settled on using the [`counter_culture` gem](https://github.com/magnusvk/counter_culture) for counter-caching.

And why not? Its features read like a list of rad-to-haves: in addition to caching-on-any-value-change, it offers caching on `has_many :through` associations, caching on scopes, and caching running-totals as well as current-counts.

But... I didn't need any of those. If I'd planned to grow the app in perpetuity, as a side-income source or ongoing public experiment, for example, then I'd seriously consider bringing in the gem and caching via `counter_culture` purely for the potential opportunity cost: should I _have_ needed one of those other caching features down the road, the reimplementation would have been a hugely unnecessary (_and self-inflicted!_) pain.

For this particular application, though, I knew it had a specific feature-ceiling, after which maintenance would be the only source of code-change: once [_auth, search, and Rails-managed frontend assets_] were implemented, the app would effectively sit on Heroku for eternity, occasionally taking in new quotes I amble across, then faithfully distributing one to my inbox daily.

Also, I was pretty salty about having spent so much time on trying to get on-update cache-changes, and wanted to fix it myself.

`INACCURATE_ASSUMPTION_BLOCK`

Now, to the tragic truth: I've included the above "_faulty reasoning HEREDOC_" both because [1] its underlying decision-process _is_ still sound, and [2] hopefully in the future it'll serve to remind me to triple-check each step of the request-response cycle before digging into third-party code. 

In truth, changing the parent association on the `belongs_to` record (i.e. changing a `Quote`'s `Author`) **is** an event that ActiveRecord counter-caches will increment/decrement on, at least in the current (`6.0.2.1`) version of Rails.

In the process of coding through my own counter-cache fix (_..."fix"_), I realized that my misuse of `ActiveModel::Dirty`'s `*_was` method had been resulting in a falsey-eval on an `if`-check... which was the \*actual\* cause of 'orphaned' `Author` records not deleting when their final `Quote` was moved to another owner. (_In other words, RTFSQLY._)

I resolved this first with a naive [instance variable around the `save`-cycle](https://github.com/ypaulsussman/opl/blob/4c83e52887c122cfc6561a4ea24b277a9607e62e/app/models/quote.rb#L12), then more recently discovered `previous_changes` ([_soon to be_ `*_previously_was`_!_](https://blog.bigbinary.com/2019/12/03/rails-6-1-adds-_previously_was-attribute-methods.html)) and condensed the orphan-`Author` deletion into [a single callback.](https://github.com/ypaulsussman/opl/blob/4fd2165edb88351724ab7393598f7dcd44ad745c/app/models/quote.rb#L30) But, ultimately, what I'd thought was one of `counter_cache`'s (_several and real!_) limitations was in fact my own misunderstanding of (_the value that a completely different ActiveRecord method will point to, along different stages in its Model-instance's lifecycle._)

In sum, then: my choice not to bring in a third-party library for counter-caching was _probably_ the correct one; that choice was selected based on an incorrect premise; but that premise was only later uncovered as incorrect... via the decision not to bring in a third-party library.

So, success?

## Feature the Third: Routing By Slug

As much as every one likes `/my_resource/e8dba4be-1a4a-4903-8a23-` `3052ee91d4e5/nested_boi/260f43c7-5047-4452-8bef-088513ebcc8c/edit` paths splattered across their address bar (_or, worse,_ `cURL` _snippets_), the adoption of slugging pretty rapidly follows the adoption of UUID PK's in the land of resourceful-routing.

I've worked professionally on a couple Rails apps that implemented their own logic for CRUD'ing pretty-paths, up to maintaining historical-slug libraries for link preservation. From my fairly minor interactions, most such slugging-systems seemed to have grown into varyingly brittle, difficult-to-reason-about headaches: but, when the primary alternative bills itself as a ["Swiss Army bulldozer"](https://github.com/norman/friendly_id), you can bet that I start out with the lighter path.

My initial pretty-path feature-list was scoped similarly to that of my counter-caches: not only did I not immediately need many of the features the `FriendlyId` provides, but (_given the both constrained and unchanging metrics for reaching code-complete on this project_) I could also say with near certainty that I never would.

Out of the box, Rails offers [fairly streamlined support](https://guides.rubyonrails.org/routing.html#overriding-named-route-parameters) for routing based on an attribute other than `:id`. The repeated `to_param` Model-instance methods were a foreboding of the WETness to come, but the actual setup for _using_ vanity slugs -- even transitioning over pre-existing attrs/fields for their use -- was really quite painless.

The problems cropped up in slug creation: perhaps it's a triviality, but three identically-named methods, across three models, each featuring almost-identical opening and closing lifecycle-checks and record-updating... that feels like a texbook case for extracting common logic to a DSL, then passing around some beautiful beautiful Ruby-blocks for differentiation.

[Now... if only a gem provided that.](http://norman.github.io/friendly_id/file.Guide.html#Column_or_Method_)

Even on this feature, however, I'm uncertain of the total time-savings that implemention through a gem would have provided. I'm quite happy not to provide (_or ever again think about_) the absolute number of hour(_s_), but I will confess that a (_...large_) double-digit percentage of the total time spent implementing vanity slugs went to debugging the edge case of [_a user attempting to edit their slug, receiving a validation error on uniqueness, attempting to resubmit, and being redirected to the_ `root` _path_.]

In the end, the issue was a fairly straightforward one (_a dirty_ `params` _value not being reset before_ `render`), and [the fix itself was trivial](https://github.com/ypaulsussman/opl/blob/4fd2165edb88351724ab7393598f7dcd44ad745c/app/controllers/users_controller.rb#L54) -- but based on prior experience? The actual detective work would have taken an order of magnitude longer had I been digging through third-party library code, rather than a couple of Controller snippets I'd put together only a few hours prior.

## Takeaways

[NIH syndrome](https://en.wikipedia.org/wiki/Not_invented_here) is a very real pain I've encountered, dozens of times, both at jobs and in the wild. And I'll allow that my typical response has been to roll my eyes, curse the ego-driven development of senior-dev peers, longingly glance through the repos of several established libraries that (_far more smoothly, and usually with better test coverage!_) implement exactly the features we've (_...at least partially_) bubble-gum-and-baling-wire'd together on our own... and only _then_ start tracking through our codebase for a solution.

Based on this experiment, though, I think I have a better appreciation of the \*good\* intentions from which (_e.g. a full-blown hand-rolled scraping, or serializing, or paginating, or -- shudder -- test-running library_) can metastasize. In each of the cases above, I'd be a little disappointed in myself if I had reached for the first package a RubyGems search returned. And in at least the latter two cases, the decision to DIY ended up providing unexpected benefits.

This project is a somewhat extraordinary one, in the sense of how tightly its completion criteria are scoped (_its MVP is really... just the P?_) If it were built with the intention of ever needing to please anyone else, I'd certainly take a longer look at integrating `counter_culture` and `FriendlyId` (_both of which I plan to use in the future!_)

But, as I know the client very, very well (_and, indeed, his miserliness and general obstinacy -- no need to set out on the hopeless task of pleasing **him**_), I felt liberated, in the coding of this app, to dig a little deeper into implementing the basics myself. And perhaps that's one of the technology-agnostic benefits of the "_toy-app-for-one_" learning exercise: if you know, precisely and definitively, what the end is? Then you can afford to digress, to explore a bit more, along the way.
