# Foundations_of_PostgreSQL_Administration9.5

## Module 1. Introduction and Architectural Overview

Community resources

- postgresql.org/community/lists
- forums.enterprisedb.com/forums/list.page

PostgreSQL features

- Written in ANSI C
- ACID compliant
  - atomicity (_supports transactions_)
  - consistency (_transactions obey validations/constraints, or fail_)
  - isolation
    1. multi-version concurrency control ensures that transactions' intermediate changes aren't visible to other users, and
    2. automatic/implicit locking ensures that multiple users can't simultaneously write on the same record
  - durability (_server checkpoints and write-ahead/transaction logging ensure that, if necessary, the db can be rolled back to a prior state_)
- Table partitioning for v. large tables
- Tablespaces (keep slow data on one medium, and indexed data on a faster medium?)
- Host-based access control (\_can implement IP-based security to ensure only certain IP-hosted clients can connect)
- Object-level permissions (use 'Grant' and 'Revoke'?)
- Can log (who's connected, who's running DDL, etc)
- SSL connections (based on OpenSSL, running on server)
- Streaming replication: can stream transaction logs to a separate server
- Replication slots based on WAL logs
- `pg_basebackup` to do hot backups from online db clusters
- Can also use `pg_basebackup` (?) for point-in-time recovery
- Triggers/functions
- Can use various procedural languages instead of SQL if desired (PL/pgSQL, PL/Perl, PL/Java, etc)
- `pg_upgrade` - supports in-place upgrades
- Can create unlogged tables
- Can create materialized views

EDB Postgres Advanced Server

