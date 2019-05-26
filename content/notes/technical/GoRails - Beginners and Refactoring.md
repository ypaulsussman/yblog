---
title: GoRails Beginner and Refactoring Notes
date: "2019-05-19"
template: "post"
draft: true
slug: "/posts/gorails-rails-beginners-refactoring-notes/"
category: "What I Read"
tags:
  - "Ruby"
  - "Rails"
description: "Notes from GoRails videos."
---

## Episode 1 @ Rails for Beginners. Link To Current Page With Params

Link parameters are especially important for searching, filtering, indexing, etc.

Path helpers work for static params:
```rhtml
<%= link_to "Paid Customers", root_path(paid: true) %>
```
...but not so well for dynamic collections of them.

Instead, you can provide a hash, which Rails will then use to populate the query params:
```rhtml
<%= link_to "Paid Customers", {paid: params[:paid], start_date: params[:start], end_date: params[:end]} %>
```
...but this, too, requires you to statically list all params you might even expect to appear.

In Rails 4+, strong-parameter-enforcement will throw an `ActionController::UnfilteredParameters` error if you attempt to use the `params` hash (as you might within a Controller class):
```rhtml
<%= link_to "Paid Customers", params %>
```

Rack, however provides an accepted list, via `request.params`:
```rhtml
<%= link_to "Paid Customers", request.params %>
```
...which you can then filter/extend with e.g. `request.params.except(:paid)`, or `request.params.merge(paid: true)`


## Episode 2 @ Rails for Beginners. Symbols vs Strings

In Ruby, strings are garbage-collected: as soon as there are no more references to (the place in memory where the string is located), it'll get deleted.

Symbols, by contrast, are very rarely removed from memory: this makes them faster to use (b/c you're not allocating new space in memory each time), but also a potential source of memory leaks.

Because e.g. method definitions or table names never/rarely change, Rails uses symbols all over: that tiny performance boost eventually compounds into noticeable speed gains.

In Ruby, the last set of arguments to any function can be a hash; you don't have to specify the curly braces. That's what's happening with e.g.
```ruby
before_action :find_organization, only: [:show, :edit, :update, :destroy]
# ...which actually is the same as:
before_action :find_organization, { only: [:show, :edit, :update, :destroy] }
# ...which, really, is the same as:
before_action(:find_organization, { only: [:show, :edit, :update, :destroy] })
```


## Episode 1 @ Refactoring Your Code. Refactoring Controller Methods

Inside a controller method, you want to use an instance variable if you plan to send its value back in the response (as JSON or HTML.) Otherwise, you can generally just stick to local variables (or, better, methods whose implicitly-returned you can then call the methods of.)

To safety-proof against a `nil` lookup, replace bracket notation with `fetch`, e.g.
```ruby
MY_CONSTANT_HASH[variable_sent_in_as_key]

# becomes

MY_CONSTANT_HASH.fetch(variable_sent_in_as_key, default_response)

def default_response
  'foobar'
end
```


## Episode 2 @ Refactoring Your Code. Using Ruby Service Objects

It may get convoluted fast, but you _can_ set conditionals on ActiveRecord callbacks with a stabby-lambda:
```ruby
after_create :method_to_run, if: ->{ some_predicate_method }
```

It often makes sense to put your service objects inside a dir in `models/`, as its contents will be automatically loaded... and, logically, service objects often contain methods that otherwise would be on a model class.

Controllers should _only_ contain logic around delegating incoming requests to files on the server (usually models or PORO's.)

Side note: I found the example provided -- of twisting around `save` within the `CreateLead` object, then needing to remember or comment somewhere that there are now two ways to create a record (one via the service object, and one via the model) -- to be more confusing than the conditional-on-the-callback version. Maybe you just need more experience with the Service Object paradigm -- but this particular example of "_use these classes to perform the same CRUD behaviors as the model would do, just without triggering callbacks!_" didn't feel too compelling.

When two models do the same thing, _then_ extract that logic to the `concerns/` dir. Otherwise, create a service object.


## Episode 3 @ Refactoring Your Code. Refactoring with the Null Object Pattern

Inside a model, the e.g. `belongs_to` is really just providing a method:

```ruby
belongs_to :user

# is the same as

def user
 # returns an object w/ instance methods listed on the 'Singular associations' table,
 # listed here: https://api.rubyonrails.org/classes/ActiveRecord/Associations/ClassMethods.html
end

```

It does seem like the Null Object model is partially superseded by the ActiveRecord `.none` [query method.](https://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-none)

Side note: `current_user` (and [many others](https://github.com/plataformatec/devise#controller-filters-and-helpers)) are provided by the Devise gem, not by Rails.

## Episode 4 @ Refactoring Your Code. Refactoring Your jQuery Code with Objects in Coffeescript

...skipped this b/c I don't want/plan to work in jQuery or Coffeescript

## Episode 5 @ Refactoring Your Code. Run Number Refactoring

When writing `if`-statements, always start with the most-likely scenario.

If you're generating data for/from a record that will only ever be used presentationally, put it in a view helper (rather than on the record's Model class.)

