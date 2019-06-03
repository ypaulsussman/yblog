---
title: GoRails Design Pattern Notes
date: "2019-06-02"
template: "post"
draft: true
slug: "/posts/gorails-design-notes/"
category: "What I Read"
tags:
  - "Ruby"
  - "Rails"
description: "Notes from GoRails videos."
---

##  Decorators From Scratch  

Organize (and remove logic from) views, in manner different from helper files.

Helper files are a good first way to extract presentational logic out of your models, but (_because they all exist in the same namespace_) you have to be very precise in the names you give to the methods in `*Helper` modules.

Decorators tend to just be a class that wraps the instance of another class.

You need to pass `view_context` to a `*Decorator` instance so as to provide it e.g. `view _context.link_to`, `view_context.context_for`, etc.

You can use `delegate :method_name, to: :object_name` for a symbol you've added as an `attr_reader`, in order to not have to prefix each of those methods with the name of the object.

The `StringIO` class is basically a decorator wrapping the `String` class, so as to provide it the same methods that the `File` class has (the major difference being that the former exists in memory; the latter, on permanent storage somewhere.)  


## Decorators with the Draper Gem 

