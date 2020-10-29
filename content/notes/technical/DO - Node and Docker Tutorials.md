# Digital Ocean Docker/NodeJS Tutorials

## [How to Connect to your Droplet with OpenSSH](https://www.digitalocean.com/docs/droplets/how-to/connect-with-ssh/openssh/)
- Your SSH key is at `s`; see also `The key fingerprint is: SHA256:LIhpk2MpDFZSn5fth9HhVwOoATs2Vw1eNABvzueBSk8 ysussman@ysussbox`

- Droplets are managed using a terminal and SSH. To log in, you need:
  - The Droplet's IP address -- `167.172.145.68`
  - The default username on the server -- default is `root` on most OS'
  - An SSH key pair

- If using only a single SSH key pair on your machine, you can just provide the user and host, e.g. `ssh root@167.172.145.68`

- The very first time you log in, the server isn't identified on your local machine, so you'll be asked if you're sure you want to continue connecting.

- To leave, either `exit` then `ENTER`, or `CTRL`+`d`

## [Initial Server Setup with Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04)
- Log in as `root`
- New User
  - Add a new user account: `adduser my_new_user` 
    - (_ps ysuss/boofar_)
  - Add superuser/`root` privileges: `usermod -aG sudo my_new_user` (`-aG` = "add group")
  - Ensure login ability
    - Add a copy of your local public key to the new user’s `~/.ssh/authorized_keys` file 
    - Do so by copying the public key that's already  on the server, in the `root` account’s `~/.ssh/authorized_keys` file
    - Use `rsync` to copy the root user’s directory, preserve the permissions, and modify the file owners: `rsync -a --chown=my_new_user:my_new_user ~/.ssh /home/my_new_user`

- Turn on firewall
  - Check for firewall services: `ufw app list` (`ufw` - "uncomplicated firewall")
  - Ensure firewall will allow SSH'ing: `ufw allow OpenSSH`
  - Turn on firewall: `ufw enable`

## [How To Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
- Download docker 
  - Update OS' list of packages, and install packages that `apt` needs to use HTTPS: `sudo apt update && sudo apt install apt-transport-https ca-certificates curl software-properties-common`
  - Add the Docker repository GPG: `curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -`
  - Add the Docker repository to `apt`, and update: `sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable && sudo apt update"`
  - Install Docker: `sudo apt install docker-ce`
  - Check that it's running: `sudo systemctl status docker`
- Ensure non-`root` access
  - Add another user to the `docker` group: `sudo usermod -aG docker my_new_user`
  - Check that the user's groups updated: `id -nG`
- Explore Docker Hub images
  - Check that you can access images: `docker run hello-world`
  - Inclusive-search for an image: `docker search ubuntu`
  - Download it: `docker pull ubuntu`
  - List the images on your local: `docker images`
- Explore a container
  - Create a new container based on the image, and provide interactive-terminal access to it: `docker run -it ubuntu`
  - Exit, and check it's no longer running: `docker ps -a`
  - You can call `docker start`, `docker stop`, and `docker rm` on a container using either its `Container ID` or its (arbitrarily assigned) `Name` (both displayed in `ps -a`)
