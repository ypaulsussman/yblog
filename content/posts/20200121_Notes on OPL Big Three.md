---
title: "To Gem Or Not To Gem II: Three Whales"
date: "2020-01-21"
template: "post"
draft: false
slug: "/posts/opl-big-three-notes/"
category: "What I Do"
tags:
  - "PostgreSQL"
  - "Rails"
description: "Reflections on how I implemented three big chunks of a toy Rails app: the auth, frontend, and search."
---

## Overview

At the end of 2019, I started a toy app to familiarize myself with the Rails Way® of doing three things: authentication/authorization, full-text search (_albeit without aggregations_), and 'modern' frontend-code management. 

I'm happy to say I'm feature-complete! 

I resisted distraction, I think, largely because the project had an objective that was both constrained _and_ tangibly self-serving: really, I'd just wanted to:
1. receive a daily passage from my personal quotes-aggregate, and 
2. filter that quotes-aggregate, when desired, via lemmatized strings. 

Takeaway #01, then, is to structure my future projects-for-learning to complete in a similar reward: one that's not only discrete, but also mundanely helpful.

To derive more-technical conclusions, I've detailed below how I implemented each of those three features.

## Whale the First: Auth(entication, mostly)

Fortunately, [whether](https://stackoverflow.com/questions/27166128/when-to-use-devise-vs-creating-my-own-authentication) [or not](https://stackoverflow.com/questions/57779220/customizing-devise-vs-creating-own-authentication-for-multi-page-registration) [to use Devise](https://old.reddit.com/r/rails/comments/bw13j4/rails_authentication_from_scratch_vs_devise/) [is a fairly](https://old.reddit.com/r/rails/comments/33wu1z/roll_your_own_authentication_or_devise_michael/) [uncontentious](https://old.reddit.com/r/rails/comments/4jw6ku/do_you_roll_your_own_authentication_or_use_gems/) [topic:](https://blog.codeship.com/why-you-shouldnt-roll-your-own-authentication/) pack it up; nothing to worry about here! 😬

On one hand, I can't list the times senior colleagues have advised me to "_first learn_ how _to implement it yourself: but afterward just use the analogous, preexisting gem._" 

I have to imagine, too, that the "_to many eyes, all bugs are shallow_" axiom is even truer -- and more crucial -- for authentication. (_Indeed, my cursory review of Hartl's chapters on auth returned five footnotes to the effect of_ "thanks to `#{reader_name}` for pointing out the following security edge-case.")

On the other hand, I've heard more than one horror-story of Devise exemplifying the "_makes 90% of things trivial, and 10% impossible_" argument against layers of abstraction. (_I've seen glimpses of it, too, on at least two projects._) 

And how much _can_ you learn by adding a gem and running `bundle install`? If not on a lightweight, low-risk app like this, then... when?

So what the hell. I played the odds on security through obscurity, on Evil Scary Internet not caring enough to learn about `dry-thicket-30439`, let alone scan it for exploits. I put on my sunglasses, cracked a Key Lime La Croix, and _I rolled my own application auth,_ following the `session`/`cookie`-based system laid out in the Hartl tutorial.

And it was a learning delight.

I'm not convinced that, between:
- patching and hacking around Devise in order to get _exactly_ the auth-workflows a given app requires, and
- simply building those workflows from the ground up, via e.g. `has_secure_password` and `authenticate`

...one intrinsically opens fewer exploits the other. The velocity and convenience Devise _initially_ offers is undeniable, though: and there's a certain sad truth to the count of people who got fired for buying IBM. Devise the industry default; _not_ using it tends to be what requires a justification.

But even if I _only_ work on Devise apps in the future? Building an auth-system based solely on Rails' API felt really reassuring: if nothing else, it helped me build a mental model of what Devise itself is doing, under the hood. 

Another datum in support of those colleagues, then! 

## Whale the Second: Frontend Assets

I hadn't planned to sprinkle this app's `.erb` templates with lots of JavaScript (_and handclap, handclap... mission complete._) Rather, I wanted to explore how obnoxious Rails 6's default dual-setups (`sprockets` _for CSS/images,_ `webpacker` _for JS_) would be to work with: previously, I've only used one or the other.

Happily, they divided their respective responsibilities with no conflict:
1. in `app/javascript/packs/application.js`, I `require`'d the component library I'd chosen; below that,
2. I added my sprinkling of `import`'ed `.js` files; then,
3. in `app/assets/stylesheets/application.scss`, I pulled in my unique `.scss` files. 

And finally, I... ripped it all up! Back to single-pipeline goodness:
1. I removed the (_mostly trivial_) `.js` that I'd added, 
2. transferred my individual `.scss` code to Webpacker, and 
3. removed the `app/assets` dir entirely. 

Doing so, I encountered effectively no drama with Webpack. I did have to look outside the official Rails Guides and API docs to discover the proper [binstub invocation](https://github.com/rails/webpacker/blob/master/docs/webpack-dev-server.md) when developing locally, and the proper [buildpack management](https://github.com/rails/webpacker/blob/master/docs/deployment.md#heroku) when deploying to Heroku: but Rails' documentation is a community- and volunteer-run project. If anything, _I_ should do more to contribute. 

Overall, then, both setting up _and_ switching between the two-pipeline/one-pipeline systems was a straightforward, pleasant experience... at the beginning of a project, at least. 😅

### Frontend Sidenote: Naughty Sprockets!
One step that _did_ prove unexpectedly difficult was removing `sprockets`: even manually evicting it from `config/application.rb`'s Railties couldn't convince Bundler to cease requiring it in the `Gemfile.lock`. 

Which would be fine, except... [as of sprockets 4](https://github.com/rails/sprockets/issues/643), the associated Rails gem [now requires an](https://github.com/rails/sprockets-rails/issues/444) `app/assets/config/manifest.js`, even if both the `config/initializers/assets.rb` file and every `config.assets.*` setting are removed.

I'm almost certainly overlooking something deeper in Rails' initialization sequence, but hey: so too are several-dozen other developers, per GitHub; and setting an unused gem back to `~> 3.7` works just as well, in a fraction of the time.

## Whale the Third: Keyword Search

This was the feature I had mentally allocated the most time for: I assumed I'd become mired in third-party packages, or even separate servers. [This article](https://dev.to/heroku/postgres-is-underrated-it-handles-more-than-you-think-4ff3), however, prompted me to reconsider that approach. 

After all, two major advantages to Elasticsearch -- as I (_probably mis-_)understand them! -- won't feature in this app:
1. I will be (_very_) surprised if the app needs to ever handle e.g. two-digits of concurrent requests querying six-digits of PostgreSQL records (_and, even so, the GIN index and low write-frequency would at least mitigate slowness_ somewhat.) 
2. The sort of search that this app needs will make no use of aggregations: I'm not planning to introduce e.g. "_show me quotations containing the word 'fever,' but bucket by century and -- you know what -- only from authors who are French._" (Слава богу... 🙏)

That resolved, I began to investigate the `pg_search` gem for management of my Rails-to-PostreSQL FTS queries: [it's pretty cool!](https://github.com/Casecommons/pg_search) I'd almost certainly use it for a more full-featured search option in the future: there are [several](https://www.viget.com/articles/implementing-full-text-search-in-rails-with-postgres/) [great](https://thoughtbot.com/blog/optimizing-full-text-search-with-postgres-tsvector-columns-and-triggers) [walkthroughs](https://chodounsky.net/2015/05/06/full-text-search-in-rails-with-pg-search/) [online](https://robusttechhouse.com/tutorial-full-text-search-rails-application-pg_search/), and from `multisearch` to `dmetaphone` to `highlight` it's already loaded with cool features. 

I'd been thinking through how to rearchitect my app to better-utilize those features when, by chance, I came across what currently looks very much like the ["Work in Progress"](https://edgeguides.rubyonrails.org/active_record_postgresql.html#full-text-search) it's flagged under in the Rails Guides.

Incredulous, I opened a nukeable branch, set up the migration, and -- after a little bit of adaptation via [PostgreSQL's always-excellent docs](https://www.postgresql.org/docs/current/functions-textsearch.html) -- search strings started returning hits!

I'd worried that the query-planner might not know to hit the `gin`-index I'd added: but sure enough, `rails c` provided...
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
...the best of all worlds! Let me never doubt you again, sweet PostgreSQL. 😽🐘

And, really, that was it: one migration, ~half-a-dozen lines of code, almost no deviation from the official WIP Guide, and... once again, it just worked. (_I did switch out_ `to_tsvector` _for_ `plainto_tsvector` _-- who's got time to sprinkle booleans across their query?!_)

I considered digging deeper -- exploring the different tokenization-dictionaries that PostgreSQL offers -- but if we're honest? At this stage in the app, I was hankering for that dopamine-rush of completion. And, hey, the thing worked!

## Takeaways

At the outset, I said I'd undertaken this project to better-acquaint myself with the above three aspects of web development. Mission accomplished! 🎉

Truth be told, I'd also wanted to probe how far I could get with a "_(in 2019) you might ~~not~~_ **only** _need Rails_" paradigm. I didn't _expect_ to complete all three features without hitting `bundle` or `yarn` a couple times: but I did want to try.

And... well, here we are! It's a testament to the Rails contributor-ecosystem, I think, that (_from e.g._ `authenticate`_, to the_ `webpacker` _gem, to deeper PostgreSQL integration_) the core Rails libraries continue to gain in functionality.

There's still plenty of Ruby magic (_...or, half the time, what's_ actually _ActiveSupport magic_) that eye-wateringly maddens me, weekly. On completion of this app, though, I find myself more wedded than ever to Rails as my default server framework (_vs Express, or some unexplored Elixir/Go hotness._) The full-featuredness is just too compelling. 🤙
