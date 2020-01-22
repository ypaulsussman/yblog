---
title: Revisiting Various Ruby Notes
date: "2019-01-31"
template: "post"
draft: false
slug: "/posts/ruby-rails-revisitation/"
category: "What I Read"
tags:
  - "Ruby"
  - "Rails"
description: "Thoughts on my relationship to [Ruby, Rails], and what I could do to deepen it."
---

## Where Are We Coming From?

“_Between the idea / And the reality / Between the motion / And the act / Falls the Shadow_”

I attended a full-stack-JavaScript boot camp for six months; I learned quite a lot. I did not, however, learn any Ruby, or any Rails: both of which I needed for my first job afterward. While I started at that position almost exclusively working on the front end, I tried to get up to speed on our server technologies in the evenings and weekends, first via Codecademy's free course on Ruby.

After about a year, that employer shut down the lab under which I was working; I found myself looking for a new job, and looking to strengthen my ability to talk knowledgeably about Ruby and Rails. To that end, I discovered [a great list of questions on both subjects](https://rubygarage.org/blog/how-to-interview-your-ruby-on-rails-developer), and went to town on digging up the answers.

That was a little over six months ago; in the interim, I’ve spent far more time working in RoR than I had in the previous year and a half. I’m curious, in this post, to revisit those two notes: and to see how tightly their contents has aligned to what I’ve actually found myself doing.

## Rereading Codecademy’s 'Learn Ruby' Notes

An aside: you still fully don't understand the difference between local variables, instance variables, and symbols. No, seriously: this bit you, earlier this week, when passing decorated objects around controllers and Jbuilder templates.

You've never used `String.chomp`, in all your Ruby coding: and yet I doubt you'll ever forget it. Too darn cute. (Unexpectedly, though, you _had_ forgotten `collect` and `inject`, and always use the original methods they alias, even though they rhyme nicely together as “_collect, inject, select_”...)

You’d forgot that, when running `.each` on a hash, you pass two params to the block: one for the key and one for the value! (Looks like you’d also forgot that the `.each_key` and `.each_value` hash methods exist, too...)

Wow, you hadn’t thought of using your own `Proc` in... months. It’s stupefying how much power it has... and, concomitantly, how much you've then been able to achieve without it. Hm.

Remember, `include` is for adding module methods at the instance level; `extend` at the class level.

## Rereading Ruby Garage’s Questions

My intuition that there’s virtually no correlation between `${how basic/introductory a Ruby or Rails concept is}` and `${how frequently I find myself using it at work}` is confirmed, here. I don't think I've ever actually addded or modified an `attr_` getter/setter (_perhaps because I've almost exclusively been adding/modifying features to established, preexisting classes?_)

In contrast, I've spent a decent amount of time working with custom ActiveRecord `transaction` and `validate` methods, not to mention all the lovely permutations of `scope` and `member` and `collection` in `routes.rb`. (_It's worth noting that "no correlation" here specifically includes "also not a negative correlation," e.g. Singletons and Eigenclasses are cool to know about: but at work I've never encountered them, let alone thought of their use._)

There are two aspects of Rails that I started reading about via this article, and have found to be both [1] clearly valuable in our repo and [2] outside my normal scope for work on that code. ActiveJob is used everywhere in the codebase, for an exciting number of purposes beyond the "_it's good for sending emails_" pitch I first encountered. As for caching: while I see `Rails.cache.fetch` throughout our code, I have no idea whether we're on `memcached` or `redis`, and whether we're caching query results, or view fragments, or both.

## Such A Long, Long Time To Be Gone, And A Short Time To Be There

As I went through the above two documents, I found myself reflecting, for a protracted time, on a single question. (_Disconcerting: the answer changed, over that time._)

In the last 18 months, what is the ratio of time I’ve spent referencing (_that is, accessing in order to locate a pre-formed question, not reading sequentially for general edification_) the [core API docs](https://ruby-doc.org/core-2.6/), the [Rails API docs](https://api.rubyonrails.org/), and the [Rails guides](https://guides.rubyonrails.org/)?

Almost immediately I knew it wasn’t the first; however, my initial instinct was that I’d spent the most time looking up information in the official Rails documentation. That is, after all, its intended purpose: the third is a series of broadly-instructional overviews, sometimes almost narrative.

And yet, counting up the actual cases of seeking out a specific detail or solution? Overwhelmingly, I'd found my answers within the Rails guides. Curious.

That sent me to a 45-min (_and, admittedly, wholly unscientific_) perusal of the contents of the two Rails subdomains, and to a somewhat humbling conclusion: I'm using the Rails guides because, well, I'm really not _that_ familiar with the full suite of Rails functionality.

Not yet.

## Next Steps

Clearly, the next step is to dig deeper into the guides, to run some project that makes their knowledge my own.

My first thought was to build an API server making use of as many 'advanced' Rails features listed as possible, but the thought of twisting some poor, innocent application's rationale to fit in as many [Active Record Callbacks, Action Controller file/streaming options, whatever] feels wasteful.

But reporting back what you read _about_ Rails' offerings is, both in pedagogical theory and in personal experience, of very limited value. (_Task authenticity aside, it's also not a terribly engaging task for a lazy Sunday morning._)

My squaring of the circle, then, would be to tell a story. There's [decent empirical evidence](https://www.aft.org/periodical/american-educator/summer-2004/ask-cognitive-scientist) for their helpfulness in retaining information; moreover, constructing narratives is fun(_ner than annotating a bunch of other blogs' thoughts on, say, header injection._) I'm envisioning a narrative akin to this ['Anatomy of a DynamicRequest'](https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview#Anatomy_of_a_dynamic_request) from MDN, but with several nuances:

1. The story should describe an actual (_albeit fictional_) application;
2. The story should maintain a similar level of detail to the 'Anatomy' above, but describe far more steps in a full user workflow (_i.e. from login to logout_);
3. If possible, it should be heavily supplemented by diagrams. (_CSS/SVG animations would be nicer, but let's focus on the doable for these little future-self challenges._)

And then, once you've written story, you can reference it, almost as pseudocode, on the next Rails server you build.
