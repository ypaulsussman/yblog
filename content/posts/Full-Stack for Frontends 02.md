---
title: Full Stack for Front-Ends Part 2 (Young, Jem)
date: "2018-02-14"
template: "post"
draft: true
slug: "/posts/full-stack-two-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "Command Line"
  - "Server"
description: "Notes from a FEM workshop I attended book. (Tagline: \"Use the full stack to setup and deploy modern and secure web applications with Nginx and Node.js. You'll setup your web server through the command line: setup SSH, firewall, and server security; use advanced shell scripting; configure server updates; and optimize nginx performance using gzip compression and HTTP2.\")"
---

# Full Stack for Frontends Part 02

## Setup
* Domain (text) is just a map to IP address
* Use `traceroute` to determine which layer in the path is down, when your server is working
* Ubuntu 16.04 = version with long-term support (~2+ years)
* `apt` is just a little nicer than `apt-get` (w progress visuals)
* `$ apt update` downloads packages; `$ apt upgrade` installs them
* `$ curl -sL https://deb.nodesource.com/sedup_6.x | -E bash` - to download Node 6 (not Node 4) - pipe the curl while preserving the environment, then run it with bash
* `$ curl` is [how to interact with other external servers](https://explainshell.com/explain?cmd=curl+-sL)
* if node/npm installs into /usr rather than /usr/local, go [here](https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-2-change-npms-default-directory-to-another-directory) to fix it -- or else any package you download will require to be run as `sudo/root`
* Name your servers around what they`re hosting/serving: website? db?

## Server Security
* Control Access: user auth; user permission
* Securing Applications: limit 3rd-party software-usage; keep 3rd-party libraries to date
* A firewall is a way of blocking your ports -- prevents connection via ports (usually only one port open: 22, for SSH`ing)
* `$ nmap -sV <IP ADDY>` will tell you which ports are open on that IP
* Nasty, old-school way of setting up IP rules for ports: `$ sudo iptables -A INPUT -s 192.0.0.1 -p tcp --dport 22 -j ACCEPT`
   * list of rules to follow for any INPUT/OUTPUT
   * append rule `-A`
   * incoming IP `-s`
   * along protocol `-p`
   * on port `--dport`
   * what to do `-j` (DROP [pretend port isn't there, w/ no response], REJECT [actively say "no, you're not allowed" -- better alternative to DROP], ACCEPT, LOG)
* Better alternative: ufw (uncomplicated firewall)
* Even easier: AWS's EC2 UI, or DO's Networking > Firewalls tab
* Automatic updates: `$ sudo apt install unattended-upgrades`
   * `$ sudo vi /etc/apt/apt.conf.d/50unattended-upgrades`, then comment out `${distro_id}:${distro_codename}`; (the first line)
* fail2ban -- install, then run
   * `$ sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local` to copy the general "list of offenders" to your local version (which you can then also add to)
   * you can then modify with `$ sudo vi /etc/fail2ban/jail.local`, but don`t get overzealous (e.g. high ban-time, low max-retry)


## Shell Scripting
* `find` for file names
   * e.g. `$ find /bar -name foo.txt`
   * second = directory in which to search
   * third = flags to pass, e.g.
      * -name (e.g. *.js)
      * -type (e.g. f for file)
      * -empty
      * even by -executable
      * -writable
      * and [many others](https://www.lifewire.com/uses-of-linux-command-find-2201100#billboard3-sticky_1-0)
* `grep` for file contents
   * e.g. `$ grep -i 'foo' /var/www`
   * `zgrep` will search inside gzip`d files
   * second = flags
   * third = string to search for
   * fourth = directory in which to search
* `$ ps` (i.e., process status) command is used to provide information about the currently running processes (executing/running instances of a program.)
* You can pipe ps into grep in order to see all running processes of a certain type -- very useful for finding zombie processes!
* Redirection operators:
   * | to read from stdout
   * 2> to read from stderr
   * \> to write stdout to file
   * \>> to append stdout to file
   * < to read from stdin
      * Not same as "> in opposite direction"!
      * however, `foo < bar > baz` === `cat bar > foo > baz`
* A **shell** is a wrapper around a bunch of processes, which talks to an application that then talks to the kernel.
* **Shell scripts** are powerful b/c they`re: 1) simple, and 2) portable.
   * Unlike a python, ruby, whatever script? You don`t need to open a compiler/interpreter to execute.
   * Shell scripting is for simple, repeatable tasks: it`s not the fastest.
* `#!/bin/sh says` "hey run this file as a shell script"
* `trap` tells you what to do when an interrupt (e.g. a user hitting ctrl+c) occurs: careful with these!
* `awk` and `sed` -- these are very important; study these in greater depth
* `chmod` has lots of flags; you can [find the basics here](https://isabelcastillo.com/linux-chmod-permissions-cheat-sheet)
   * 777 lets anyone do anything
   * 755 lets the owner mod, and everyone else execute it
* After creating node script (slides 86-88), run `$ npm i -g` to be able to run that script (via calling myscript in the terminal) anywhere -- though you'll need to rerun `npm i -g` each time you update the script.

## HTTPS
* To add your domain name to nginx:
   * `$sudo vi /etc/nginx/sites-available/default`
   * `$ server_name <domain name> www<domain name>`
* Nginx = very capable as reverse proxy, but fewer frills than Apache. Does one thing (handles requests) very, very well.
* http://127.0.0.1:3001/ is the localhost, even on your remote server.
* `$ sudo nginx -t` will run a quick test that nginx is working
* Use [certbot](https://certbot.eff.org) for HTTPS
* Set up a cronjob to renew the cert every few weeks (<3 months?)
* `/var/etc/nginx/nginx.conf` applies to all servers running through nginx

## Caching
* Expires headers tells the client "hey, don't even ask for this content; it'll be fresh until X"
* Don't have more processes than processors, or you end up with lock. In general, put nginx on its own server, and let it scale infinitely (per amount of requests); then put web materials on one server, then db on one server, etc.
* Can cache on client side (w/ e.g. expires headers), or server side (caching w/in nginx) --> better for larger files
* nginx can cache particularly long requests for us: in /etc/nginx/nginx/sites-available/default...
   * `proxy_cache_path /tmp/nginx levels=1:2` --> locate the cache inside the tmp/ngix file; and get everything (the top levels)
   * `keys_zone=slowfile_cache:10m inactive=60m` --> 10mb, and invalidate/refresh the cache after 60min
   * `use_temp_path=off;` keep in memory and refresh to the cache; don`t use temp path
   * `proxy_cache_key '$request_uri'` is the default; if you want you can use this to make cache requests more fine-grained
* "Warming the cache" - hitting the nginx cache once, intentionally (e.g. with curl requests), so that all other visitors will get the cached version.

## Websockets
* Alternative: "server push" - using service workers to push data to the client (!)
* Caching, setting headers, websockets, reverse proxy, load balance... you can do all these in node, but it`s way more work. Better to do it in nginx!
* socketIO is a more featureful websocket library than ws

## http/2
* The new standard.
   * http1.1 was OK, but a little old.
   * Google created SPDY; people were skeptical.
   * Everyone agreed on http/2, which took some of the best elements of SPDY
* Easy to implement in nginx
* http/2 is faster: don`t have to minify js anymore (makes requests in parallel, not serial! many smaller files = better)

## Redirects
* 301 is a permanent redirect; 302 is temporary. (301 will be cached by Google, et al.)

## Databases
* SQL queries a little faster than NoSQL (which effectively has to do a map-reduce); however, NoSQL writes (and, w/o parameters, reads) faster.
* Don`t pass raw SQL into your db (sanitize)

## Afterward
* Container vs VPS --> share resources, no extra OS, and fast deployment
* Orchestration of servers: bringing up several of (web, api, log, etc) servers (that each rely on each other) simultaneously. Kubernetes helps do this.
* Ansible / Vagrant / Puppet --> deployment automation tools (bringing up 50 servers at once, adding the proper SSH keys, etc.)
* Maintainability: comment your code (the why and the how.)
* ALWAYS comment your regex.
* Web worker: allows for (sort of) "multithreading" in JS
* Service worker: web worker that is persistent, once installed (web worker disappears when browser is closed); can read/write to cache.
* If you`re using microservices already, then you should probably jump into containers (this allows you to scale more rapidly/broadly.)
* Need better failovers w/ containers (b/c deployment complexity.)
* Monolith vs microservices: latter best if there`s one part of the total service that will be more popular than the rest (and thus will need to scale more frequently.)