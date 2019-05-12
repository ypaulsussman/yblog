---
title: Full Stack for Front-Ends Part 1 (Young, Jem)
date: "2018-02-10"
template: "post"
draft: true
slug: "/posts/full-stack-one-notes/"
category: "What I Read"
tags:
  - "Frontend Masters"
  - "Command Line"
  - "Server"
description: "Notes from a FEM workshop I watched, prior to attending the follow-up workshop. (Tagline: \"Become a Full Stack Engineer and gain the confidence to master the command line and server. You’ll gain practical knowledge of everything from building a web presence, to setting up a virtual server, to publishing on your custom domain -- all from the command line.\")"
---

# Full Stack for Frontend Part 01

## Intro
* IP Address - e.g. 127.0.0.1 (home)
* TCP/IP - protocol for communication
* DNS - maps IP addresses to domains ("the internet phonebook")
* **Ping** is a good way to determine whether:
   * your server is down, or
   * the DNS isn`t resolving.
   * `$ ping <e.g. google.com>`

DNS features several **caches** (one on your computer, and one on your router/LAN, then another on your ISP`s server), to allow for the quickest trip possible.

**DNS cache poisoning** is replacing the mapping on the caches above such that they redirect to another site. (Solved via HTTPS.)

* **Traceroute** will show how we got to a particular site
   * It can tell you where exactly your site is failing.
   * It sends ICMP (internet control message packets) to do this.
   * `$ traceroute <e.g. google.com>`

## Vim
* Used for editing files on most servers.
* Three modes:
   * _insert mode_ (use `esc` to get to command) --> to insert text
   * _command mode_ (use `i` to get to `insert,` or `:` to get to `last-line`) --> for file manipulation
      * `u` to undo
      * `ctrl + r` to redo
      * `dd` to delete a line
      * `<text>` to search
         * `n` to find next instance from top
         * `N` to find next instance from bottom
      * `ctrl + f` to pagedown
      * `ctrl + b` to pageup
      * `:q` to exit
      * `:wq` to save and exit
      * `q!` to exit and discard all changes
   * _last-line_ (use `esc` to get to command)
* see [vimgifs](https://vimgifs.com/) to learn more re: vim commands

## Servers
* SSH login: `$ ssh user@ipaddress`
* SSH is secure socket shell. Two ways to use it for remote-device login:
   * username/password combo
   * ssh key (preferential for servers)
      * Public key on server (filetype .pub); encrypts all messages
      * Private key on your computer (no filetype); decrypts all messages
      * id_rsa is just the default naming system; you can name the pair to be anything
      * `$ ssh-keygen -t rsa` will start the ssh-key generation process
* Server types
   * dedicated server (actual machine that you own)
   * virtual private server (portion of a dedicated server that you rent out)
* `$ cat <file>` displays the file in terminal
* `$ cat <file> | pbcopy` copies the file contents
* `ssh -i <route/to/private_key> root@<serverIP>` = how to log into server (-iis for "identity"; it means "I want to use the following private key")
* In `~/.ssh`, the `known_hosts` file is a cache of places you`ve connected to with a specific (SHA_256?) fingerprint to that specific server.
* `$ top` is the [activity monitor/task manager] equivalent for your server; `$ htop` is a little cleaner, but requires installation. Exit via `q`.
* When you get a new server, first run `$ apt-get update`. Immediately after, run `$ adduser <username>` a new user such that you can avoid ever logging in again as root.
* `$ usermod -aG sudo <username>` will set that user to be a superuser (adding them, via the G group-flag, to the sudo group.)
* `$ su <username>` switches to the named user
* `$ sudo !!` will rerun the previous line, now as a superuser
* `$ exit` leaves the user profile for root, then once more to exit the server.
* `mkdir -p <filepath>` makes the directory only if it doesn`t already exist
* `$ cat ~/.ssh/fsfe.pub | ssh ysuss@165.227.72.170 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"` does the following:
   * pipes the contents of fsfe.pub into the login;
   * logs in, then
   * makes a new directory titled .ssh and
   * pipes the contents of fsfe.pub into a file within .ssh titled authorized_keys
* `sshd` is "SSH Daemon"; it's just a process that's constantly running in the background
* Set `PermitRootLogin` on `/etc/ssh/sshd_config` to `no`, ASAP
* An _A Record_ maps a name to 1+ IP addresses, so long as those records are known and stable.
* A _CNAME_ maps one name to another name.


## Nginx
Nginx is a...
* mail proxy server;
* TCP/UDP proxy server;
* reverse proxy (takes all incoming requests, bundle into one IP source before sending to main server);

Nginx is configurable, and extremely fast.
* Alternative is Apache (which can serve files directly), but it`s more for serving files than as a reverse proxy. (Also tied very closely to PHP.)
* It`s nice because it makes for very scalable port/URL routing (much better than doing so within the server that also is serving files.)
* `$ sudo apt-get install nginx`, then `$ sudo service nginx start`, then hit the IP address directly to check for the nginx welcome; after, `$ sudo apt-get install git nodejs npm` to install the main server
* `$ sudo apt-get remove <foo>` will remove a package
* `less` is a more concise alternative to `cat`
* `$ sudo less /etc/nginx/sites-available/default`
* Port 80 is internet; port 443 is https (browser routes for you.)

**Symlinking**! `$ sudo ln -s /usr/bin/nodejs /usr/bin/node` will point the nodejs binary into the node binary file (so you can type node and get nodejs)
* `$ sudo mkdir -p /var/www` will create the directory from which we serve all our files
* `$ sudo chown -R $USER:$USER /var/www` will (recursively, hence -R) change the ownership of www to whomever the current user is.
* `$ mv foo bar` will rename `foo` to `bar`
* Using `$ sudo vi /etc/nginx/sites-available/default`, and then a proxy_pass inside the location / curlies, you can redirect the port that the node app is listening on (in this case, 3001) to port 80.
* You need to `$ sudo service nginx restart`, or else the changes won`t take effect.


## Gulp and Logs

 [Example Gulp task here.](https://github.com/young/Dev-Ops-for-Frontend/blob/master/gulpfile.js&sa=D&ust=1538938725670000)


* `$ npm config get prefix` will return the path to your npm config file
* `$ sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}` will change owners (recursively) to whoever the current user is (`$(whoami)` is the same as `$USER`)
* Never `$ sudo npm i` anything;
* **Process Managers** keep a process running indefinitely. Examples:
   * Forever (uses JavaScript)
   * PM2
   * Strong Loop Process Manager
* `$ npm i -g forever` will install, then `$ forever start app.js` will run that script in the background, while allowing you use of your terminal
* `$ forever list` will list all running processes
* `$ forever stopall` will kill the node process
* `$ forever start app.js >> /var/log/forever/forever.log` will write all outputs into that log file (assuming you first created and chown`d the /var/log/forever directory)
* `$ sudo tail -f /var/log/auth.log` will return the bottom half of the log file, then follow (and return) everything that happens next