- Save a container as a new image
  - Add a commit: `docker commit -m "added node and postgres" -a "ysuss" <container_id> ysuss/<new_image_name>`
    - (`repository` is your Docker Hub username; if different from your local username, you'll need to `docker tag`)
  - Login to Docker Hub: `docker login -u ysuss`
  - Push image: `docker push ysuss/<new_image_name>`
  - Once logged in, you can now `docker pull ysuss/<new_image_name>` from any machine

## [How To Install and Use Docker Compose on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
- Install Docker Compose
  - Check latest version available via "releases" page on GitHub
  - Download docker-compose: `sudo curl -L "https://github.com/docker/compose/releases/download/<latest_version>/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
  - Check successful download: `docker-compose --version`
  - Add execution privileges: `sudo chmod +x /usr/local/bin/docker-compose`
  - Check success: `ls -l /usr/local/bin/docker-compose`
- Set up demo app
  - Create project dir: `mkdir ~/my_compose_dir && cd ~/my_compose_dir`
  - Create webapp dir and static lander: `mkdir app && nano app/index.html`
  - Copypaste in some HTML, then `CTRL`+`x`, `y`, and `ENTER`
- Set up `docker-compose.yml`
  - Create file: `nano docker-compose.yml` (NB not in `app/`)
  - Add e.g.
    ```yml
    version: '3.7'
    services:
      web:
        image: nginx:alpine
        ports:
          - "8000:80"
        volumes:
          - ./app:/usr/share/nginx/html
    ```
  - `version` describes the Compose file-format version
  - `services` describes which services are part of this environment (here, a single service called `web`)
    - `images` describes the Docker image to use
    - `ports` describes any port-redirection: here, requests on port 8000 of the host machine (that is, the OS on which you’re running Docker Compose) will be redirected to the container on port 80.
    - `volumes` creates a shared volume between the host machine and the container
      - Here, it shares the host's `./app` folder, and locates it at `/usr/share/nginx/html` inside the container
      - This keeps your `./app` files in sync with the container’s document root: any changes to the `index.html` file will be automatically picked up by the container
- Run Docker Compose
  - Download the images inside the file, create one container for each service, and begin running them in daemon/background mode: `docker-compose up -d`
  - Check success: `docker ps -a`
  - Check the containers' logs: `docker-compose logs`
  - Terminate containers' execution without removing their data: `docker-compose stop`
  - Remove the environment's containers, networks, and volumes: `docker-compose down`
  - Remove the underlying image: `docker image rm nginx:alpine`

## [Containerizing a Node.js Application for Development With Docker Compose](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose)
- Clone the app
  - `git clone <github_address> <local_dir>`
- Set up app envvars
  - For db connection, define the `host` envvar at the level of the Docker Compose file
  - For db connection, define the [user, password, host, db] envvars inside the `.env` file, then access it with `process.env` in the app's e.g. `.js` files
- Ensure app connects to db in sequence
  -  Add a script called `wait-for` to ensure that the app only attempts to connect to the db once the db's startup tasks are complete. 
  - This script is a wrapper for `netcat`; it polls whether a specific host/port are accepting TCP connections. 
  - Create the file: `nano wait-for.sh && chmod +x wait-for.sh`
  - Add code: 
    ```bash
    #!/bin/sh
    # original script: https://github.com/eficode/wait-for/blob/master/wait-for

    TIMEOUT=15
    QUIET=0

    echoerr() {
      if [ "$QUIET" -ne 1 ]; then printf "%s\n" "$*" 1>&2; fi
    }

    usage() {
      exitcode="$1"
      cat << USAGE >&2
    Usage:
      $cmdname host:port [-t timeout] [-- command args]
      -q | --quiet                        Do not output any status messages
      -t TIMEOUT | --timeout=timeout      Timeout in seconds, zero for no timeout
      -- COMMAND ARGS                     Execute command with args after the test finishes
    USAGE
      exit "$exitcode"
    }

    wait_for() {
      for i in `seq $TIMEOUT` ; do
        nc -z "$HOST" "$PORT" > /dev/null 2>&1

        result=$?
        if [ $result -eq 0 ] ; then
          if [ $# -gt 0 ] ; then
            exec "$@"
          fi
          exit 0
        fi
        sleep 1
      done
      echo "Operation timed out" >&2
      exit 1
    }

    while [ $# -gt 0 ]
    do
      case "$1" in
        *:* )
        HOST=$(printf "%s\n" "$1"| cut -d : -f 1)
        PORT=$(printf "%s\n" "$1"| cut -d : -f 2)
        shift 1
        ;;
        -q | --quiet)
        QUIET=1
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if [ "$TIMEOUT" = "" ]; then break; fi
        shift 2
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        --)
        shift
        break
        ;;
        --help)
        usage 0
        ;;
        *)
        echoerr "Unknown argument: $1"
        usage 1
        ;;
      esac
    done

    if [ "$HOST" = "" -o "$PORT" = "" ]; then
      echoerr "Error: you need to provide a host and port to test."
      usage 2
    fi

    wait_for "$@"

    ```
- Define services with Docker Compose
  - Create Docker Compose file: `nano docker-compose.yml`
  ```yml
  version: '3'

  services:
    nodejs:
      build:
        context: .
        dockerfile: Dockerfile
      image: nodejs
      container_name: nodejs
      restart: unless-stopped
      env_file: .env
      environment:
        - MONGO_USERNAME=$MONGO_USERNAME
        - MONGO_PASSWORD=$MONGO_PASSWORD
        - MONGO_HOSTNAME=db
        - MONGO_PORT=$MONGO_PORT
        - MONGO_DB=$MONGO_DB 
      ports:
        - "80:8080"
      volumes:
        - .:/home/node/app
        - node_modules:/home/node/app/node_modules
      networks:
        - app-network
      command: ./wait-for.sh db:27017 -- /home/node/app/node_modules/.bin/nodemon app.js
    db:
      image: mongo:4.1.8-xenial
      container_name: db
      restart: unless-stopped
      env_file: .env
      environment:
        - MONGO_INITDB_ROOT_USERNAME=$MONGO_USERNAME
        - MONGO_INITDB_ROOT_PASSWORD=$MONGO_PASSWORD
      volumes:  
        - dbdata:/data/db   
      networks:
        - app-network

  networks:
    app-network:
      driver: bridge

  volumes:
    dbdata:
    node_modules:  
  ```
  - Each of the `services` in Compose is a running container
    - `build` defines the configuration options to apply when Compose builds the image; it's an alternative to `image`, which defines an existing image to pull (locally, or from a registry)
      - `context` defines the "build context": that is, a path to a directory containing a Dockerfile
      - `dockerfile` defines the file to use therein
    - `image`, when paired with `build`, defines the name of the now-built image
    - `restart` defines when to restart the service; it defaults to `no`
    - `env_file` defines the file from which we would like to add environment variables (relateive to the build context)
    - `ports` maps port 80 on the host to port 8080 on the container
    - When declared inside a service, `volumes` mounts a host path for that single service
      - `.:/home/node/app` _bind mounts_ the application code on the host to the `/home/node/app` directory on the container 
        - This facilitates rapid development: any changes you make to your host code will be populated immediately in the container
        - NB: use volumes' long syntax for this; it seems [more explicit](https://docs.docker.com/compose/compose-file/#volumes)
      - `node_modules:/home/node/app/node_modules` creates a new _volume_ (`node_modules`)
        - Without this declaration, the (empty/nonexistent) host `node_modules`would overwrite the containter's (populated) `node_modules` dir created by the `npm install` command (declared in the `Dockerfile`)
        - Defining a `node_modules` volume persists the contents of the container's `/home/node/app/node_modules` directory and mounts it to the container, thereby overriding the `bind`
        - In the second usage, `dbdata:/data/db` will persist the data stored in MongoDB (such that you don’t lose data when you stop/remove containers)
    - When declared inside a service, `networks` defines those networks that this service can join
    - `command` defines any command to be executed when Compose runs the image
      - This overrides any `CMD` instructions set in the application `Dockerfile`
      - Like `CMD`, this can take "exec" or "shell" form
  - At the top level, `networks` defines Docker-daemon-level host networks 
    - This enables communication between any `services` that add a network to their `networks` key
    - On a single host, docker defaults to using `driver: bridge`, which is based on a Linux bridge (a virtual switch) and thus scoped locally
  - At the top level, `volumes` defines volumes to be created by Docker
    - They'll be stored in the host filesystem at `/var/lib/docker/volumes/`
    - They'll get mounted to any `services` that add the volume to their `volumes` key
- Run the app
  - Build images and create containers: `docker-compose up -d`
  - Check container status: `docker-compose ps`
  - Check app logs: `docker-compose logs`

## [How To Secure a Containerized Node.js Application with Nginx, Let's Encrypt, and Docker Compose](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose)
- Set up DNS
  - Follow https://www.digitalocean.com/docs/networking/dns/quickstart/ to map url to IP on Digital Ocean
  - Also map url to IP on registrar
- Clone the app and define the web server
  - Pull from GitHub: `git clone https://github.com/do-community/nodejs-image-demo.git sherks`
  - Add Nginx config file: `cd sherks && mkdir nginx-conf`
  - Populate file: 
    ```txt
      server {
          listen 80;
          listen [::]:80;

          root /var/www/html;
          index index.html index.htm index.nginx-debian.html;

          server_name demodo.tk www.demodo.tk;

          location / {
                  proxy_pass http://nodejs:8080;
          }

          location ~ /.well-known/acme-challenge {
                  allow all;
                  root /var/www/html;
          }
      }
    ```
    - The above code...
      - proxies user requests to the app-container and
      - directs Certbot’s requests to the `.well-known` directory
      - uses Certbot’s `webroot` plugin to obtain certificates for the domain (this plugin uses an HTTP request to prove that Certbot can access resources from a server that responds to a given domain name.)
