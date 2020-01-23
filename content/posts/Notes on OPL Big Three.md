---
title: "To Gem Or Not To Gem, Part Deux: Three Whales"
date: "2020-01-21"
template: "post"
draft: false
slug: "/posts/opl-big-three-notes/"
category: "What I Do"
tags:
  - "Rails"
  - "PostgreSQL"
description: "Reflections on how the tool-selection unfolded for three big chunks of a Rails toy app: the auth, frontend, and search."
---

## Overview

Despite the [torrent of navel-gazing](../../posts/opl-resource-notes/) unleashed by working through several conveniences/flourishes for the CRUD app I've been building... Well, [it says it right there in the repo.](https://github.com/ypaulsussman/opl) The main point of the project's been to get more familiar with the Rails Ways® of doing three things -- auth, frontend, and search (_convention over configuration, and all that._)

And I'm happy to say I'm feature-complete! (`git diff feature-pleased`_, which doesn't exist yet and -- given fatigue and distractor-novelty -- likely will not._) 

This was easily the biggest toy app I've built, and I think it reached completion solely because it had a very clear, selfish end: I'd really just wanted to [1] receive a quote from that personal text-cumulus, daily, and [2] be able to easily filter that cumulus by stemmed strings of text. I plan, for the the future, to align (_any learning-projects I embark on_) with a similar reward -- one that's both concrete, and only deliverable via the completed project itself.

In any case: before moving on, I've collected, below, my experiences for each of those three major features. 

(_...two of which ended up being, between us, significantly smaller than the 'ancillary' feature of daily emails._)


## Project the First: Auth(entication, mostly)

Fortunately, [whether](https://stackoverflow.com/questions/27166128/when-to-use-devise-vs-creating-my-own-authentication) [to use](https://stackoverflow.com/questions/57779220/customizing-devise-vs-creating-own-authentication-for-multi-page-registration) [Devise](https://old.reddit.com/r/rails/comments/bw13j4/rails_authentication_from_scratch_vs_devise/) [is a wholly](https://old.reddit.com/r/rails/comments/33wu1z/roll_your_own_authentication_or_devise_michael/) [uncontentious](https://old.reddit.com/r/rails/comments/4jw6ku/do_you_roll_your_own_authentication_or_use_gems/) [topic](https://blog.codeship.com/why-you-shouldnt-roll-your-own-authentication/) -- nothing to worry about, here!

I've lost track of the contexts in which I've been told "_yeah, you should learn how to implement it yourself... but then, afterward, just use a preexisting, battle-tested gem_" -- and it would make sense that the "_to many eyes, all bugs are shallow_" pitch holds even more crucial for authentication. 

Indeed, my most cursory review of Hartl's chapters on authentication return five instances in which the footnotes include an entry to the effect of "_thanks to_ `#{reader_name}` _for pointing out the following security edge-case._"

Buuuut... I've been told equally-often of how Devise exemplifies the criticism often levelled at Rails: that it "_makes 90% of your features trivial, and 10% impossible._" (_I've seen it, too, alas, both on professional and personal projects._) 

So what the hell. I played the odds on security through obscurity, and the Evil Internet not caring (_very reasonably!_) enough to learn about `dry-thicket-30439`, let alone scan it for exploits. I did it: I put on my sunglasses, cracked a Key Lime La Croix, and _I rolled my own application auth_, following the session-based system laid out in the Hartl tutorial.

And it was an absolute learning delight.

I'm honestly not certain that (_the hacking and patching around Devise, in order to get exactly the authentication-workflows that a given app requires_) opens, on average, fewer exploits than (_simply building those workflows from the ground up around e.g._ `has_secure_password` _and_ `authenticate`) -- and yet the velocity and convenience Devise initially offers is undeniable, and there's a certain sad truth to the count of "_people who got fired for buying IBM._"

But, regardless of which I default to in the future, Devise or DIY? It's felt invaluably reassuring to build an authentication system based solely on Rails' out-of-the-box offerings, if for no other reason than to concurrently build a mental model of, you know, what Devise itself is actually doing internally.

## Project the Second: Frontend Assets

I wasn't originally planning to decorate this app's `.erb` templates with lots of JavaScript (_and handclap, handclap... mission complete._) Rather, I'd expected mostly to explore how obnoxious the dual frontend-setups would be to work with: that is, to what degree the `sprockets` "asset pipeline" and `webpacker` would contradict/intersect/overwrite each other.

Happily, they divided their respective filetype-processing responsibilities with no drama that I could find: I `require`'d the component library I'd chosen in `application.js`, and followed with a sprinkling of `import`'ed `.js`; I then let `app/assets/stylesheets/application.scss` pull in my individual `.scss` files. 

Finally, I... then promptly ripped it all up by removing the `.js` that I'd added (_thanks, built-in_ `rails/ujs` _event handlers!_), transferring my individual `.scss` to Webpacker, and removing the `app/assets` dir entirely. And, by and large? It worked!

_Frontend side-note 01: amusingly, what_ did _prove unexpectedly difficult was removing_ `sprockets` _in any meaningful sense: even removing it from the railties-loading in_ `config/application.rb` _couldn't convince Bundler to extricate it from the_ `Gemfile.lock`. 

_Which would be fine, except... [as of sprockets 4](https://github.com/rails/sprockets/issues/643), the associated Rails gem [now requires an](https://github.com/rails/sprockets-rails/issues/444)_ `app/assets/config/manifest.js`_, even if both the_ `config/initializers/assets.rb` _file and every_ `config.assets.*` _setting are removed._ 

_I'm almost certainly overlooking something deeper in the guts of Rails' app-initialization, but... well, setting an unused gem back to_ `~> 3.7` _worked just as well, and in a fraction of the time._

Modulo that digression, however, working with `webpacker` was surprisingly straightforward. I had to some trivial digging outside of the official Rails guides and API documentation to discover the proper [binstub invocation](https://github.com/rails/webpacker/blob/master/docs/webpack-dev-server.md) when developing locally, and  proper [buildpack management](https://github.com/rails/webpacker/blob/master/docs/deployment.md#heroku) when deploying to Heroku -- but really, these feel more like Rails being a community/volunteer-run project. I'm just grateful they were present at all -- if anything, I should do my part to contribute.

_Frontend side-note 02: I came away with fewer reflections than I'd expected, here, but I wanted to also record the hour or two I spent combing through comparison lists of "component libraries, circa late-2019."_ 

_Less had changed and than I might've expected, though I couldn't guess whether that's due to the ongoing domination of bootstrap, a larger move to functional frameworks, or browser-support for CSS features having advanced to the degree that many firms can simply start new projects with BEM notation and mixins._

_I was initially interested in Bulma's CSS-only approach; however, the subdued aesthetics of the USWDS library appealed to me (as did the conceit of it being a software package that I had, after a fashion, in fact already paid for!_

The only other reflection I had while building out the UI is almost tangential to (_that actual asset-processor setup which I'd expected to demand so much energy!_)

Having spent most of my (_old-school Rails-frontend_) professional hours on maintaining/expanding giant, aging jungle-thickets of `.haml` views and partials, it was nice to get the experience of working with server-rendered HTML templates on the ground-floor, at the outset of a new application. 

And, while somewhat sad, it was also reassuring to come away with the same sentiment: I don't really _want_ to work with `.erb` or its cousins again, if I can avoid it. 

It may be that you fall in love with the first person you meet, and I certainly did cut my teeth on SPA-structured, JavaScript-rendered component UI's... but to me the process of (_extracting repeatable, modularizable UI from preexisting views into new partials_) feels unpleasantly implicit, verbose, and difficult to reason about, certainly vis-a-vis (_composing repeateable, modularizable UI from preexisting components into new views._) 

These concerns are, I think, best enumerated at [the GitHub page](https://github.com/github/actionview-component) for `ActionView::Component`, a feature slated for release in Rails 6.1 -- and one which, as you might imagine, I'm pretty excited to explore.

## Project the Third: Keyword Search

Ironically, this was the feature to which I had mentally allocated the most time, assuming that I would become mired in the setup of multiple third-party packages or even entirely separate servers.

[This article](https://dev.to/heroku/postgres-is-underrated-it-handles-more-than-you-think-4ff3) first prompted me to reconsider that approach: after all, the two major advantages to Elasticsearch (_at least as I understand them -- no doubt there are others!_) won't feature in this app. First, I find it unlikely I'll be getting into the at-scale situation of two-digits of concurrent requests querying six-digits of db records (_and even so, the GIN index would at least mitigate this_ somewhat.) 

Second, the sort of search that this app needs will make no use faceting/aggregations: I'm not planning to introduce e.g. "_show me quotations containing the word 'fever,' but only from authors who are French, and only if they -- the author, in sum -- have been viewed by more than 100 individual users._" (Слава богу... 🙏)

That resolved, I began to investigate the `pg_search` gem for management of my assumedly-serpentine Rails-to-PostreSQL FTS queries -- and [it's pretty cool!](https://github.com/Casecommons/pg_search) I'd almost certainly use it for a more full-featured search option in the future: there are [several](https://www.viget.com/articles/implementing-full-text-search-in-rails-with-postgres/) [great](https://thoughtbot.com/blog/optimizing-full-text-search-with-postgres-tsvector-columns-and-triggers) [walkthroughs](https://chodounsky.net/2015/05/06/full-text-search-in-rails-with-pg-search/)
[online,](https://robusttechhouse.com/tutorial-full-text-search-rails-application-pg_search/) and from `multisearch` to `dmetaphone` to `highlight` it's already loaded with cool features. 

In fact, I'd been thinking through how to rearchitect my actual _app_ to take advantage of some of these offerings (_in for a penny, etc._) when, purely by chance, I came across an old stashed link for [what looks more like an afterthought](https://edgeguides.rubyonrails.org/active_record_postgresql.html#full-text-search) than an actual code-block in the official Rails guides. (_To be fair, it's very much flagged under "Work in progress"!_)

Out of pure incredulousness, I had to try it. I set out a perfectly-nukeable demo-branch, set up the migration, and -- after a little bit of adaptation via [PostgreSQL's always-excellent docs](https://www.postgresql.org/docs/current/functions-textsearch.html) (_honest question, because I'd genuinely like to explore any peer: but what technology_ does _compare in breadth, depth, and clarity?_) -- well, search-strings started returning hits.

I'd been little worried about whether the query-planner would know to hit the `gin`-index I'd added on the `passage` column, or whether that would somehow need to be signalled by the ActiveRecord method: but sure enough, `rails c` provided...
```ruby
Quote
  .where(
    "to_tsvector('english', passage) @@ plainto_tsquery('english', ?)", 
    'foobar')
  .to_sql
# => "SELECT \"quotes\".* FROM \"quotes\" WHERE (to_tsvector('english', passage) @@ plainto_tsquery('english', 'foobar'))"
```
...which `psql` then confirms as using:
```sql
EXPLAIN SELECT "quotes".* FROM "quotes" WHERE (to_tsvector('english', passage) @@ plainto_tsquery('english', 'foobar'))
/*
                                            QUERY PLAN                                             
---------------------------------------------------------------------------------------------------
 Bitmap Heap Scan on quotes  (cost=12.04..29.16 rows=5 width=248)
   Recheck Cond: (to_tsvector('english'::regconfig, (passage)::text) @@ '''foobar'''::tsquery)
   ->  Bitmap Index Scan on index_quotes_on_passage  (cost=0.00..12.04 rows=5 width=0)
         Index Cond: (to_tsvector('english'::regconfig, (passage)::text) @@ '''foobar'''::tsquery)
*/
```
...the best of all worlds! Let me never doubt you again, sweet sweet PostgreSQL. 😽🐘

And, really, that was it. One migration, less than half a dozen lines of code, almost no deviation from the official ~~snippet~~ documentation, and... once again, it just worked. 

In a lot of scenarios, I would take that as incentive to dig deeper, to play with different types of stemming and tokenization that PostgreSQL offers, but at this stage in the app? I kind of just wanted to finally take that dopamine hit of completion.

## Takeaways

Part of the reason I undertook this project was to gain familiarity with the above three aspects of web development; part of it was to see how far I could get with a "_you might, in 2019, ~~not~~_ only _need Rails_" ethos. 

And I'm pretty pleased at the results! I did _not_ expect to get all three steps suitable-for-purpose without importing at least a couple nontrivial gems or node packages: I think it's a testament to the Rails team that the core libraries continue to gain functionality, even as their reliability doesn't seem to diminish. 

(_And, heh, yes: I'm not counting the USWDS package because, with an extra month or so, I prrrrrrrobably could ugly-stub most of the styling it provides -- but e.g. Devise or Elasticsearch? Probably not gonna get to building a from-scratch replica in this lifetime..._) 

There's still (_and probably always will be_) plenty of Ruby magic (_or, worse, Rails magic_) that eye-wateringly frustrates me on a weekly basis -- but, on completion of this app? At least my initial impulse is to continue to keep those two closest in the toolkit.