- Security (user password policies, auditing features, virtual private db's, SQL-injection protection, edb-wrap functionality to protect server code, EAL2/SAPRNET/JWIX certification)
- Tools (migration to EDB tools, tools for tuning instances, backup/recovery automation tool, failover automation manager)
- Better performance (resource manager for CPU/IO-resource adjustment, faster partitioning than community postgresql, faster bulk-data loader, query hints)
- Compatability w/ OracleDB for easy migration (Oracle-like dictionaries, Oracle-like tools: EDB*Plus, EDB*Wrap, EDB\*Loader)

Architectural overview

- Install PostgreSQL on an OS
- Connector on top of OS for applications
  - libpq is by-default installed
  - C API
  - supports Ruby/Perl/Python/PHP/ODBC/OCL/ECPG/OLE-DB connections
- .NET, JDBC, Ruby (Native) connectors also available

General DB Limits

- Max size for a single db = unlimited
- Max size for a single table = 32tb
- Max size for a single row = 1.6tb
- Max size for a single field = 1gb
- Max rows per table = unlimited
- Max columns per table = 250-1600 (depends on datatypes)
- Max indexes per table = unlimited

Common DB Terms && PG Equivalent

- Table/Index => Relation (e.g. `pg_relation_size` function will work on a table, or on an index)
- Row => Tuple
- Column => Attribute
- Data Block (smallest storage block on disk) => Page - e.g. `relpages` dictionary (size limit: 8kb)
- Page (smallest storage block in memory) => Buffer (size limit: 8kb)

## Module 2. System Architecture

Process vs thread

- The typical difference is that
  - threads (of the same process) run in a shared memory space, while
  - processes run in separate memory spaces.
- Processes are the abstraction of running programs: A binary image, virtualized memory, various kernel resources, an associated security context, and so on.
- Threads are the unit of execution in a process: A virtualized processor, a stack, and program state.
- Processes are running binaries, and threads are the smallest unit of execution schedulable by an operating system's process scheduler. ([More here.](https://www.quora.com/What-is-the-difference-between-a-process-and-a-thread))

PostgreSQL uses processes, not threads

- server itself (or "postmaster process") is a process running on the db server machine
- each connecting client is its own process

Postmaster process

- Process is named `postgres` (note `postmaster` is deprecated alias)
- One Postmaster process per instance
- Starts when you start up the server/instance
- Acts as supervisor for all the other processes running on the server
  - On startup, Postmaster also begins several utility processes in background
    - If a utility process gets killed, the Postmaster will try to restart them
    - If it can't, it sends a shutdown signal to the server
  - Manages user backend-processes
    - One backend process per user session
    - Unlike Oracle, server process itself is the listener (no separate process)
    - Postmaster listens for new connection requests on 1 (and only 1) TCP port (default is 5432; 5444 for EDB version)
    - Starts new server process as response to each such request

Shared memory

- Allocated to Postmaster when the Postmaster process spins up
- Contains...
  - Shared buffers for reading/writing to the data files
  - WAL buffers for logging transactions (first to WAL buffer, then to the WAL segments on disk)
  - Process array (in-memory array representation of the processes for each user connected to the server)

Disk storage

- Data files
- WAL Segments (transaction logs)
- Archived WAL
- Error-log files

Utility Processes

- BG (background) Writer: continuously ensures enough shared-buffer area is available for read/writes (write dirty data blocks to disk)
- Log writer: collects logging information (not for transactions; for errors etc) for error-log files disk storage (routes log messages to syslog, eventlog if Windows, or other log files if configured to do so)
- WAL writer: collects logging information (for transactions) for WAL segments disk storage (flushes WAL buffer area to disk)
- Archiver: copies log info from WAL segments disk storage to Archived WAL disk storage, when a given WAL segment is full
- Autovacuum: helps maintenance by automating the vacuum/analyze process (launches autovacuum worker processes when required)
- Checkpointer: writes all content from shared-buffer to data-files whenever checkpoint is hit (_default PG checkpoint is every 5 min, or whenever transaction log is full: these can be changed by config params_), to ensure db can fully recover to that checkpoint if needed
- Stats collector: collects data on tables/user-behavior; writes some of these stats to data files, and others to temp files

User Backend Processes

- Spawned when postmaster receives a connection request
- Also named `postgres`
- Next, process performs authentication against the `pg_hba.conf` file containing list of user IP addresses
- Next, username/password is verified against server-side data files
- Next, user permissions are verified (_for authorization... but where/how? Not listed_)
- Next, process is returned to client
- This process will manage the user's SQL requests
- Each such process gets its own `work_mem` (memory area for sorting/hashing operations, etc)
- When user disconnects, postmaster will clean process from server

Examples of running postgres processes:

```bash
~ $ ps -ef | grep postgres
  501  7600     1   0  9Jul19 ??         0:12.78 /usr/local/opt/postgresql/bin/postgres -D /usr/local/var/postgres
  501  7602  7600   0  9Jul19 ??         0:06.86 postgres: checkpointer
  501  7603  7600   0  9Jul19 ??         0:02.87 postgres: background writer
  501  7604  7600   0  9Jul19 ??         0:04.85 postgres: walwriter
  501  7605  7600   0  9Jul19 ??         0:13.63 postgres: autovacuum launcher
  501  7606  7600   0  9Jul19 ??         1:09.48 postgres: stats collector
  501  7607  7600   0  9Jul19 ??         0:00.18 postgres: logical replication launcher
  501 11011  7600   0 Thu12PM ??         0:00.02 postgres: ypaulsussman badges_development 127.0.0.1 idle
  501 13710  7600   0 Thu03PM ??         0:00.03 postgres: ypaulsussman badges_development 127.0.0.1 idle
  501 38761  7600   0 11Jul19 ??         0:30.21 postgres: ypaulsussman badges_development_stats_app ::1 idle
  501 38997  7600   0 11Jul19 ??         0:30.06 postgres: ypaulsussman badges_development_stats_app ::1 idle
  501 69318 66371   0  3:49PM ttys000    0:00.00 grep postgres

# More-detailed alternative:
# ~ $ ps auxww | grep postgres
```

- In the above `501 7600 1 0 9Jul19 ?? 0:12.78 /usr/local/opt/postgresql/bin/postgres -D /usr/local/var/postgres` is the postmaster process (note that it's linked to a data directory via `-D`)
- Note the second column is process number, while the third column is _supervising_ process number.

To learn more about the postmaster process:

```bash
~ $ cat  /usr/local/var/postgres/postmaster.pid
7600                    # pid
/usr/local/var/postgres # data directory
1562700087              # memory-segment size
5432                    # port number on which server is listening
/tmp                    # socket directory
localhost               # IP address on which server is listening
  5432001     65536     # ?
ready                   # ?
```

Shared Buffers

- Used for read/writes to data file
- For reads, acts like a cache; helps reduce I/O on same content (across users/queries)
- Any query will check whether data is already in shared buffers
  - If so, does a "logical I/O" read from the buffer (much faster!)
  - If not, only _then_ does it read from disk into memory ("hard I/O" or "physical I/O")
- For writes, any e.g. `INSERT` or `UPDATE` first happens in the buffer area, and then only later is synchronized to the data file (either at the time of checkpointing, or when the background writer has the opportunity/is free)
- That is: the changes you make always happen only to the shared buffer
- Side note: Background Writer Cleaning Scan
  - Ensures there's an adequate supply of "clean" buffers
  - Does so by scanning, then writing "dirty" buffers to the disk

Write-Ahead Logging

- When a transaction happens...
  - The transaction's data is written to the shared buffers
  - The transaction is written to the WAL buffer
  - On commit, the WAL buffer for that transaction is then flushed to the transaction log (_whereas the equivalent data in the shared buffer is merely marked as 'committed,' not actually written to disk_)
- Group commits are slightly different: small transactions' are combined, on commit, then a 'group commit' is done to flush to disk
- Side note: for transaction-log archiving, the Archiver utility process spawns a task to copy away (full) log files in the `pg_xlog` dir to the Archived WAL area on disk

Commits and checkpoints:

- When a transaction is complete, but not yet committed, it remains in-memory (in the shared buffers' and WAL buffers' memory areas.)
- Once committed, the changes are written to disk
  - the WAL buffers are flushed to the WAL segment on disk, and
  - the changes in shared buffers are marked as committed
- After the checkpoint, all (modified data pages in shared buffers which are marked as committed) are written to the data files on disk.

How Postgres' SQL engine processes a statement:

- Parsing
  - Syntax is verified
  - Traffic Cop is called in order to identify whether query requires optimization (e.g. `CREATE` statement can be sent directly to the Command Processor w/o optimization)
  - If optimization is required, first breaks query into node structure composed of tokens (for e.g. literals, identifiers, operators, keywords, etc.)
- Optimizing
  - Planner generates multiple plans
  - Uses database statistics to calculate each query's cost
  - Compares queries to find most efficient (lowest-cost)
- Executing
  - Simple worker
  - Receives both tokens and plan, then... well, executes them

Physical Database Architecture

- Cluster: collection of db's, managed by a single server instance
- Each cluster has individual:
  - physical data directory,
  - TCP port, and
  - set of processes (e.g. Postmaster and utility processes)

Directory Layout

- `bin` contains executables
- `include` contains header files
- `lib` contains libraries
- `share` contains third-party scripts/extensions
- `data` contains actual data (note in your setup it's in `/usr/local/var/postgres~/pgsql`, not `usr/local/Cellar/posgresql/11.2_1` or `~/pgsql`)
- `stackbuilder` is optional; it's used in order to install additional components
- `installer`, `scripts`, `doc`, and `pgAdmin III` are all, apparently, also optional (as they don't appear in any of yours...)
- If Windows machine, will include `pg_env.bat`
- Note you personally _do_ have several other copies of postgres in `usr/local/opt/`, though you're apparently not using them.

One cluster has one `data`-dir; inside is:

- `Global` contains cluster-wide db objects
  - That is, tables and files that are used across multiple db's in the cluster
  - e.g.`pg_control` and `pg_filenode.map` files
- `Base` contains actual db dirs (one dir per db in cluster)
- `pg_tblsc` contains symlinks to tablespace locations (...if you've created user, non-default tablespaces inside this instance)
- `pg_xlog` contains WAL segments (transaction logs)
- `pg_log` contains error logs
  - You can change this location w/ config params
  - Unlike `pg_xlog` files (which are binary files), `pg_log` files are text and can be read directly
- Status Directories
  - e.g. `pg_clog`, `pg_stat`, `pg_snapshots`, `pg_notify`, `pg_serial`, `pg_logical`, `pg_multiexact`, `pg_replslot`, `pg_dynshmem`, `pg_subtrans`
  - Contain status information, transaction information, running server information, temp stats information
  - Server occasionally uses them
  - Don't contain your data
  - Directories themselves aren't temporary, but their content is
- `postgresql.conf` file (server parameters)
- `postgresql.auto.conf` file (auto-edited by server when you run alt/system commands; not human-edited)
- `pg_hba.conf` file (host-based access control; contains IP addresses of clients who can connect with your server)
- `pg_ident.conf` file (OS-user:DB-user mapping/authentification)
- `postmaster.pid` file (only exists when server is running; contains info re: postmaster process)
- `postmaster.opts` file (contains options that you used to start the server)

Regarding your personal data directories, the results of the following query...

```postgresql
select oid, datname from pg_database;

/*   oid   |           datname
   --------+------------------------------
     13382 | postgres
         1 | template1
     13381 | template0
    121362 | badges_development_stats_app
    123317 | badges_test_stats_app
    327181 | badges_analysis_development
    327182 | badges_analysis_test
    544093 | badges_development
    591006 | badges_test

(9 rows) */
```

...corresponds to the nine directories in `usr/local/var/postgres/base`:

```bash
$ ls -l

: '
drwx------   296 ypaulsussman  admin   9472 Apr 19 13:39 1
drwx------   926 ypaulsussman  admin  29632 Jul 23 11:02 121362
drwx------   914 ypaulsussman  admin  29248 Jul 22 19:28 123317
drwx------   296 ypaulsussman  admin   9472 Apr 19 13:39 13381
drwx------   296 ypaulsussman  admin   9472 Jul 22 19:28 13382
drwx------   341 ypaulsussman  admin  10912 Jun 17 08:59 327181
drwx------   296 ypaulsussman  admin   9472 Jun 13 15:06 327182
drwx------   979 ypaulsussman  admin  31328 Jul 22 19:29 544093
drwx------  1026 ypaulsussman  admin  32832 Jul 22 19:28 591006
'
```

If you want to get more granular than _that_, you can use:

```postgresql
select pg_relation_filepath('users');

/* pg_relation_filepath
----------------------
 base/544093/544208
(1 row) */
```

...to find the data-file for a given table.

- You can usually find the metadata file b/c it's been last-updated at the same time, as well as the table's [TOAST-ed values](https://www.postgresql.org/docs/11/storage-toast.html#STORAGE-TOAST-ONDISK).\_)

- The max size for a given data-file is 1GB; when it surpasses that, it's automatically segmented into a new, separate file named (using the example of the file above) e.g. `544208.1`...`544208.2`...etc

- If an attribute inside a table is very large, it'll be TOASTed into the data-file's parallel TOASTing-info file (_the third file._)

- The `${file_number}_vm` and `${file_number}_fsm` files are generated by jobs from (Autovacuum process, or manual vacuum); the server uses them internally to locate free space in the data file for sorting, and which pages contain only-valid rows (They stand for "_visibility math_" and "_free-space math,_" respectively.)

Physical Database Architecture

- File-per-table
- File-per-index
- Creating a table or index inside a tablespace will create its file in that tablespace's dir
  - Each db using that tablespace gets a subdirectory, in `/storage` and `/pg_tab`
  - Connected to the actual db dir via symlink located in `pg_tblsc`
- Each relation using that tablespace:db combination gets 1+ files, in 1GB segments
  - Each file name is a number, `pg_class.relfilenode`
  - First data-file is `relfilenode`; second segment `relfilenode.1`, etc
- Additional files hold auxiliary information (free-space map, visibility map)
  - These files are used for index-only scans, and to speed up the vacuum

Page Layout

- A table/index stores all its data on a data-file; the data-file contains pages.
- A page is the smallest storage block on disk.
- By default, 8kb
- Each page contains:
  - Page header
    - General information about the page
    - Pointers to available free space (Both location where R/I-pointers can be created, and location where R/I entries can be added)
    - Very small: 24 bytes long
  - Row/index pointers
    - Array of offset/length pairs pointing to the actual row/index entries
    - 4 bytes per item
  - Free space
    - Unallocated space
    - New row/index-pointers allocated from the top of the page
    - New row/index-entries allocated from the end of the page
  - Row/index entry
    - Actual row/index-entry data
  - Special space
    - Index-access method data
    - Empty in ordinary tables

## Module 3. PostgreSQL Installation

Installation options for PostgreSQL

- From source code
  - Remember: PostgreSQL can run on any system with a C compiler
  - Difference here is that unlike system packages or wizard installer, won't actually need superuser privileges here)
- OS package
  - RPM/YUM
  - Debian/Ubuntu DEB
  - FreeBSD port
  - Solaris
- GUI wizard installer
  - `postgresql.org` routes to `enterprisedb.com` for wizard-installer download
    - StackBuilder is bundled with the GUI installer; see below for details
    - This version also includes pgAdminIII (GUI tool)
  - After downloading file from website, create `postgres` user, as above
  - Then `sudo chmod u+x postgresql-9.5.0-1-linux-x64.run` (or whatever the installer file you downloaded)
    - (Need to give the binary execute privileges which isn't provided by default, obviously, to downloaded files)
  - Finally, `sudo ./postgresql-9.5.0-1-linux-x64.run`
    - Note that, if you're running from inside a text-mode-only OS (one w/o GUI access), the wizard will automatically enter text-only mode
  - After installation, prompt to install `Application Stack Builder` (can do later on, too, from application menu)

OS User and Permissions

- PostgreSQL GUI Installer needs superuser/admin access
  - After installation, e.g. `bin`, `includes`, etc files will be owned by user who installed PostgreSQL
  - The data directory for a given cluster, though, will be owned by a normal OS user
- PostgreSQL GUI installer adds `postgres` to the OS by default
  - This user will own all the processes related to the db cluster (Unix/Linux, daemon; Windows, service)
  - On Windows, there's no locked-user, so you'll be prompted for a password
  - On Linux, this user is locked (can't log in as that user)
    - If installing from GUI, then, advisable to add such user (before running the binaries)
    - This will ensure a proper home dir for the user is created
    - On Unix, can use e.g. `sudo useradd postgres`, then `sudo passwd postgres` (or `sudo useradd -p postgres myDopePassword`)

Side note: in `psql`, `show port` and `show data_directory` do exactly what you think

Side note: other commands

- List all usernames: `awk -F':' '{ print $1}' /etc/passwd` (you can also `cat /etc/passwd`, but that'll provide a ton of usually-superfluous colon-delimited info as well)
- `su -postgres` and `pg_ctl status -D ~/pgsql/data` will give you the status of your server
  - Alternatively, drop `-D` and rely on the `PGDATA` envar instead
  - On your version/local setup, use `pg_ctl -D /usr/local/var/postgres status`, instead
  - `pg_ctl start` and `pg_ctl start` are the other very common commands, here (if you're not using `brew`)

StackBuilder details

- Provides GUI for downloading add-on modules
- Some tools are open-source; others are EDB-proprietary, like...
  - Postgres Enterprise Manager (PEM)
    - Manage/monitor/tune multiple (hundreds) PostgreSQL instances
    - Also monitor OS usage, memory/CPU/disk I/O, etc
    - Configure alerts
  - xDB Replication Server - implement multi/single-master replication between different db's (e.g. Postgresql and Oracle, etc)
  - EDB Failover Manager (EFM)
    - Minimize downtime w/ automated failovers (streaming replication?)
    - Reduce false failovers w/ witness node
  - EDB Backup and Recovery Tool (BART) - CLI for implementing/managing backups, doing restores
  - SQL/Protect - SQL-injection protection
  - Migration Toolkit - fast/flexible data-migration tool
  - Update monitor - notifications for critical patches/updates

Setting Environmental Variables

- Several key vars:
  - `PATH` - should point to `bin` directory (inside installation dir?)
  - During startup/shutdown, following are used:
    - `PGDATA` - should point to correct data-cluster dir
  - During client-connection time, following are used:
    - `PGPORT` - should point to port on which db cluster is running (won't configure port, merely tell user-profile that this is the default port to use for connection requests)
    - `PGUSER` - specifies default db username
    - `PGDATABASE` - specifies default db
  - Others include `PGPASSWORD` and `PGHOST`; still more [listed here](https://www.postgresql.org/docs/11/libpq-envars.html)
- Linux: edit `.profile` or `.bash_profile` to set the variables
- Windows: use `My Computer > Properties > Advanced Properties` GUI to set variables
- To check your envars, run `cat /opt/PostgreSQL/9.5/pg_env.sh` (\_note that I haven't been able to locate that file, or references to it after version 9.X -- possibly either deprecated or, more likely, an artifact provided by the GUI Wizard Installer)

Lab Exercise 1

- Choose platform on which you want to install PostgreSQL
- Download PostgreSQL installer from EDB for chosen platform
- Prepare platform for installation
- Install PostgreSQL
- Connect to PostgreSQL using psql
  - set `PATH`, `PGDATA`, `PGUSER`, and `PGPASSWORD`vars

## Module 4. EDB Postgres Advanced Server Installation

- Instead of `postgres`, locked user generated on startup is named `enterprisedb`

- Migration Toolkit and EDB\*Plus require Java 1.7+

- If using SELinux, it must be set to permissive mode (e.g. `setenforce permissive`)

- EDBPAS only available via Wizard installer or RPM/YUM system package

- After downloading binary, will need to extract with e.g. `tar -zxvf ppasmeta-9.5.0.3-linux-x64`

- During installation, use your `enterprisedb.com` email and password for the auth prompt

- FWIW: on his demo, he selected `Database Server`, `Connectors`, `Migration ToolKit`, `PEM Client`, and `EDB*Plus` from the components prompt.

- EDBPAS can be installed in two modes: Oracle-compatible (_if you are planning to migrate over an Oracle db_) or PostgreSQL-compatible

- EDBPAS has dynatune settings for server utilization (how much of the system resources may be utilized by the EDBPAS)

- EDBPAS has dynatune settings for workload profile (transaction processing, general purpose, or reporting -- that is, how much is OLTP/writes vs OLAP/reads)

- pgAgent is background job-scheduler; EDBPAS lets you choose to autostart its service, if desired

- EDBPAS lets you choose whether to turn on the Update Notification service

- StackBuilder Plus is... pretty much the same as the community-PostgreSQL GUI Wizard version

Lab Exercise 1

- Choose platform on which you want to install EDB Postgres Advanced Server
- Download EDB Postgres Advanced Server installer from EDB for chosen platform
- Prepare platform for installation
- Install EDB Postgres Advanced Server
- Connect to EDB Postgres Advanced Server using `edb-psql`

## Module 5. Database Clusters

Database clusters

- Collection of 1+ db's, all managed by a single server instance
- Each db cluster requires:
  - One unique data-directory (in which all the cluster's data files are located)
  - One unique port number (on which the server is listening for connection requests)
- PostgreSQL's default db's (_present at any cluster's initialization_) are:
  - `template0`
  - `template1`
  - `postgres`

Creating a db cluster

- First, choose data-directory location for the new cluster
- Data directory can be created manually:
  - Create file with superuser access: `sudo mkdir /my_new_data_dir`, then
  - Transfer directory ownership to the OS-user `postgres`: `sudo chown postgres:postgres /my_new_data_dir`
  - Then, before running `initdb`, switch user to `postgres`: `su - postgres`
  - This ensures that the OS-user `postgres` will be the default db superuser (see `-U` option below)
- Then, initialize the db cluster's storage area (the new data-directory) using `initdb ... [DATADIR]`
  - `initdb` will create the dir if it doesn't already exist
  - As such, calling user must have permissions on the parent dir
  - `initdb` command is located inside `bin` dir, so `$PATH` must be correct
  - `initdb` takes several options:
    - `-D`, `-pgdata` specifies the location of the data directory
    - `-E`, `-encoding` sets a default encoding for new dbs in the cluster
    - `-U`, `-username` sets the db superuser name; otherwise, it'll default to setting (whichever OS user actually runs `initdb`) as the db superuser
    - `-W`, `-pwprompt` sets a password for the new superuser; otherwise, password will default to being blank
    - `-X`, `-xlogdir` specifies the transaction-log location; otherwise, it'll drop them inside the data directory, within the `pg_xlog` dir
    - `-k`, `-data-checksums` enables page-level checksums
    - `-V`, `-version` returns the version of `initdb`
    - `-?`, `-help` returns the list of available options
  - With no `-D` specified, `initdb` will use the default `PGDATA` envar as the data-directory location
- Once the cluster is initialized, uncomment and set a unique port within the `/my_new_data_dir/postgresql.conf` file, e.g. `port = 5555` (so as not to conflict with the likely-still-running listener on the 5432 port)

To connect to a specific cluster,

- use `psql -p cluster_port_number individual_db_name db_user_logging_in`
- e.g. `psql -p 5555 template0 postgres`

Starting, reloading, and stopping a cluster

- Use `pg_ctl start` to begin server for cluster, using options:
  - `-D` sets the location for the db dir
  - `-l` sets the location of the logfile to receive server output (which otherwise will just appear on the terminal screen)
  - `-w` signals to wait until the operation completes
  - `-t` sets the number of seconds to wait
- Use `pg_ctl -D my_new_data_dir reload` or (in psql) `select pg_reload_conf();` to reload a cluster
  - Most common on config-param change, when the param doesn't require full restart
  - Nice, b/c won't disconnect any contemporary users (however, only new connections will be affected by param changes)
  - Can pass `-s` option to print only errors (not info messages)
- Use `pg_ctl -D my_new_data_dir stop` to shut down a cluster; three main modes
  - `-mf` is 'fast'/default; it quits directly
    - It will rollback any non-committed transactions
    - It will forcefully log off user connections
    - However, it also creates a proper checkpoint before exiting
  - `-ms` is 'smart'; it quits only after all clients have disconnected
  - `-mi` is 'immediate'; it quits without complete shutdown (and will go into autorecovery mode on restart)

View cluster control information

- Use `pg_controldata my_new_data_dir` to view control information for the cluster
- Or, for you, `pg_controldata -D /usr/local/var/postgres`

Lab Exercise 1

- A new website is to be developed for an online music store (?)
- Create a new cluster with data directory `/edbdata` and ownership by the `postgres` user
- Start the `edbdata` cluster
- Stop your `edbdata` cluster, using `fast` mode
- Reload your cluster with the `pg_ctl` utility, and using the `select pg_reload_conf();` function

## Module 06. Configuration

Setting PostgreSQL Parameters

- All parameter names are case-insensitive
- Parameter values can be:
  - boolean
  - integer
  - floating-point
  - string
  - enum

The `postgresql.conf` server-parameter file

- Holds the params for a given cluster
- `initdb` will create a default copy
- Usually located in data directory (for you, `usr/local/var/postgres/postgresql.conf`)
- Some params require server restart (these params are listed as such in the file)
- All params require a config reload
- Octothorpe for comments
- One param per line
- Use [the `include` directive](https://www.postgresql.org/docs/current/config-setting.html#CONFIG-INCLUDES) to read and process another file
  - `include 'relative/path/to/filename`
  - `include_dir 'relative/path/to/dir`
  - allows you to divide configs into separate files (which then different servers can access - prevents duplication)

Setting parameters

- Some params can be changed per-session with [the `set` command](https://www.postgresql.org/docs/current/sql-set.html)
  - Unlike other three methods, only lasts as long as current session
- Some params can be changed per-user with [the `alter user` (now `alter role`) command](https://www.postgresql.org/docs/11/sql-alterrole.html)
- Some params can be changed per-db with [the `alter database` command](https://www.postgresql.org/docs/11/sql-alterdatabase.html)
- Alternatively, to change for the entire cluster...
  - Manually update the `postgresql.conf` file
  - Use `alter system` command
    - Useful if you don't have access to the data dir on disk, but do have access via `psql`
    - Writes changes to `postgresql.auto.conf`; this file is read last during server reload/restart (and thus overwrites `postgresql.conf`)
- Precedence follows specificity: session-level settings > user-level > db-level > cluster-level.
- The `show ${parameter_name}` (or `show all`) command can be used to see current settings in `name, setting, description` format
- The e.g. `pg_settings` and `pg_file_settings` catalog tables (e.g. `select * from pg_catalog.pg_file_settings;`) also list current settings, in full detail

Sample psql workflow for creating specific users and db's from which you can test specific settings:

```postgresql
show work_mem;

--- work_mem
----------
--- 4MB

create user user1 password 'foo';
--- CREATE ROLE
create database db1
--- CREATE DATABASE

\c db1 user1
-- Password for user user1:
-- You are now connected to database "db1" as user "user1"
```

Good tactic when editing `postgresql.conf` -- create backup file beforehand:

```bash
cp usr/local/var/postgres/postgresql.conf usr/local/var/postgres/postgresql.conf.bak20190728
```

Also wise to keep the default param k:v in-file, commented, with `## COMMENT ABOUT WHY CHANGED, FOR FUTURE REFERENCE`

Commonly-used connection settings

- All settings below require restart, as they directly affect the `postmaster` process
- `listen_addresses` - addresses on which server should listen for connection requests
  - Default value is `localhost`
  - Use `*` for '_any/all_' addresses; use `0.0.0.0` for all IPv4 addresses; use `::` for all IPv6 addresses
  - If list is empty, only Unix-domain sockets can connect
- `port` - port on which server should listen for connection requests (default 5432)
- `max_connections` - maximum number of concurrent connections server should allow (default 100)
- `superuser_reserved_connections` - number of connections reserved for superusers (default 3)
- `unix_socket_directory` - dir to be used for Unix-domain socket connections to server (default `/tmp`)
- `unix_socket_permissions` - access permissions of Unix-domain socket connections (default 0777)

Commonly-used security/authentication settings

- All settings below require restart, as they directly affect the `postmaster` process
- The params below can only be set via `alter server` or manual `postgresql.conf` update
- The SSL params require openSSL on your db server
- `authentication_timeout` - maximum time to allow client authentication, in seconds (default: 60)
- `ssl` - enables SSL connections
- `ssl_ca_file` - path to file containing SSL server certificate-authority
- `ssl_cert_file` - path to file containing SSL server certificate
- `ssl_key_file` - path to file containing SSL server private-key
- `ssl_ciphers` - list of SSL ciphers that may be used (default is generally fine)

Commonly-used memory settings

- `shared_buffers` - size of cluster's shared-buffer pool (default 128mb)
- `temp_buffers` - amount of mem each session can use for read/writes to temporary tables (default 8mb)
- `work_mem` - amount of memory each session can use for each sorting/hash-joining operation, before switching to temporary disk files (default 4mb)
- `temp_file_limit` - amount of disk space each session can allocate for temp files; larger transactions will be cancelled (default -1/unlimited)
- `maintenance_work_mem` - amount of memory the server can use for [index-building, reindexing, vacuuming, analyzing, copying] maintenance commands (default 64mb)

Commonly-used query-planner settings

- `random_page_cost` - estimated cost of random page-fetch (in abstract cost units); can reduce to account for caching (default 4.0)
- `seq_page_cost` - estimated cost of sequential page-fetch (in abstract cost units); can reduce to account for caching, but must always be <= `random_page_cost` (default 1.0)
- `effective_cache_size` - used for estimating cost of an index-scan (but doesn't actually set that cache size!); general rule = 3/4 system memory (default 4gb)
- Note that decreasing `random_page_cost` or `seq_page_cost` will make their respective scans more likely to be chosen by the query optimizer; _increasing_ `effective_cache_size` will make an index scan more likely
- `enable_*` - ~twenty parameters that (crudely) influence how the optimizer creates query plans; [more here.](https://www.postgresql.org/docs/current/runtime-config-query.html#RUNTIME-CONFIG-QUERY-ENABLE)
- Note these params tend to be modified by the needs of a given session, rather than hard-coded to the `postgresql.conf` file.

Commonly-used WAL settings

- `wal_level` - determines how much info is written to WAL; changing enables replication
  - default `minimal`, i.e. only enough to perform autorecovery; others include...
  - `archive` (send logs to another location),
  - `hot_standby` (for standby server with streaming replication),
  - `logical` (for streaming replication with replication slots)
  - note both default & enum-members are different in v11 
- `fsync` - on commit, flush transaction from WAL buffer to WAL segment (default on)
  - turn off to make db faster,
  - but silently and arbitrarily corrupted in event of system crash
  - ok to turn off if server is read-only (e.g. reporting/replica server)
- `wal_buffers` - size of buffer for WAL data (default -1/autotune; this signifies ~1/32 the size of `shared_buffers`)
- `min_wal_size` - this much WAL is always recycled for future use, even if system is idle (default 80mb)
- `max_wal_size` - WAL buffer size at which to begin checkpoint (default 1gb)
- `checkpoint_timeout` - max time between checkpoints (default 5min)
- `wal_compression` - compress WAL of full-page write (default off; make sure your `full_page_writes` param is also set to `true` if you turn this on...)

Commonly-used error-reporting and logging settings

- Where to log
  - `log_destination` - can use any combination of the below methods of storing logs
    - default is solely `stderr` (on the screen)
    - `csvlog` is useful for loading logs into programs
    - `syslog` (Unix) and `eventlog` (Windows) will likely require further system configuration
  - `logging_collector` - enables advanced logging features; required for `csvlog` (and below settings)
    - `log_directory` - must be present if `logging_collector` is `on`
    - `log_filename` - must be present if `logging_collector` is `on`
    - `log_file_mode` - on Unix systems, sets permissions for log files (default 0600)
    - `log_rotation_age` - automatically rotate logs after this much time (default 1d)
    - `log_rotation_size` - automatically rotate logs after hitting this size (default 10mb)
- What to log

  - `log_error_verbosity` - amount of information to log (default is `default`; alternatives are `terse` and `verbose`)
  - `log_line_prefix` - extra info to add (default is millisecond-timestamp, and pid)
  - `client_min_messages` - at this severity+, send messages to client screen (default `notice`)
  - `log_min_messages` - at this severity+, send messages to server log (default `warning`)
  - `log_min_error_statement` - at this severity+, send triggering statement alongside message to server log (default `error`)
  - `log_min_duration_statement` - when a statement runs this long, write it to server log, alongside duration (default `-1`/disabled)
  - `log_connections` - send successful connections to server log (default off)
  - `log_disconnections` - send some session info (including duration) to server log on disconnect (default off)
  - `log_checkpoints` - send checkpoints (and restartpoints) to server log (default off)
  - `log_temp_files` - send temporary files of this size or larger, in kb, to server logs (default `-1`/off; `0` is 'all files')
  - `log_statement` - send SQL statements of this sort to server logs
    - default is `none`; alternatives are...
    - `ddl` (data-definition statements, e.g. `create`, `alter`, `drop` statements)
    - `mod` (all `ddl`'s, plus data-modifying statements like `insert`, `update`, `delete`, `truncate`, `copy from`, etc)
    - `all` (...all statements)
  - `log_duration` - send duration of each completed statement to server log (default off)

Commonly-used background-writer settings

- `bgwriter_delay` - time between activity rounds (default 200ms)
- `bgwriter_lru_maxpages` - max number of pages (_well, in PostgreSQL parlance, 'buffers'_) that writer may clean per round (default 100)
- `bgwriter_lru_multiplier` - [number of new buffers needed by server processes in recent rounds] \* [this param] = [number of dirty buffers to be written, per round]; that is, `1.0` will 'just-in-time' write exactly number predicted; larger values cushion against spikes in demand (default `2.0`)
- Common tuning technique is to lower `bgwriter_delay`, or raise `bgwriter_lru_maxpages`

Commonly-used statement-behavior settings

- `search_path` - order in which schemas are searched when an object (_table, data type, function, etc._) is referenced by a simple name with no schema specified (default `"$user", public`)
- `default_tablespace` - default tablespace in which to create relations (tables and indexes) when a `CREATE` command does not explicitly specify one (default is blank/implicitly `pg_default`)
- `temp_tablespaces` - ditto above, but for temporary relations (default is blank/implicitly `pg_default`)
- `statement_timeout` - cancel any statement running longer than this (default `0`/off)

Commonly-used vacuum-cost settings

- `vacuum_cost_page_hit` - estimated cost of vacuuming a buffer inside the buffer pool (default 1)
- `vacuum_cost_page_miss` - estimated cost of vacuuming a buffer that must be read into the buffer pool (default 10)
- `vacuum_cost_page_dirty` - estimated cost of modifying a buffer that was previously clean (default 20)
- `vacuum_cost_limit` - limit at which the vacuum process will go to sleep (default 200)
- `vacuum_cost_delay` - length of time (in ms) the vacuum process will wait when cost limit is exceeded (default 0)

Commonly-used autovacuum settings

- `autovacuum` - controls whether autovacuum runs/starts worker processes to vacuum-analyze (default on)
- `log_autovacuum_min_duration` - send autovacuum worker-processes running longer than this to server logs; can be overridden for individual tables (default `-1`/off)
- `autovacuum_max_workers` - max number of autovacuum worker-processes running simultaneously (default 3)
- `autovacuum_work_mem` - max memory available to a each autovacuum worker-processes (default `-1`/use `maintenance_work_mem`)

Lab Exercise 1: change server parameters such that...

- server allows up to 200 connected users
- server reserves 10 connection slots for DBA's
- max time to complete client auth is 10 seconds

Lab Exercise 2: change server parameters such that...

- log all error messages to a file inside the `pg_log` dir
- log all queries taking more than 5 seconds; also log their duration
- log all users connecting to the db cluster

Lab Exercise 3: change server parameters such that...

- shared buffer is 256mb
- index cache is 512mb
- maintenance memory is 64mb
- temporary memory is 8m

Lab Exercise 4: change server parameters such that...

- max number of autovacuum workers is 6
- autovacuum scale factor is .3
- autovacuum cost limit is 100
- autovacuum threshold is 100
- autoanalyze threshold is 100

## Module 7. Creating and Managing Databases

Object hierarchy in Postgresql

- db cluster (owned by OS user, not db user -- same user who owns the relevant data dir on disk)
  - users/groups (roles), which can own any of the following:
  - tablespaces
  - db
    - catalogs
    - extensions
    - schema
      - table
      - view
      - sequence
      - functions
      - event triggers

second level (db, tablespaces, roles) are referred to as 'global objects'

- one user can own multiple db's
- note this means users aren't inside a given db
- one db can keep its objects in multiple tablespaces
- one tablespace can be used by multiple databases

third level are 'db objects'

- db contains various db dictionaries; in postgresql these are in a separate schema called 'catalogs'
- db contains one or more schemas

  - the physical architecture is that all the db objects (tables, views, etc) are directly inside the db's dir
  - however, the schema acts as a logical collection at one place of these 'user objects' (the fourth level)
  - one schema can be used by multiple users

- Side note: to start up with logging, you can run `pg_ctl -D cluster_dir/ -l logfile start`

Default objects on db-cluster initialization

- `postgres`, `template0`, and `template1` db's (in `psql`, use `\l`)
  - `template1` is the first to be created, and acts as the default model for all future db's
  - `template0` is a copy of `template1` that no one can connect to
  - `postgres` is db that we connect with
- one user, w/ same name as OS user you created the cluster with (in `psql`, use `\du`)
  - unless you passed the `-U` flag to `initdb`
  - this user is a Superuser, w/ all permissions and with `GRANT` ability
- `pg_default` and `pg_global` tablespaces (in `psql`, use `\db`)
  - `pg_default` always points to the `base` dir
  - `pg_global` always points to the `global` dir
- `public` is the default schema (in `psql`, use `\dn`)
  - As such, `CREATE TABLE foo` and `CREATE TABLE public.foo` are identical

DB's

- named collection of SQL objects (schemas, catalogs, extensions, tables, views, etc)
- schemas contain tables, functions, etc
- list all db's w/ either `\l` or `SELECT datname FROM pg_database;`
- destroyed with `DROP DATABASE` (also available as `bin/dropdb` shell executable)

Create db's with `CREATE DATABASE`

- common arguments include...
  - `OWNER` (for db owner; default is user executing command)
  - `TEMPLATE` (default is `template1`)
  - `ENCODING` (default is template's)
  - `TABLESPACE` (default is template's)
  - `CONNECTION LIMIT` (default is `-1`/none)
- to see all args, run `\h ${command}` e.g. `\h CREATE DATABASE`
- also available as `bin/createdb` utility shell executable
- common practice, immediately after creation:
  - run `REVOKE CONNECT ON DATABASE my_db FROM public`
  - ensures only people whom you `GRANT` authz to can later access it
  - well, and also the db-owner and any superuser

Users

- again, db users are completely separate from os users
- db users are global across the cluster
- each username must be unique
- each db connection must be requested by a specific user
- one (super)user provided by default
  - `postgres`/`enterprisedb` is the predefined superuser in default clusters
  - other/alternative superuser names can be specified during `initdb` (i.e. cluster creation)
  - this superuser will have all privileges from `GRANT OPTION`

Create users with `CREATE USER`

- common arguments include...
  - `SUPERUSER` or `NOSUPERUSER` (latter is default)
  - `CREATEDB` or `NOCREATEDB` (latter is default)
  - `CREATEROLE` or `NOCREATEROLE` (latter is default)
  - `LOGIN` or `NOLOGIN` (former is default, unless you use `CREATE ROLE`)
  - `PASSWORD ${string}` (default is `null`/always fail)
  - `CONNECTION LIMIT` (default is `-1`/none)
- also available as `bin/createuser` utility shell executable
- Side note: if you run EDB\*Plus, you can create users via Oracle-compatible commands (e.g. `CREATE USER foo identified by bar` for username:password combo)

Privileges

- Cluster level:
  - Granted to a user during `CREATE USER` (e.g. see several args above), or later via `ALTER USER`
  - Granted by superuser
- Object level:
  - Granted to a user via `GRANT`
  - Allow user to perform specific action on specific db object (e.g. table, view, sequence, etc)
  - Granted by superuser, by object's owner, or by another user who's been `GRANT`ed the ability to (in turn) grant that privilege (via `WITH GRANT OPTION`)

`GRANT` statements

- Can give permissions **for** tablespaces, databases, schemas, tables, sequences, domains, functions... or any other db object in the cluster.
- Can give permissions **to** users, groups, or roles
- Can also provide a specific role to a specific user
- Some examples:

```postgresql
GRANT CONNECT ON DATABASE my_db TO user_01;

GRANT USAGE ON SCHEMA public TO user_01;

GRANT SELECT, INSERT ON my_table TO user_01;

GRANT ALL ON my_table TO user_02;

REVOKE SELECT, INSERT ON my_table FROM user_01;

REVOKE CONNECT ON DATABASE my_db FROM user_01;
```

`REVOKE` statements

- Can remove permissions **for** tablespaces, databases, schemas, tables, sequences, domains, functions... or any other db object in the cluster.
- Can use `REVOKE GRANT OPTION FOR` to remove only the in-turn-granting privileges (but not the privilege itself)

Schemas

- logical collection of db objects
- owned by (at least) one user
- allows you to assign permissions more broadly than table-by-table
- db can contain 1+ schemas
- all db's contain a `public` schema
- reasons to use schemas:
  - allow many users to use the same db object w/o interfering w/ each other (namespacing)
  - organize db objects into logical groups for ease of management
  - separate third-party applications to prevent namespace collisions
- Example use:

```postgresql
CREATE DATABASE udb;

CREATE USER u1 PASSWORD 'foo';
CREATE USER u2 PASSWORD 'bar';

-- by default, don't let anyone connect to new db
REVOKE CONNECT ON DATABASE udb FROM public ;

\c udb

-- by default, don't let anyone interact w/ new db's public schema
REVOKE ALL ON SCHEMA public FROM public;

-- give u1 a space to play
CREATE SCHEMA u1 AUTHORIZATION u1;
-- it's common to create a schema with the same name as its user, so as to keep search_path mods straightforward

-- let u2 read objects in public, but not interact with them
GRANT USAGE ON SCHEMA u1 TO u2;

-- got to let 'em both access in the first place
GRANT CONNECT ON DATABASE udb TO u1, u2;
```

Schema search path

- We usually just write the table name directly, e.g. `select * from employees;`, and let the server resolve the schema
- `search_path` config param can be updated (by e.g. `SET search_path TO my_schema, another_schema, public;`
- This list provides the sequence of schemas in which the server looks up tables.

Lab Exercise 1

- A new website is to be developed for an online music store.
- Create a db user `edbuser` in your existing cluster
- Create an `edbstore` db with ownership by `edbuser`
- Log in to the `edbstore` db as `edbuser`
- Create the `edbuser` schema
- Log out of `psql`

Lab Exercise 2

- You want to separate all business-transaction tables into 'buy' and 'sell' schemas
- Create an `ebuy` user with password `lion`
- Create an `ebuy` schema, usable by the `ebuy` user
- Log in as `ebuy`
- Create the `sample1` table
- Confirm that the table belongs to the `ebuy` schema

Lab Exercise 3

- EnterpriseDB provided an `edbstore.sql` file
- Download the `edbstore.sql` file (e.g. inside default db cluster/dir)
- Place it somewhere accessible to the `postgres` user, and ensure it's owned by them (`chown` if needed)
- Run the `psql` command with the `-f path/to/edbstore.sql` option to execute the file, installing the sample objects therein
- Password for `edbuser` is, by default, `edbuser` (unless you changed it)
  - _You used:_ `~ $ psql -f baby_store.sql -d edbstore -U edbuser -W` //pwd=edbuser

Lab Exercise 4

- Retrieve data re: new db objects
- Get list of all db's using a SQL query
- Get list of all db's using a psql meta-command
- Get list of all tables in `edbstore` db
- Get list of each table's schema(s), and owner(s)

## Module 8. User Tools: Command Line Interfaces

The `psql` command can take the options of:

- `-d` (if not specified, will use `PGDATABASE` envvar or default: db with same name as cluster-owner OS user... which by default will itself be the same as the OS user),
- `-h` (if not specified, will use `PGHOST` envvar or `localhost` default),
- `-p` (if not specified, will use `PGPORT` envvar or `5432` default), and
- `-U` (if not specified, will use `PGUSER` envvar or default: user with same name as cluster-owner... which by default will itself be the same as the OS user)

- Inside `psql`, the `SQL` commands operate on the server; the `\` metacommands only affect psql (_they bring information from the server, but don't affect the server itself_)

Some commands accept regex-esque patterns:

- `*` and `?` are wildcards, e.g. `\dt a*` will provide all tables beginning with `a`
- `"fooBar?"` specifies the exact name `fooBar?`, ignoring special characters and preserving case
  - This is useful if you have tables/objects with capital chars, as psql lowercases everything before sending it to the server
- `+` will provide extra information (on e.g. `\d` commands), e.g. relation structure-details, table-column comments, any OID, etc

On `psql` startup:

- `-X` prevents `psql` from executing any commands in `$HOME/.psqlrc` (_which otherwise is a useful file if you want to run a set of commands any time a user connects_)
- `-f ${FILENAME}` will execute any commands inside `${FILENAME}`, then exit
- `-c ${COMMAND}` will execute the SQL/internal `${COMMAND}`command, then exit
- `-o ${FILENAME}` will send all query output (except for errors) to the file (which may be a pipe), instead of displaying it on the screen
- `-q` runs quietly (_no messages, only query output_)

Key combinations inside `psql`:

- up- and down-arrows cycle though command history
- tab-completion exists for sql commands and (to some degree) table and field names (UNIX only); disabled with `-n`
- `\s` shows command history
- `\s ${FILENAME}` saves command history to the file
- `\e` lets you edit the previous query ("query buffer"), then executes it
- `\e ${FILENAME}` edits the file, then executes it
- `\w ${FILENAME}` will save the previous query to the file
- `\o ${FILENAME}` will send all following query output (except for errors) to the file (which may be a pipe), instead of displaying it on the screen
- `\g ${FILENAME}` executes the previous query, then sends its output (except for errors) to the file (which may be a pipe)

`psql` variable substitution

- variables are simple k:v pairs
- can be letters, digits, and underscores
- note `\set` is completely unrelated to the SQL `SET` command
- sample use:

```postgresql
\set name youngSuss ---

\echo :name
--- youngSuss

\unset :name
```

`psql` special variables (e.g. `\set AUTOCOMMIT off`)

- `AUTOCOMMIT` -- default `on`; when `off`, SQL commands are not committed until you explicitly issue `COMMIT` or `END`
- `ENCODING` -- current client character set encoding; default `UTF8`
- `HISTFILE` -- The filename for the history list. No default; instead, taken from `PSQL_HISTORY` or `~/.psql_history`
- `ON_ERROR_ROLLBACK` -- default `off`; when `on` (or `interactive`), errors in a transaction block don't stop-and-rollback the transaction (or only when in interactive transactions, i.e. not being read from a script)
- `ON_ERROR_STOP` -- default `off`; when `on`, errors will immediately terminate any currently-running scripts (the top-level script, if any, and any other scripts which it may have in invoked.)
- `PROMPT1` -- the normal prompt that is issued when psql requests a new command (`PROMPT2` _is issued when more input is expected during command entry, for example because the command was not terminated with a semicolon or a quote was not closed._)
- `VERBOSITY` -- the verbosity of error reports

More key combinations inside `psql`:

- `\conninfo` provides (_db, user, socket, port_) info about the current connection
- `\?` provides information about psql
- `\cd [path/to/dir]` is same as in bash; useful with `\! pwd`
- `\! [command]` executes the specified command; if none is provide, it opens a new Unix shell

EDB*Plus is the CLI for EDB Postgres Advanced Server; it also can run Oracle SQL*Plus commands

Lab Exercise 1

- Connect to a database using `psql`.
- Switch databases.
- Describe the `customers` table.
- Describe the `customers` table, including description.
- List all databases.
- List all schemas.
- List all tablespaces.
- Execute a SQL statement, stating the output to a file.
- Do the same thing, just saving data, not the column headers.
- Create a script via another method, and execute from `psql`.
- Turn on the expanded table formatting mode.
- List tables, views, and sequences with their associated access privileges.
- Which metacommand displays the SQL text for a function?
- View the current working directory.

## Module 9. GUI Tools

Two common connection-error messages:

- `Could not connect to server - connection refused` stems from the server not running, or the server not being configured to accept external TCP/IP requests (via e.g. `listen_addresses` server param.)
- `FATAL: no pg_hba.conf entry` stems from the client not being detected as a legal user for the db (the server, however, is being successfully contacted over the network)

A _domain_ is a custom datatype that you create from adding a check-constraint to a preexisting datatype. (Normally it's a list of values from which you take a value.)

_Trigger functions_ have a fixed return type of `trigger`; _procedures_ have a fixed return type of `void` (i.e. they return nothing.)

_Sequences_ are used to automatically generated (only numeric) values in a column from other data inputs.

One reason for tablespaces: storing your indexes not in the data-dir, but on a "fast medium."

"PEM" here means "Postgres Enterprise Manager" (_another EDB tool._)

- Basically the closed-source pgAdmin
- Supports regular PostgreSQL and PPAS
- Dashboard can report on multiple db instances
- Can collect statistics on both (multiple db instances) and on (the OS'es on which they're running)
- Graphical debugger w/ in SQL IDE
- Capacity planning (forecasting future resource needs)
- Audit and Log Managers (for structuring audit/error logs)
- SQL profiler (for e.g. informing you about missing and potentially-useful indexes)

Lab Exercise - 1

- Open pgAdmin and connect to the default db cluster
- Create a user named `pguser`
- Create a db named `pgdb` (owned by `pguser`)
- Change that db's connection limit to 2
- Create a schema named `pguser` (inside `pgdb`, w/ `pguser` as schema owner)

Lab Exercise - 2

- Create the table `Teams` with columns `TeamID`, `TeamName`, `TeamRatings`
- Create a sequence `seq_teamid` with start value 1 and incrementation by 1
- Change the default vaule for the `TeamID` column to `seq_teamid`
- Add a constraint that `TeamRatings` be between 1 and 10
- Add an index on the `TeamID` as primary key
- Add a view, `vw_top_teams`, that displays all teams in ascending order of `TeamRatings`

Lab Exercise - 3

- View all rows in the `Teams` table
- Using the Edit Data window, insert the following rows:

```CSV
TeamName,TeamRatings
Oilers,1
Rangers,6
Canucks,8
Blackhawks,5
Bruins,2
```

Lab Exercise - 4

- Connect to `pgdb` with the query tool
- Using the graphical query builder, retrieve all rows in the `Teams` table
- Using the graphical query builder, retrieve all rows in the `vw_top_teams` view

## Module 10. Security

Secure access is a two-step process

- authentication ensures that a user is who they claim to be
- authorization ensures that an (authenticated) user has access to only the data for which they've been granted privileges

Levels of security:

- server/application
  - `postmaster` verifies that client ip is present in `pg_hba.conf` file
  - based on that, establishes which authentication method to use
- database
  - user/password - now that we've established that the user exists, is this connecting client that user?
  - once they've proven that, do they have the `connect` privilege?
  - and do they the relevant schema permissions?
- object
  - table-level privileges
  - `grant`/`revoke`

`pg_hba.conf` access control:

- host-based access-control file
- located in the cluster data dir (or, in yours, `/usr/local/var/postgres`)
- It's read at startup (_so any change requires restarting the cluster_)
- It contains one record per line
- It's read from top to bottom (but only runs the first matching entry)
- Each record specifies the:
  - connection type [local, host, hostssl, hostnossl];
  - db name [${any_db_name}, ${comma-separated_list_of_db's}, all, replication];
  - user name [${any_db_user_name}, ${comma-separated_list_of_users}, all];
  - client IP (note the number after the `/` is how many bits must match, bits to the right of which must be `0`, e.g. `172.20.143.89/32` for a single host, or `172.20.143.0/24` for a small network, or `10.6.0.0/16` for a larger one)
  - method of authentication [trust, reject, md5, password, scram-sha-256, gss, sspi, krb5, ident, peer, pam, ldap, radius, cert];
- Hostnames, IPv4, and IPv6 are all supported
- IP ranges are also supported

Row-Level Security (RLS):

- fine-grained access control within a table
- `grant` and `revoke` can be used at table-level
- by default, all table rows are visible
- once RLS is enabled on a table, all queries must go through the security policy
- Example:

```postgresql
CREATE TABLE accounts (manager text, company text, contact_email text);

ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- policy that allows managers to view the rows of their accounts:
CREATE POLICY account_managers ON accounts TO managers USING (manager = current_user);
```

SQL/Protect is a module (via StackBuilder, available for PPAS & PostgreSQL) that adds another security layer, managed by the DBA, to further protect against SQL-injection attacks [looking for e.g. empty DML, SQL tautology, utility commands, unauthorized relations, etc].

EDBWrap is comparable to Oracle's wrap capability: it's a utility that obfuscates (db functions' source code) from the client

Lab Exercise - 1

- You have a server with two network cards
  - `192.168.30.10` is used for the internal LAN
  - `10.4.2.10` is used by the web serverr to connect users from an external network
- Configure your DB to accept TCP/IP connections from both internal/external users

Lab Exercise - 2

- A developer shows you the following error: `psql: could not connect to server: Connection refused(0x0000274D/10061) Is the server running on host 192.168.30.22 and accepting TCP/IP connections on pot 5432?`
- Predict the problem and suggest a solution

Lab Exercise - 3

- A new developer has joined the team, with ID #89
- Create a new user with name/password `dev89 / password89`
- Assign that user the privileges to connect to the `edbstore` db and view all tables

Lab Exercise - 4

- A new developer has joined the business; he has the IP address of `192.168.30.89`
- He's getting the following error when connecting: `FATAL: no pg_hba.conf entry for host "1.1.1.89", user "dev89", database "edbstore", SSL off`
- Configure your server so that the new developer can connect from his machine

## Module 11. SQL Primer

To see all datatypes on the cluster, run `\dT *` (w/o asterisk, will only display those in `public` schema)

`text` datatype good for huge amounts of characters; similar to `clob` datatype on OracleDB

PPAS also offers the `clob` (character large object), `blob` (binary large object), `varchar2`, `number`, and `xmltype` datatypes, for OracleDB compatibility.

SQL Language

- Data definition language
  - `create` - add db objects (tables, views, sequences, etc)
  - `alter` - modify existing objects
  - `drop` - remove existing objects
  - `truncate` - remove data off a table w/o changing structure
- Data manipulation language
  - `insert`
  - `update`
  - `delete`
  - `select`
- Data control language
  - `grant`
  - `revoke`
- Transaction control language (necessary for atomicity)
  - `commit`
  - `rollback`
  - `savepoint`
  - `set transaction`

`CREATE TABLE` options:

- `CREATE TEMPORARY TABLE foo` will remove `foo` at end of session
- `CREATE UNLOGGED TABLE foo` will tell WAL logging to ignore the table
- `CREATE TABLE foo TABLESPACE bar` will put `foo`'s data files in the directory pointed to by `bar`, rather than `pg_default`
- `CREATE TABLE foo USING INDEX TABLESPACE bar` behaves similarly, but for the files of any indexes on the table
- `CREATE TABLE foo INHERITS quux` will structure `foo` as `quux`, and ensure that any changes to `quux` will automatically also occur on `foo`
- `CREATE TABLE foo LIKE bla` will only structure `foo` as `bla` (without the later automatic parent:child relationship of `INHERITS`)

Constraints enforce data integrity:

- _entity integrity_ (ensures each record is uniquely identified) enforced by primary keys
- _domain integrity_ (ensures value in table is taken from specific list of values) enforced by check constraints
- _referential integrity_ (ensures value in table is present in other table) enforced foreign keys

Types of constraints:

- `NOT NULL` prevents you from inserting `null` values in the column
- `UNIQUE` prevents you from inserting duplicate values in the column (but does allow multiple `null` values, as `null` is never equal to `null`.)
- `CHECK` ensures the value is a member of a list (or satisfies some predicate condition)
- `PRIMARY KEY` by implication include `UNIQUE` and `NOT NULL` checks; by default, it creates an index on the field.
- `FOREIGN KEY` is... yep, a foreign key.

Constraints can be added via `CREATE TABLE`, or `ALTER TABLE`.

When declared, constraints are `NOT DEFERRABLE`; they can be set to `DEFERRABLE` in order for them not to be checked until end of the transaction, at commit.

`ALTER TABLE` can...
- add, alter, or drop a column
- add, alter, or drop a constraint
- set a schema
- enable or disable triggers
- enable or disable rules
- set/unset logging
- change owner

For 'Upserts', the special `excluded` table is used to reference values originally proposed for insertion:
```postgresql
INSERT INTO distributors (did, dname)
    VALUES (5, 'Gizmo Transglobal'), (6, 'Associated Computing, Inc')
    ON CONFLICT (did) DO UPDATE SET dname = EXCLUDED.dname;
```

Views
- virtual tables, for hiding complex queries
- simple views update automatically
- views can contain both updateable and non-updateable columns

Note for `CREATE VIEW ${view_name} AS ${query}`, the query is run every time the view is referenced.
         
To provide a persistent snapshot, instead use `CREATE MATERIALIZED VIEW ${view_name} AS ${query}` (alongside `REFRESH MATERIALIZED VIEW` for when you'd like to update it.)

Sequences
- `CREATE SEQUENCE` creates a special single-row table called a '_sequence object_'
- They're commonly used to generate unique identifiers for rows of a table
- You can pass it `CACHE ${int_number}` to preallocate and store in-memory `${int_number}` values for faster access
- _Sequence functions_ provide multiuser-safe methods for obtaining successive sequence values from a sequence object
    - `currval('${schema.sequence}')` returns the sequence's current value
    - `nextval('${schema.sequence}')` advances the sequence and returns a  new value
    - `setval('${schema.sequence}', ${bigint})` sets the sequence's current value

Quotes in SQL
- use single-quotes for nonnumeric values
- use dollar-quotes for nonnumeric values with lots of strings, e.g. `$$Dianne's horse$$`
- use double-quotes for db objects that 
    - clash with SQL keywords (a table named `"select"`);
    - contain mixed cases (a table named `"FooBaR"`);
    - contain chars other than [a-z, 0-9, underscore] (a table named `my awesome data!`);

SQL functions
- usable in `SELECT` statements and `WHERE` clauses
- string functions
- datatype-formatting functions
- date & time functions
- aggregate functions

Indexes (common way to improve performance)
- B-tree is default
- Hash 
    - only used when `WHERE` clause contains a simple comparison using the “=“ operator; 
    - discouraged because they are not crash safe
- Indexes on expressions
    - use when quick retrieval speed is needed on an often-used expression 
    - `INSERT` and `UPDATE` statements will be slower
- Partial index 
    – indexes only rows that satisfy the `WHERE` clause 
    - the `WHERE` clause need not include the indexed column
    - a query must include the same `WHERE` clause to use the partial index.
- Block range index (BRIN) handles very large tables in which certain columns have some natural correlation with the physical location within the table.

Lab Exercise - 1 
- Initiate a `psql` session
- T/F: `psql` commands access the db
- T/F: `SELECT ename, job, sal AS Salary FROM emp;` executes successfully.
- T/F: `SELECT * FROM emp;` executes successfully.
- Fix the following statement: `SELECT empno, ename, sal * 12 ANNUAL SALARY FROM emp;`
  - `as`, and double-quote `"ANNUAL SALARY"` 

Lab Exercise - 2
- The HR department needs a report of all employees. Write a query to display the name, department number, and department name for all employees.
  - `SELECT e.ename, e.deptno, d.dname FROM emp e JOIN dept d ON e.deptno = d.deptno;`
- Create a report to display employee names and employee numbers along with their manager’s name and manager’s number. Label the columns Employee, Emp#, Manager and Mgr#, respectively.
  - `SELECT e.ename AS Employee, e.empno AS "Emp#", m.ename AS Manager, m.empno AS "Mgr#" FROM emp e JOIN emp m ON e.mgr = m.empno;`
- Create a report for the HR department that displays employee names, department numbers, and all the employees who work in the same department as a given employee. Give each column an appropriate label.
  - `SELECT e.ename AS Employee, e.deptno AS Dept, array_agg(c.ename) AS Colleagues FROM emp e JOIN emp c ON (e.deptno = c.deptno AND e.ename != c.ename) GROUP BY e.ename, e.deptno;`

Lab Exercise - 3
- Write a query that displays the (employee number and name of all employees who work in the department with) any employee whose name contains an E (Use a subquery.)
  - `SELECT e.ename AS Employee, e.deptno AS Dept, array_agg(c.ename) AS Colleagues FROM emp e JOIN emp c ON (e.deptno = c.deptno AND e.ename != c.ename AND e.name like '%E%') GROUP BY e.ename, e.deptno;`
- Change the name of the employee 7566 to “Drexler“
  - `UPDATE emp SET ename = 'DREXLER' WHERE empno=7566;`
- Change the salary to $1000 for all employees with a salary less than $900
  - `UPDATE emp SET sal = '1000.00' WHERE sal < 900.00;`
- Verify your changes to the table
- Delete “Miller” from the EMP table
  - `DELETE FROM emp WHERE ename = 'MILLER';`

Lab Exercise - 4
- Create the EMP2 table based on the structure of the EMP table; include only the empno, ename, sal, and deptno columns. Name the columns and your new table ID, first_name, salary, and DEPT_ID, respectively.
  -`CREATE TABLE emp2 AS SELECT empno AS id, ename AS last_name, sal AS salary, deptno AS dept_id FROM emp where false;`
- The staff in the HR department want a view called EMPVU based on the employee numbers, employee names, and department numbers from the EMP table. I want to heading for the employee name to be “employee“
  - `CREATE VIEW empvu AS SELECT ename as employee, empno, deptno FROM emp;`
- Use the EMPVU view to write a query for the sales department to display all employee names and department numbers.
  - `SELECT employee, deptno FROM empvu;`

Lab Exercise - 5
- Create a sequence that can be used with the primary key column of the DEPT table. The sequence should start at 60 and have a maximum value of 200. Have your sequence increment by 10. Name the sequence dept_id_seq
  - `CREATE SEQUENCE dept_id_seq MINVALUE 60 MAXVALUE 200 INCREMENT BY 10 OWNED BY dept.deptno;`
  - `SELECT setval('dept_id_seq', 60);`
- To test your sequence, write a script to insert two rows into the DEPT table
  - `INSERT INTO dept (deptno, dname, loc) VALUES (nextval('dept_id_seq'), 'MARKETING', 'LOS ANGELES'), (nextval('dept_id_seq'), 'HR', 'TULSA');`
- Create an index on the deptno column of the DEPT table.
  - `CREATE UNIQUE INDEX deptno_idx ON dept (deptno);`
- Create and test a partial index.
  - `CREATE INDEX specboi_idx ON emp (empno) WHERE job != 'SALESMAN';`
  - `EXPLAIN SELECT empno FROM emp;` (_...assuming you added like 10k more people, salesmen and non_)

## Module 12. Backup Recovery and Point-in-Time Recovery (PITR)

There are three fundamentally different approaches to backing up PG data.

1. SQL dump
    - Generates a text file with all the SQL commands necessary to completely recreate/regenerate the entirety of the database
    - `pg_dump` does not block readers or writers (_no locking while it runs_)
    - `pg_dump` does not operate with special permissions (_user must have permission to read metadata, so usually run it as superuser_)
    - `pg_dump` represents a snapshot of the database as of the time it began running
    - `pg_dump` can be run with:
        - `-f ${path/to/filename}` to send the dump to a specified file
        - `-a` to dump the data only (not data-definitions/schema)
        - `-s` to dump the data-definitions only (not the data itself)
        - `-n` to only dump the specified schema 
        - `-t` to only dump the specified table
        - `-v` to provide a verbose dump
    - Use `pg_dumpall > path/to/filename` to dump entire cluster
        - This will also dump non-db global objects (_roles, tablespaces_)
        - `-a -s -v` options are the same as `pg_dump`
        - `-g` dumps only (non-db) global objects
        - `-r` dumps only roles
        - `-c` will 'clean' (drop) db's with the same name before recreating from dump
        - `-O` sets object ownership of db's to (the user running `pg_restore`)
        - `-x` keeps ownership, but skips (`GRANT`/`RESTORE`) privileges
    - Dump files can run into OS's maximum-filesize limits; there are two common solutions to this
        - You can use a compression program: `pg_dump dbname | gzip > dump_filename.gz`
        - You can split the output into smaller files: `pg_dump dbname | split -b 1m - filename`
    - There are two ways to restore a db from a dump: 
        - `$ psql dbname < filename.txt` only works for plaintext files, and requires you to create the db `dbname` first
        - `=# pg_restore ${path/to/file/or/dir} -d db_name` works inside psql
            - if no `-d` is given, use `-C` to rebuild the db itself
            - otherwise, takes the same options as `pg_dump` (save `-f`) 

2. Filesystem-level backup (of entire cluster)
    - Directly copy the files that PostgreSQL uses for storing data in the db.
    - You can use whatever method you prefer for the profile backups, e.g. 
        - `tar -cf backup.tar /usr/local/var/postgres/base`, or
        - `cp -rp /usr/local/var/postgres/base ../my_cluster_copy` (`-r` for all directories' contents, and '`-p` for maintaining privileges) 
    - The database server must be shut down in order to get a usable backup.
    - Easily restorable: copy to data dir, then restart server. 
    - Filesystem backups only work for complete restoration of the entire cluster (_not for a single db._)
    - Filesystem snapshots work for live servers.

3. Continuous archiving
    - PostgreSQL maintains (16mb) WAL files for all transactions in the `pg_xlog` directory (`pg_wal` in v10+)
    - PostgreSQL automatically maintains the `pg_wal` dir's files
        - Default is 3 such WAL files, per `checkpoint_segments` (_which apparently doesn't exist in v10+_) 
        - When WAL dir is full, PostgreSQL flushes/archives the first file and creates a new, fourth, file 
    - Continuous archiving keeps a copy of the switched/archived WAL file, for later PITR.
    - It also enables on-line filesystem backups of a cluster (_i.e. w/o shutting down the server_)
    - Parameter requirements:
        - `wal_level` must be set to (_at least_) `archive` (`replica` in v10+)
        - `archive_mode` must be set to `on` or `always`
        - Either adding an `archive_command`, or turning on the `pg_receivewal` process  
            - `archive_command` must be set to e.g. `cp %p /path/to/archive/dir/%f'`
                - `%p` is the absolute path to the WAL file
                - `%f` is the unique filename to be given to the archived WAL-file
            - `pg_receivexlog` (`pg_receivewal` in 10+)
                - Streams transaction logs from a running cluster, e.g. `pg_receivewal -D path/to/archive/dir`
                - Uses a streaming replication protocol (not TCP/IP) to write to a local directory. 
                - As it streams in real time, can be alternative to `archive_command` for PITR.
                - In addition, doesn't wait for segments to complete (like `archive_command`)
    - Once continuous archiving is set up, you can create a base backup via two methods:
        - Base backup with low-level API
            - `SELECT pg_start_backup('any_label_here')`
            - Perform the backup w/ e.g.`tar` or `cp`  (_note you don't need to shutdown the server here_) 
            - `SELECT pg_stop_backup()`
        - `pg_basebackup` tool
            - This tool makes a binary copy of the db cluster files 
            - Common example: `pg_basebackup -D path/to/archive/dir`
            - It also uses a streaming replication protocol (not TCP/IP) to write to a local directory.
            - Prior, need to ensure that `pg_hba.conf` allows `host replication dbname user trust` or the like
            - Need to set `max_wal_senders` high enough to leave one session for backup and one for WAL streaming (if used), so 2-3
            - Need also to set `wal_level`, `archive_mode`, and `archive_command` as above
            - Options:
                - `-Fp` writes files as plaintext; `-Ft` as tar 
                - `-Xf` and `-Xs` will include the WAL files in the backup (via fetching at the end of the backup, or streaming)
                - `-z` allows gzip compression 
                - `-h` and `-p` specify the host and port of cluster to back up
                - `-P` enables progress reporting
        
Point-in-Time Recovery
- Combines a file-system-level backup with backup of the WAL files
    - restores the file system backup, then
    - replays from the backed-up WAL files, in order to 
    - bring the system to a current state
- Steps to perform:
    - Stop the server
    - If you have space, copy 1) the (broken) cluster data-dir and 2) any tablespaces 
        - If you do not have enough space, you at least save the contents of the cluster's `pg_wal` subdirectory (_it might contain logs which were not archived_)
    - Remove all files and subdirectories under 1) the cluster data-dir and 2) the root directories of any tablespaces
    - Restore the database files from your file system backup. 
        - Verify that they are restored with the right ownership (the database system-user, not `root`) and with the right permissions. 
        - If you are using tablespaces, verify that the symbolic links in `pg_tblspc/` were correctly restored.
    - Remove any files present in `pg_wal/` (_these came from the file system backup and are therefore obsolete_) 
    - If you have unarchived WAL segment files that you saved earlier, copy them into `pg_wal/
    - Create a recovery command file `recovery.conf` in the cluster data directory
        - You might also want to temporarily modify `pg_hba.conf` to prevent ordinary users from connecting 
    - Start the server. 
        - The server will go into recovery mode and proceed to read through the archived WAL files it needs. 
        - Should the recovery be terminated because of an external error, the server can simply be restarted. 
        - Upon completion of the recovery process, the server will rename `recovery.conf` to `recovery.done` (to prevent accidentally re-entering recovery mode later)
        - It will then commence normal database operations.
- Inside `recovery.conf`: 
    - You must set `restore_command` to e.g. `'cp /path/to/archive/dir/%f "%p"'`
    - By default, recovery will recover to the end of the WAL log; (at most one of) the following parameters can be specified in `recovery.conf` to set an earlier stopping point. 
        - `recovery_target` if set to `immediate`, ends recovery as early as possible 
        - `recovery_target_name` can be set to a restore-point (created earlier via `pg_create_restore_point`)
        - `recovery_target_time` can be set to a timestamp
        - `recovery_target_xid` can be set to a transaction ID
    - Other settings include: 
        - `recovery_target_inclusive` determines whether (`true`) or not (`false`) to stop after the recovery target
        - `recovery_target_timeline` is used 
        - `recovery_target_action` determines action to take after reaching target: `pause` (default; allows queries against db to check if target is desirable point for recovery); `promote` (finish recovery process and start to accept connections); and `shutdown` (stop server)  

BART (EDB Backup And Recovery Tool) is EDB's centralized management interface for running multiple backups/recoveries.

Lab Exercise - 1
- The `EDBstore` website database is all set up, and as a DBA you need to plan a proper backup strategy and implement it.
- As the root user, create a `/pgbackup` folder and assign ownership to the `postgres` user using the `chown` utility.
- Take a full database dump of the `edbstore` database with the `pg_dump` utility.
- The dump should be in plain text format.
- Name the dump file `edbstore_full.sql` and store it in the `/pgbackup` directory.
  - `Desktop $ pg_dump edbstore > pgbackup/edbstore_full.sql`

Lab Exercise - 2
- Take a dump of the `edbuser` schema from the `edbstore` database name the file `edbuser_schema.sql`
  - `Desktop $ pg_dump -d edbstore -n 'edbstore' > pgbackup/edbuser_schema.sql`
- Take a data-only dump the store database, disable all triggers for faster restore, use the `INSERT` command instead of `COPY`, and name the file  `edbstore_data.sql`
  - `Desktop $ pg_dump -d edbstore -a --disable-triggers --inserts > pgbackup/edbstore_data.sql`
- Take a full dump of the `customers` table and name the file `edbstore_customers.sql`
  - `Desktop $ pg_dump -d edbstore -t 'edbuser.customers' > pgbackup/edbstore_customers.sql`

Lab Exercise - 3
- Take a full `edbstore` database dump in compressed format using the `pg_dump` utility; name the file `edbstore_full_fc.dmp`
  - `Desktop $ pg_dump -d edbstore -Fc > pgbackup/edbstore_full_fc.dmp`
- Take a full database-cluster dump using `pg_dumpall`. Remember `pg_dumpall` supports only plain text format; name it `edbdata.sql`
  - `Desktop $ pg_dumpall > pgbackup/edbdata.sql`

Lab Exercise - 4
- In this exercise you will restore a database.
- Drop the `edbstore` database.
  - `\c postgres`
  - `DROP DATABASE edbstore;`
- Create a new `edbstore` database with the `edbstore` owner.
  - `\c postgres postgres`
  - `CREATE DATABASE edbstore WITH OWNER = edbuser;`
- Restore the full dump from `edbstore_full.sql`; verify all objects and their ownership.
  - `Desktop $ psql -d edbstore -U edbuser -W -f pgbackup/edbstore_full.sql`
- Drop the `edbstore` database.
- Create a new `edbstore` database with the `edbstore` owner.
- Restore the full dump from `edbstore_full_fc.dmp`; verify all objects and their ownership.
  - `Desktop $ pg_restore -C -d postgres pgbackup/edbstore_full_fc.dmp`

Lab Exercise - 5
- Implement archiving.
- Create a directory `/archive` and give ownership to the `postgres` user.
- Configure the cluster to run in archive mode; set the archive log location to `/archive`
  - `wal_level` already set to `replica`
  - set `archive_mode` to `on`; `su - postgres` to shut down && restart server (can't use solely `select pg_reload_conf();`)
  - set `archive_command` to `'test ! -f /Users/ypaulsussman/Desktop/pgarchive/%f && cp %p /Users/ypaulsussman/Desktop/pgarchive/%f'`; `su - postgres` to shut down && restart server (can't use solely `select pg_reload_conf();`)
- Take a full online base backup of your cluster in the `/pgbackup` directory using the `pg_basebackup` utility
  - `Desktop $ pg_basebackup -D ./pgarchive`

Lab Exercise - 6
- A cluster can encounter different types of failures. Recover your database from the following:
- The loss of the `postgresql.conf` file.
- The loss of the `locations` table data file.
- They mistakenly-dropped `cust_hist` table.

## Module 13. Routine Maintenance Tasks

Automatic db maintenance 
- Data files become fragmented as data is modified and deleted; maintenance helps bring the db back up to speed.
- More importantly, it saves the database from transaction ID wraparound failures.
- Maintenance thresholds can be configured in `postgresql.conf`
- Manual scripts can be written to keep an eye on stat tables like `pg_stat_user_tables`
- Maintenance commands:
    - `VACUUM`
    - `ANALYZE` 
    - `REINDEX`
    - `CLUSTER`

Optimizer statistics 
- vital to query planning
- not updated in real-time
- collect information for relations (including size, row counts, average row size, and row sampling)
- stored permanently in catalog tables
- maintenance command `ANALYZE` updates these statistics
- PEM client can set thresholds to alert when statistics are not collected in time

Data fragmentation and bloat
- data is stored in data file pages
- `UPDATE` or `DELETE` of a row does not immediately remove the row from the on-disk page
- eventually this row space becomes obsolete, causiing fragmentation and bloat
- PEM Alert can be set to provide notifications of this

Preventing transaction ID wraparound failures
- MVCC depends on transaction ID numbers
- Transaction IDs have limited size (32 bits)
- A cluster that runs for a long time (more than 4 billion transactions) will suffer transaction ID wraparound
- This causes catastrophic data loss
- To avoid this, every table in the database must be vacuumed at least once for every 2 billion transactions

The visibility map
- Each heap relation has a visibility map which keeps track of which pages contain only tuples
- It is stored at `${relfilenode}_vm`
- It helps `VACUUM` to determine whether pages contain dead rows
- It can also be used by index-only scans to answer queries
- The `VACUUM` command updates the visibility map
- The visibility map is vastly smaller, so it can be cached easily

Routine vacuuming
- Obsolete rows can be removed or reused using vacuuming
- This helps shrink data file size
- Vacuuming can be automated using `autovacuum`
- The `VACUUM` command locks tables in access-exclusive mode.
- Long-running transactions may block vacuuming, so it should be done during low-usage times

Vacuuming commands
- When executed, the `VACUUM` command:
    - Can recover or reuse disk space occupied by obsolete rows
    - Updates data statistics
    - Updates the visibility map, which speeds up index-only scans
    - Protects against loss of very old data due to transaction ID wraparound
- The `VACUUM` command can run in two modes
    - `VACUUM`
        - Removes dead rows and marks the space available for future use 
        - Does not return the space to the OS
        - Space is reclaimed if obsolete rows are at the end of the table
    - `VACUUM FULL`
        - More aggressive algorithm.
        - Compacts tables by writing a completely new version of the table file, with no dead space
        - Takes more time
        - Requires extra disk space for the new copy of the table, until the operation completes

Vacuum freeze
- `VACUUM FREEZE` will mark rows as frozen
- Postgres reserves a special XID, `FrozenTransactionID` 
- `FrozenTransactionID` is always considered older than every normal XID
- `VACUUM FREEZE` replaces transaction IDs with `FrozenTransactionID`, so rows will appear to be "in the past"
- `vacuum_freeze_min_age` controls when the row will be frozen
- `VACUUM` normally skips pages without dead row versions, but some rows may need `FREEZE`
- `vacuum_freeze_table_age` controls when an entire table must be scanned

Autovacuum
- Automates execution of `VACUUM`, `FREEZE`, and `ANALYZE` commands
- consists of a launcher and many worker processes
- A maximum of `autovacuum_max_workers` worker processes are allowed
- The launcher will start one worker within each database every `autovacuum_naptime` seconds
- Workers check for `INSERT`, `UPDATE`, and `DELETE`, then execute `VACUUM`, `FREEZE`, and `ANALYZE` as needed
- `track_counts` must be set to `true`, as autovacuum depends on statistics
- Temporary tables cannot be accessed by autovacuum
- Actual vacuum threshold = `autovacuum_vacuum_threshold` + (`autovacuum_vacuum_scale_factor` * number of tuples); ditto for analyze threshold 
- Autovacuum workers are resource-intensive, so it's often wise to configure the following parameters with `ALTER TABLE`, depending on table size:
    - `autovacuum_enabled`
    - `autovacuum_freeze_max_age`
    - `autovacuum_vacuum_cost_delay`
    - `autovacuum_vacuum_cost_limit`
    - `autovacuum_vacuum_threshold`
    - `autovacuum_analyze_threshold`
    - `autovacuum_vacuum_scale_factor`
    - `autovacuum_analyze_scale_factor`

Maintenance command `vacuumdb` can be run from CLI
- `-a` vacuums all db's
- `-d ${dbname}` specifies which db to vacuum
- `-t ${table_name}` specifies which table to vacuum
- `-f` does a full vacuum (per `FULL`)
- `-F` freezes row-transaction information (per `FREEZE`)
- `-q` and `-v` do what you'd expect
- `-z` updates optimizer statistics (per `ANALYZE`); `-Z` runs _only_ `ANALYZE`

Routine reindexing
- Indexes are used for faster data access
- `UPDATE` and `DELETE` modify underlying index entries
- Indexes are stored on the data pages, and thus become fragmented over time
- `REINDEX` rebuilds the index using the data stored in the indexes table
- There are several occasions to use `REINDEX`:
    - An index has become "bloated," in that it contains many empty or nearly-empty pages
    - You've altered an index's storage parameter (e.g. `fillfactor`)
    - An index built with the `CONCURRENTLY` option failed, leaving an "invalid" index

Cluster
- Sorts data physically, according to the specified index.
- `CLUSTER` lowers disk accesses/speeds up queries when accessing a range of indexed values
- When some data is accessed frequently, and can be grouped using an index, `CLUSTER` is helpful
- One-time operations and changes are not clustered
- An `ACCESS EXCLUSIVE` lock is acquired
- Setting `maintenance_work_mem` to large values is recommended before running `CLUSTER`
- Run `ANALYZE` afterwards

Lab Exercise - 1
- Looking at the statistics, you found that some tables are not automatically maintained by `autovacuum`.
- Write a SQL script to perform the following maintenance:
    - Reclaim obsolete row space from the `customers` table.
      - `VACUUM FULL VERBOSE customers;`
    - Update statistics for `emp` and `dept` tables.
      - `ANALYZE VERBOSE emp, dept;`
    - Mark all obsolete rows in the `orders` table for reuse.
      - `VACUUM VERBOSE orders;`
- Execute the newly created maintenance script on the `edbstore` database.

Lab Exercise - 2
- The composite index named `ix_orderlines_orderid` on the (`orderid`, `orderlineid`) columns of the `orderlines` table is performing very slowly.
- Write a statement to reindex this index for better performance
  - `REINDEX (VERBOSE) INDEX ix_orderlines_orderid;`

## Module 14. Data Dictionary

System catalog schema
- stores information about tables and other db objects
- created and maintained automatically in `pg_catalog` schema
- `pg_catalog` is effectively always part of the `search_path`
- Contains: 
    - system tables like `pg_class`
    - system functions like `pg_database_size()`
    - system views like `pg_stat_activity`

System information tables
- `\dS` will give you the list of `pg_*` tables and views
- this list is from `pg_catalog` schema
- Examples:
    - `pg_tables` is list of tables
    - `pg_constraint` is list of constraints
    - `pg_indexes` is list of indexes
    - `pg_trigger` is list of triggers
    - `pg_views` is list of views
    - `pg_settings` provides access to the run-time parameters of the server
    - `pg_file_settings` provide a summary of the contents of the server configuration file
    - `pg_file_settings` provide a summary of the contents of the server configuration file
    - `pg_policy` stores row-level security for tables, while `pg_policies` provides useful information about each such policy

System information functions
- accessed with `select ...` or `select * from ...`
- common examples include
    - `current_database()`, `current_schema()`
    - `inet_client_addr()`, `inet_client_port()`
    - `inet_server_addr()`, `inet_server_port()`
    - `pg_postmaster_start_time()`, `version()`, 
    - `current_user` - the user identified for permission checking: must be called without `()`
    - `session_user` - also called without `()`; refers to user who started the session (note superusers can change both of these with `SET SESSION AUTHORIZATION`)
    - `current_schemas(required_boolean)` - returns array of schemas in the `search_path`, optionally including implicit schemas

System administration functions
- accessed with `select ...` or `select * from ...`
- many require argument when calling; confirm before use
- common examples include
    - `current_setting`, `set_config` - return or modify config vars
    - `pg_cancel_backend` - cancel a backend's current query
    - `pg_terminate_backend` - terminate backend process
    - `pg_reload_conf` - reload configuration files
    - `pg_rotate_logfile` - rotate the server's log file
    - `pg_start_backup`, `pg_stop_backup` - used with PITR
- Examples of size-query functions: 
    - `select pg_database_size('badges_test');`
    - `select pg_tablespace_size('pg_default');`
    - `select pg_relation_size('badge_templates');`
    - `select pg_total_relation_size('badge_templates');` (this includes indexes and TOASTed data)
    - `select pg_column_size('badge_templates.name');`
    - You can wrap any of the above in `pg_size_pretty` to get the result in human-readable bytes, e.g. `select * from pg_size_pretty(pg_tablespace_size('pg_default'));`
- Examples of file-operation functions:
    - `select pg_ls_dir('./pg_wal');` will return the contents of the `pg_wal` dir, assuming it exists in psql's current working directory.
    - `select pg_read_file('./PG_VERSION');` will return the contents of a text file (alt is `pg_read_binary_file`)
    - `select pg_stat_file('./PG_VERSION');` will return information about a file (size, last accessed timestamp, last modified timestamp, last file-status-change timestamp, boolean whether it's a dir)

System Information views
- preceded by `select * from ...`
- common examples: 
    - `pg_stat_activity` details open connections and running transactions
    - `pg_locks` lists current locks being held
    - `pg_stat_database` lists databases
    - `pg_stat_user_tables`, `pg_stat_user_indexes`, `pg_stat_user_functions`
        - detail... tables, indexes, and functions
        - can sub `user` with `sys` for system-level, and `all` for both combined
    
PPAS Oracle-Like Dictionaries
- `sys` schema contains Oracle-compatible catalog views
- `user_*` displays what is in your schema/what you own;
- `all_*` displays the expanded user view (what you can access);
- `dba_*` displays what's in everyone's schemas;
- `edb$` displays performance-related data

Lab Exercise - 1
- You are working with different schemas in a database.
- After a while, you need to determine all the schemas in your search path.
- Write a query to find this list of schemas currently in your search path.
  - `SELECT current_schemas(true);`

Lab Exercise - 2
- You need to determine the names and definitions of all the views in your schema.
- Create a report that retrieves view information: the view name and definition text.
  - `copy (select viewname, definition from pg_views) to '/Users/ypaulsussman/Desktop/all_views.txt';`
  - OR: `select viewname, definition from pg_views;` then `\g all_views.txt`

Lab Exercise - 3
- Create a report of all users who are currently connected.
- The report must display total session time of all connected users.
  - `SELECT usename, (now() - backend_start) AS session_time FROM pg_stat_activity WHERE backend_type = 'client backend';`
- You found that a user has connected to the server for very long time, and have decided to gracefully kill its connection.
- Write a statement to perform this task.
  - `select pg_terminate_backend(${pid_int});`

Lab Exercise - 4
- Write a query to display the name and size of all the databases in your cluster.
- Size must be displayed using a meaningful unit.
  - `SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) as size FROM pg_database ORDER BY size;`

## Module 15. Moving Data

Loading flat files
- A "flat file" is a plaintext or mixed-text file, which usually contains one record per line.
- PG offers the `COPY` command to load flat files into a db table.
- EDB offers two options to load flat files into a db table: the `COPY` command, and EDB*Loader

The `COPY` command 
- It moves data between PG tables and standard filesystem files
- `COPY TO` copies the contents of the table or query to a file.
- `COPY FROM` copies data from a file to a table. 
- In either scenario, the file must be accessible to the PostgreSQL user (the user ID the server runs as.)
- `COPY FREEZE` is a new option in the copy statement: `COPY tablename FROM filename FREEZE`
    - It adds rows to a newly-created table, then freezes them.
    - The table must have created or truncated in the current subtransaction.
    - It improves performance of the initial bulk load.
    - It does violate the normal rules of MVCC, in that other sessions will immediately be able to see the data once it's loaded.

EDB*Loader 
- high-performance bulk data loader
- supports Oracle's data-loading methods (conventional, direct, parallel)
    - Conventional-path loading 
        - uses basic `INSERT` processing to add rows to the table
        - constraints, indexes, and triggers are enforced
    - Direct-path loading 
        - faster than conventional path loading, but is not recoverable
        - requires removal of constraints and triggers from the table
    - Parallel direct-path loading provides even greater performance

Lab Exercise - 1
- Unload the `emp` table from the `edbstore` schema to a CSV file with column headers.
  - as `postgres` user: `GRANT pg_write_server_files TO edbuser;`
  - `COPY emp TO '/Users/postgres/Desktop/emp_file.csv' WITH HEADER CSV;`
- Create a `copyemp` table with the same structure as the `emp` table.
  - `CREATE TABLE copyemp (LIKE emp INCLUDING ALL);`
- Load the CSV file from step 01 into the `copyemp` table.
  - as `postgres` user: `GRANT pg_read_server_files TO edbuser;`
  - `COPY copyemp FROM '/Users/postgres/Desktop/emp_file.csv' WITH HEADER CSV;`