- Create the Docker Compose file
  - Create the following `docker-compose.yml`:
  ```yml
  version: '3'

  services:
    nodejs:
      build:
        context: .
        dockerfile: Dockerfile
      image: nodejs
      container_name: nodejs
      restart: unless-stopped
      networks:
        - app-network

    webserver:
      image: nginx:mainline-alpine
      container_name: webserver
      restart: unless-stopped
      ports:
        - "80:80"
      volumes:
        - web-root:/var/www/html
        - ./nginx-conf:/etc/nginx/conf.d
        - certbot-etc:/etc/letsencrypt
        - certbot-var:/var/lib/letsencrypt
      depends_on:
        - nodejs
      networks:
        - app-network

    certbot:
      image: certbot/certbot
      container_name: certbot
      volumes:
        - certbot-etc:/etc/letsencrypt
        - certbot-var:/var/lib/letsencrypt
        - web-root:/var/www/html
      depends_on:
        - webserver
      command: certonly --webroot --webroot-path=/var/www/html --email ypaulsussman@gmail.com.com --agree-tos --staging -d demodo.tk  -d www.demodo.tk

  volumes:
    certbot-etc:
    certbot-var:
    web-root:
      driver: local
      driver_opts:
        type: none
        device: /home/ysuss/sherks/views/
        o: bind

  networks:
    app-network:
      driver: bridge
  ```
  - In the `volumes` key, `web-root` describes our static assets' location 
    - On most Docker engines, the `driver` is `local`
    - On Linux, this accepts options similar to the `mount` command
    - This lets us specify a list of k:v options with `driver_opts`
    - Here, mount the host OS' `views` directory to the volume at runtime, thereby allowing the directory contents to be shared between containers
