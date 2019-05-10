---
title: Service Workers (Simpson, Kyle)
date: "2019-05-10"
template: "post"
draft: true
slug: "/posts/service-workers-notes/"
category: "What I Read"
tags:
  - "JavaScript"
  - "Frontend Masters"
description: "Notes from a live workshop I attended. (Course tagline: \"In this workshop, we'll get comfortable with workers and write our first Service Worker, using it for caching, synchronization, and notification.\")"
---


## Links

* https://serviceworke.rs/

* https://developers.google.com/web/fundamentals/primers/service-workers/

* https://developers.google.com/web/ilt/pwa/introduction-to-service-worker

* https://developers.google.com/web/tools/workbox/

* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

* https://abookapart.com/products/going-offline

* https://adactio.com/journal/15122

@todo: is this site any good? https://developers.google.com/web/fundamentals/codelabs/


## Intro

* In `Links` above, _Going Offline_ is a treasure
* Google's `workbox` 
    * Framework for writing service workers declaratively
    * Sth nice too about the understanding that comes with granularity
    * That said, workbox is great for shipping :)
* Hot take: SW's useful not only for apps -- literally every site should have one (even if displaying static content)
* Learning SW's useful b/c remind us of the 'plumbing' of the web
* Caching useful, but the process by which a browser decides to use or even _look for_ an item in the cache means it's much less reliably called than we expect.
* As such, a couple `expires-` headers not enough

---

## Web Workers

* WebWorker - js file that runs on a separate, background thread (independent of the webpage's thread)
    * Not guaranteed, though: at least one extra thread for WW's, but 
    * Not necessarily 1:1 relationship (otherwise, easy to DDOS)
* WebWorker types:
    * Dedicated worker = tied to a single page/tab
    * Shared worker = connected to multiple tabs
    * Shared is less common; weren't cross-browser for long time (still not present mobile)
    * Service workers different b/c they survive after page is closed/navigated away
* Data sent between threads _are deep copied_ -- even e.g. JSON objects, via "structured clone algorithm"
    * As such, can't send a fn!
    * ...but can send string version of fn, then `eval()` it
    * Be aware of memory costs, then, when sending lots of data back and forth
    * One solution was `transferable`, but now on way to deprecation
    * "Shared array buffers" is v2 of transferables -- shared memory segment between threads (but these provide high-precision timers, which people can use for e.g. Meltdown/Spectre attacks; as such, shut down ASAP)

---

## Service Workers Overview

* Alt name, discarded but more accurate -- 'network worker'
* Every single request that your page makes passes through the worker
* NB: Worker bound by CORS, even if making request on behalf of your page!
    * Only way around it is to make an 'opaque' AJAX call (where worker doesn't even see request)
    * Otherwise, need to set CORS headers on your CDN
    * This often becomes a much larger issue than you think at first pass, b/c you can't redirect an 'opaque' request, so you need to choose between (setting the CORS headers) and (not being able to redirect requests for CDN-hosted materials when site is offline) 
* Bare minimum usage: 
    * Cache API (for storing responses to resource requests, rather than relying on browser's default caching logic)
    * Background Sync API (for deferring actions until the user has stable connectivity)
* SW doesn't have access to geolocation (not accessible at web layer)
* Push and Notifications are actually 2 technologies
    * "Push" is ability for SW to receive data from server;
    * Usually, that data is "hey, send along this Notification!"
    * Notification API results in abused, spammy patterns to get user to grant permission
    * Push API, though, is technical marvel => and you could use it to e.g. update their cache (instead of notifications) 

--- 

## Service Workers 

* `https://serviceworke.rs` => great resource w/ (annotated!) cookbook of workers recipes
* Remember, two 'blanks screen' situations: user has no internet, _or_ your server is broken.
* Careful with the `Bypass for network` checkbox... or, really, any of them... in the `Application > Service Workers` tab in devtools
* `Update on reload` is default, now?
* `Offline` in this tab applies only to SW, not browser (unlike same checkbox in `Network` tab, which covers everything)
* Protocol for SW's: any error on installation? Ignore new SW; keep using old one.
* SW don't have access to LocalStorage, only IndexDB
* SW doesn't have access to cookies; instead, have page monitor, then post message to SW
* If SW is shut down by browser (b/c e.g. your page has been a background tab for a while), 
    * the browser will restart your sw when user returns to page
    * but not go through the various initialization steps
* see sw-exercise/server.js:107 for rerouting, built in order to let SW modify files "beneath" it in filesystem
* You don't _need_ to call `register` after first registration, but it's a good logical check anyway
* You can only have one active SW at a given time
    * When a second has been installed, it enters a 'waiting' phase until there's a navigation event.
    * There's also a `skipWaiting` method that allows the new SW to tell the currently-active one to die off ASAP
* `self.skipWaiting()` lets a new service worker take over right away
    * doesn't automatically make pages aware of new SW, though:
    * that's where the 'controller change' comes up -- as triggered by `clients.claim`
* `evt.waitUntil(handleActivation())` isn't guaranteed, but 
    * it at least tells browser "_don't autokill my worker until..._"
    * `evt.waitUntil()` takes a promise, so we're declaring separate async function elswhere, then calling it in example above
* Be careful about _when_ you install a SW on your project... build it toward the end, or you might encounter all sorts of caching issues throughout the process of development
* Lots of strategies for live requests: 
    * check cache first? if assets present, serve automatically? 
    * serve cache-based assets automatically, but also query server for diff (and if one exists, update cached assets)?
    * never serve cache-based assets on first request, but use afterward? for how long?
* `evt.respondWith` is like `evt.waitUntil`, except it doesn't expect a `Promise` (?)




