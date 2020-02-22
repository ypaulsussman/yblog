---
title: GoRails Performance and Caching Notes
date: "2019-06-01"
template: "post"
draft: true
slug: "/posts/gorails-performance-notes/"
category: "What I Read"
tags:
  - "Ruby"
  - "Rails"
description: "Notes from GoRails videos."
---

## Episode 1 @ Rails Performance Techniques. Memoization

Many times in Ruby, memoization is a simple as converting methods to save the calculation in  an instance variable; that is:
```ruby
# from this:

def name
 "User #{id}: #{last_name}, #{first_name}"
end

# to this:

def name
  @name ||= "User #{id}: #{last_name}, #{first_name}"
end

# or, if it's lots of code:
def name
  @name ||= begin
              "User #{id}: #{last_name}, #{first_name}"
              # and, obviously, other stuff
            end
end
```
This keys off the nifty ability of instance variables to, if not yet declared, be declared and return `nil` (unlike local variables/methods, which will throw a `NameError`.)

Obviously, be careful to apply this only to methods whose variables you _don't_ intend to change!

Perfect use case: time-consuming queries to separate or third-party API's.


## Episode 2 @ Rails Performance Techniques. GoRails Performance - The Techniques I Use 

Fragment caching is specifically for server-generated HTML. 

You want to ensure that the Rails cache is configured to save into Redis/memecached, so that it's saved in memory (much faster than saving to HD/SSD, as with file cache!)

Russian-doll caching is a variant of fragment caching that saves network calls (especially useful on index views, when instead of making e.g. four calls to caches that each contain HTML for five records, you make one call to a cache that then contains those four subdivisions inside it.)

Assets on CDN or third party storage (e.g. S3) whenever possible!

Turbolinks is tiny, and doesn't try to do much; it just intercepts every link that's clicked, and fires/loads an AJAX request instead.


## Episode 3 @ Rails Performance Techniques. Improving Query Performance with Database Indexes

Faker gem is good for populating insane amounts of data into db, for e.g. perf testing.

Track SQL query times via server logs, or Heroku dash / New Relic to return slowest queries.

If you add too many indexes, your db performance slows (as inserts/updates need to take into account each related index), and you take up (_often quite a bit_) more db space. Don't be _too_ parsimonious, but also don't throw them in unless you're sure you'll need them.

Primary keys are automatically indexed; otherwise, create an index on whichever column(s!) you're most frequently looking up those records: email address, or name, etc.

`unique: true` when creating an index will throw an error if you attempt to insert a record with a duplicate value for that field; it's partner to (and perhaps a bit faster than?) the parallel Rails validation.

When indexing multiple columns, the first column will effectively receive its own index, so if you run
```ruby
def change
  add_index(:users, [:email, :name])
end
```
...you'd still need to run a separate index for the `name` column - but not for `email`!

When indexing, make sure you're benchmarking your queries: don't just run them from the console one or two times, but instead do 1,000 queries before and after the change.


## Episode 2 @ Improve Performance With Caching: Russian Doll Caching with Rails 5 

`rails dev:cache` will toggle caching (with automatic restart), without you needing to change your `development.yml` file.

Russian doll caching adds information to the cache-key about which specific record in a collection you want to use for that particular fragment (as well as the timestamp.)

You'll need to render a partial in order to take advantage of the 'multi-get' that Rails 5 provides, so:
```html
<!-- Rather than:-->

    <% list.todos.each do |todo| %>
      <%= render todo %>
    <% end %>

<!-- You need to do:-->

  <%= render partial: 'todos/todo', collection: list.todos, cached: true %>
```

Man, this is _nifty,_ but... I'm just not sure it's worth knowing the implementation directly. Return to this video when you find yourself in the position of displaying lots of listed data. 


## Episode 03 @ Improve Performance With Caching:  Advanced Caching with User Permissions and Authorization 

You _could_ add the user's ID to the cache key, in order to prevent the server from accidentally displaying the e.g. (the cached version of the view for a read-only user) to (an admin who should also see various edit buttons.)

This, however, will cause your cache to run out of memory pretty fast (_one view for each user!_)

Better is to remove any role-evaluation logic (for user-dependent tags) from the `.erb` file, and instead always display them (for ease of caching), then hide them on load via JavaScript and meta tags.

```html
<!-- Rather than:-->

  <%= link_to 'Edit', edit_list_path if user_signed_in? && current_user.role == 'admin' %>

<!-- Always render:-->

<%= link_to 'Edit', edit_list_path, class: "hidden", data: {role: "admin"} %>

<!-- Then, in application.html.erb, include in the <head> the logic: -->

<%if user_signed_in? %>
  <meta 
    name="current-user" 
    content="<%= current_user.id %>" 
    data-role="<%= current_user.role %>" 
  >
<% end %>
```
Then in a js (or, sigh, CoffeScript) file, remove the "hidden" class accordingly: 

```coffeescript
jQuery ->
  role = $("meta[name='current-user']").data("role")
$("[data-role='#{role}']").removeClass("hidden")
```

(Obviously, you'd need some CSS keyed off the selector to actually set `display: none`, too.)