- Obtain SSL cert
  - Run `docker-compose up -d`, then
    - `docker-compose logs certbot` to confirm the `certbot` service saved a certificate; and
    - `docker-compose exec webserver ls -la /etc/letsencrypt/live` to confirm the credentials have been mounted to the `webserver` container
  - Run `nano docker-compose`; in the `certbot` service, replace the `--staging` flag with the `--force-renewal` flag (which will tell Certbot to request a new certificate, for the same domains)
  - Run `docker-compose up --force-recreate --no-deps certbot`
    - This recreates the `certbot` container and its relevant volumes
    - Because its `depends_on` (`webserver`) is already running, we pass `--no-deps` to skip that check
- Modify webserver config for HTTPS
  - Create a dir to hold your Diffie-Hellman key: `mkdir dhparam`
  - Generate a key: `sudo openssl dhparam -out /home/ysuss/sherks/dhparam/dhparam-2048.pem 2048`
  - Replace old Nginx config file: `rm nginx-conf/nginx.conf && nano nginx-conf/nginx.conf`
  - Update Nginx config:
    ```
    server {
            listen 80;
            listen [::]:80;
            server_name demodo.tk www.demodo.tk;

            location ~ /.well-known/acme-challenge {
              allow all;
              root /var/www/html;
            }

            location / {
                    rewrite ^ https://$host$request_uri? permanent;
            }
    }

    server {
            listen 443 ssl http2;
            listen [::]:443 ssl http2;
            server_name demodo.tk www.demodo.tk;

            server_tokens off;

            ssl_certificate /etc/letsencrypt/live/demodo.tk/fullchain.pem;
            ssl_certificate_key /etc/letsencrypt/live/demodo.tk/privkey.pem;

            ssl_buffer_size 8k;

            ssl_dhparam /etc/ssl/certs/dhparam-2048.pem;

            ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
            ssl_prefer_server_ciphers on;

            ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;

            ssl_ecdh_curve secp384r1;
            ssl_session_tickets off;

            ssl_stapling on;
            ssl_stapling_verify on;
            resolver 8.8.8.8;

            location / {
                    try_files $uri @nodejs;
            }

            location @nodejs {
                    proxy_pass http://nodejs:8080;
                    add_header X-Frame-Options "SAMEORIGIN" always;
                    add_header X-XSS-Protection "1; mode=block" always;
                    add_header X-Content-Type-Options "nosniff" always;
                    add_header Referrer-Policy "no-referrer-when-downgrade" always;
                    add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline'" always;
                    # add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
                    # enable strict transport security only if you understand the implications
            }

            root /var/www/html;
            index index.html index.htm index.nginx-debian.html;
    }
    ```
    - There are now two `server` blocks
    - The HTTP block... 
      - specifies the `.well-known/acme-challenge` directory as the `root` for Certbot renewal requests; and
      - includes a `rewrite` directive that directs HTTP requests to the `root` directory to HTTPS.
    - The HTTPS server block... 
      - enables `ssl` and `http2`;
      - specifies your SSL and Diffie-Hellman credentials and key locations;
      - ensures that you are using the most up-to-date SSL protocols and ciphers ;
      - ensures that OSCP stapling (which speeds up the auth process by offering a time-stamped response from your certificate authority during the initial TLS handshake) is turned on;
      - sets up a reverse proxy:
        - `try_files` redirects requests to the `@nodejs` alias;
        - the `@nodejs` alias passes on requests to the `nodejs` container via the `proxy_pass`;
        - the `@nodejs` alias also adds several security headers, to get better ratings from e.g. the [SSL Labs](https://www.ssllabs.com/ssltest/) and [Security Headers](https://securityheaders.com/) test sites
  - Update Docker Compose:
    - Open file: `nano docker-compose.yml`
    - Add the following three lines:
    ```yml
    services:
      webserver: # ...
        ports:
          - "443:443" # ...
        volumes:
          - dhparam:/etc/ssl/certs
    volumes: # ...
      dhparam:
        driver: local
        driver_opts:
          type: none
          device: /home/ysuss/sherks/dhparam/
          o: bind
    ```
    - Restart the `webserver` container to attach new volume: `docker-compose up -d --force-recreate --no-deps webserver`
- Set up cert renewal
  - Create script to renew cert: `nano ssl_renew.sh`
  - Populate:
  ```bash
  #!/bin/bash

  COMPOSE="/usr/local/bin/docker-compose --no-ansi"
  DOCKER="/usr/bin/docker"

  cd /home/ysuss/sherks/
  $COMPOSE run certbot renew --dry-run && $COMPOSE kill -s SIGHUP webserver
  $DOCKER system prune -af
  ```
  - This code...
    - starts a `certbot` container, overriding the `command` in its `.yml file` to instead use `renew` (here, with `--dry-run` for testing), then
    - sends a `SIGHUP` signal to the `webserver` container, which will [reload the Nginx configuration](https://blog.docker.com/2015/04/tips-for-deploying-nginx-official-image-with-docker/)
  - Make the script executable: `chmod +x ssl_renew.sh`
  - Open the root crontab: `sudo crontab -e`
  - Populate:
  ```
  */5 * * * * /home/ysuss/sherks/ssl_renew.sh >> /var/log/cron.log 2>&1
  ```
  - Wait 5 min, then check `tail -f /var/log/cron.log` to confirm the renewal request succeeded
  - Update `*/5 * * * *` to `0 12 * * *` in the crontab, to run daily at noon
  - Remove `--dry-run` from the script

## [How To Implement API Authentication with JSON Web Tokens and Passport](https://www.digitalocean.com/community/tutorials/api-authentication-with-json-web-tokensjwt-and-passport)
