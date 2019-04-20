---
title: Crash Course Computer Science
date: "2017-10-01"
template: "post"
draft: true
slug: "/posts/crash-course-comp-sci-notes/"
category: "What I Read"
tags:
  - "PBS"
  - "Computer Science"
description: "Notes from a YouTube program I watched one winter. (Tagline: \"In this series, we're going to trace the origins of our modern computers, take a closer look at the ideas that gave us our current hardware and software, discuss how and why our smart devices just keep getting smarter, and even look towards the future!\")"
---

On state === electricity is flowing === Boolean “true.”

**Binary** was chosen over other systems because it has fewer intermediate states: thus fewer chances for signal confusion. (Also, the Boolean algebra branch of mathematics already existed.)

Binary = machine code.

Transistors are used to build **logic gates**; those logic gates evaluate the Boolean algebra.

Each 0 or 1 is called a **bit**. 

8-bit computing: two to the eighth power is 256, or 256 different values, to compose one **byte**.
* 32-bit and 64-bit computers operate in chunks of that many bits.
* Most computing uses the first bit for the valence (1 for negative, and 0 for positive.)

**Floating point numbers** are ones where the decimal point can float around its position within the number. It uses scientific notation to do so (with a significand and an exponent.)

**ASCII** is a seven-bit code, thus able to store 128 values. As an early standard, it became widely used--allowing different companies' computers to exchange data.

After decades of non-interoperable national standards, **Unicode** was created in 1992. It uses 16 bits, thus allowing for over 1 million codes.

---

An **arithmetic logic unit** (ALU) has two parts: one for arithmetic, and one for logic. 
* The arithmetic unit usually has circuits for eight operations (and, add with carry, subtract, subtract with borrow, increment, decrement, negate, and pass-through.) 
   * Processors for devices like thermostats and microwaves will leave it there; 
   * more complicated devices, like smartphones and laptops, will have other functions built in (via more complex arrangements of logic gates) for features like multiplication and division.
* The logic unit performs operations like AND, OR, NOT, as well as e.g. checking is the number is zero, or negative.
* As well as two inputs, almost all ALU's also take in an operation code in binary, specifying what action to perform. In addition to the output, they also produce a series of one-bit flags specifying e.g. "negative," "zero," or "overflow."

An **overflow** occurs when the result of an addition is too large to be represented by the number of bits you are using.

The basis of memory in a computer is the **"and-or latch"** -- a combination of those two logic gates with a "not" gate to serve as a resetter. 
* Adding 
  1. several more logic gates to specify a single "data input" (rather than both a "set" and "reset" input), then adding 
  2. an input that specifies whether this latch is available for writing or locked, creates what is called a **gated latch**.
* A group of latches operating together to hold a single number is called a **register**; the number of bits (latches) in a register is called its width. 
* Rather than long rows of latches, memory is architected in **latch matrices**. (This allows for significant saving on the number of wires connecting latches.) 
   * A given latch is then specified by its **memory address**: usually a row address and a column address, each of four bits.
   * Because we can access any memory location from the above matrix (or bundle of identical matrices), at any time, in any sequence, this type of memory is called **random-access memory** (RAM.)
* SRAM, DRAM, NVRAM, and flash memory all have a similar architecture of massively nested matrices, but use different circuits to store individual bits.

A **CPU** consists of a control unit, its own internal memory registers, the ALU, and a clock.
* The CPU is powerful because it is programmable: it is controlled by easy-to-modify software.
* Inside a CPU, a clock triggers an electrical signal at a precise regular interval. The control unit uses this signal to advance the **"fetch-decode-execute" cycle**. 
   * The clock speed is measured in hertz; 1hz = one cycle per second. Most modern smart phones/laptops run CPUs of 1Ghz or more. 
   * Most modern computers can increase/decrease their clock speed on demand; this is called **dynamic frequency scaling**.
* **Instructions to the CPU** generally consist of two strings of bits: 
   * one designating which operation to perform (the opcode), and 
   * another designating which address inside the RAM to reference for that operation. 
* Together this forms the instruction length (32 or 64 in most modern computers.)
   * Modern CPU's also use variable length instructions: if the CPU recognizes that an instruction needs no extra values, it will perform it immediately. 
   * If the CPU recognizes that an instruction needs extra values (like a memory address), it will search directly behind the instruction in memory. (These extra values are called immediate values, because of their location immediately after the opcode.)

**RAM** is a memory module outside the CPU; as such, data must be transferred between the two along a set of wires (called a bus.) 
* This transfer takes time: so as much as possible the CPU...
   * draws several pieces of data from the RAM at once, 
   * places it in a **cache** (a small bit of RAM inside the CPU), 
   * then interacts with that data internally (this is called a **cache hit**; if the CPU needs to go grab another block of data from the RAM, it's called a **cache miss**.)

To prevent updated values in the cache from disappearing (after they diverge from their equivalent value in the RAM), the cache has a special flag for each block of memory, called the **"dirty bit."** Before calling new data from RAM, the CPU checks the dirty bit; if it is dirty, the CPU writes that data (from the cache back to the RAM) before loading the new block of data.

Another method of speeding up the CPU is to **parallelize** the "fetch-decode-execute" cycle, such that each of the three processes may be acting on a different instruction (in sequence) at the same time. These "pipelined" processors must also look ahead for data dependencies, and 
1. stall the parallel cycles if any exist, or 
2. in the case of more advanced processors, reorder instructions with dependencies to perform "out of order execution."

Advanced processors also deal with conditional instructions (e.g. "jump if returned value is negative") by guessing what the likely value will be (**branch prediction**), and proceeding to fill the pipeline based on that guess. This is called **speculative execution**. (If the guess is wrong, the CPU must perform a **pipeline flush**.)

**Superscalar CPU's** add to duplicate circuitry for popular instructions, such that they can execute more than one instruction simultaneously.

**Multi-core processors** are similar to having multiple CPUs in one, but because they're tightly integrated they can share resources like the cache.

---

**Von Neumann architecture** is the unification the memory that will hold both the program to run, and the data that will be needed/generated.

**Assembly languages** have a direct, 1-1 mapping to machine language; a single line of a high-level programming language might result in dozens of instructions in machine code. Assembly and machine code are still specific to each individual CPU/manufacturer.

A **compiler** converts a programming language to assembly; an **assembler** converts assembly language to machine language.

Most **algorithms** pertain to **sorting**, because it is such a common/demanding task.
* The relationship of [input size] to [number of steps needed to run] characterizes an algorithm's complexity (written in **"big-O notation."**)
* _Selection sort_ starts at the first value, 
   * finds the smallest value in the array, and 
   * swaps the first value with the smallest value; 
   * it then repeats for the second value, third value, etc. 
   * Because that's effectively a nested for-loop, it's O=n^2.
* _Merge sort_ splits the array down into... 
   * X arrays, each of one index, where X equals the original array's length. 
   * It then combines 2 arrays into one (sorted) array (for each set of arrays), 
   * repeating this to "recompose" in the array in order. 
   * This is O = n log n.
* _Dijkstra's algorithm_ is a graph-search algorithm (finding the fastest way to traverse a series of notes and lines.)

Bundled groups of variables are called a **record** (or struct). One example is a **node**: this contains both a **variable** and a **pointer**. The variable can be anything; the pointer points to a place in memory. (By directing the pointer to point at the next node, you can create a linked list.)

Whereas **arrays** require a fixed length, a **linked list** can expand or contract its length. Because of this flexibility, **queues** (first-in, first-out) and **stacks** (last-in, first-out) are both built on top of linked lists.

If a record includes two (or more) pointers (e.g. not "next," but "next left" and next right"), it can be used to compose **trees**. A main property of trees is that they are unidirectional in their linking; if any node can link to any node, it is a **graph**.

---

Discrete **transistors** replaced vacuum tubes in the mid to late 1950s.  **Integrated (silicon) circuits** replaced discrete transistors in the 1960s.  Even integrated circuits needed to be wired together, though, so printed **circuit boards** were developed (replacing the actual wires.)
* **Photolithography** (the use of light to transfer complex patterns to a material) is used to etch the wires/resistors/capacitors onto the silicon wafer.
* Very-large-scale integration software has been used to automatically generate chip designs  for smaller/faster than human capability since the 1970s.

**Moore's Law** may be winding down because 
* we are reaching the limit of how fine the photolithography masks can convey detail (based on the wavelengths of light used!), and 
* transistors are becoming small enough that electrons can jump the gap between them via quantum tunneling (making those transistors ineffective switches.)

---

An **operating system** is a program with special hardware privileges allowing it to run and manage other programs.
* Operating systems were first built in the 1950s to **batch-run programs**, to replace the tedious process of manual loading.
* Operating systems were then implemented as [intermediaries between software programs and hardware peripherals] by providing **device drivers** (to standardize how programmers wrote code for different hardware to interpret identically.)
* Next, operating systems were used to enable the running of many programs simultaneously on the same CPU (multitasking.)
* Operating systems then were used to **virtualize memory locations**. 
   * Virtual memory allows an individual program to assume that its memory always starts at "address zero," even though it might actually be allocated across disparate blocks within the actual physical computer's memory.
   * Virtualized memory also allows for protected memory: ensuring that when a single program runs amok, the OS and remaining programs are unaffected.
* The **kernel** deals with the core functionality: memory management, multitasking, and dealing with I/O.
* The **file system** is the part of an OS that manages and keeps track of stored files.

---

A **sound file** contains metadata regarding audio format, number of channels, sample rate, etc; after that, it contains thousands of samples of amplitude per second, each represented as a number.

An **image file** also contains metadata, regarding e.g. image width, color depth, number of image planes, etc. Following that are sequences of 0-255 in groups of three: one each for red, green, and blue.

All these files are the same: long, long lists of numbers stored in binary. The format is the key to making any sense of them.

Run-length encoding eliminates redundant data by adding a bite that says "hey do the same thing as whatever the next byte is for X times."

---

A **Huffman tree** creates a binary-represented tree based on the frequency of different values; this allows for very, very compact representations (referenced against the tree as a dictionary.)

---

The most famous and successful network technology is **ethernet**: 
* data is written onto a shared cable that connects to all computers; 
* each computer has a unique **media access control (MAC) address** which tells them 
* whether or not to pay attention to the data, based on 
* whether that data’s header includes their MAC address.

This approach is often called “carrier sense multiple access“; many computers simultaneously sense the carrier (e.g. copper wire, or radio waves.)

One downside: **collision** (two computers attempting to write data simultaneously.)
* To resolve, each computer waits a randomly-set amount of time after a collision before attempting to retransmit. 
* If the retransmission and counters a collision again, and then it will wait a (random amount of time + 2 seconds), then four seconds, then eight seconds, and so on (this is called **exponential backoff**.)

To reduce the chance of collision further, networks minimize the number of devices on a particular **“collision domain”** by breaking the network into smaller domains, then segregating them via network switches. A **network switch** sits between the domains, keeping a list of the MAC address is on each side, and only passing data between the sides if necessary.

Because there will be multiple paths to transmit data from one location to another, **routing** becomes important. The number of routers a message passes through on its way to its end point is called its **“hop count.“** This count is stored with a message, and used to detect routing inefficiencies.

To prevent large data transmissions from blocking a route, we chop them into smaller **packets**. Each packet contains the destination address, formatted by the Internet Protocol (IP) standard (its **IP address**.)

The **User Datagram Protocol (UDP)** adds a header which sits inside the data payload (i.e. after the IP header.) It includes the **port number**, which dictates which application to send the data to upon arrival at the IP address. UDP also includes a **checksum** of the data, which is used to verify that the data didn’t get corrupted in transit. UDP is very fast, so is it often used alone for video streaming, or multiplayer games.

The **TCP/IP** protocol also contains a port and checksum. In addition, it features **sequential packet numbers**,  used to re-organize packets that arrive at the destination out of order. It also includes requirement that a computer sends an acknowledgment upon correctly receiving a packet. TCP then monitors the sending of these acknowledgments to tweak how aggressively/rapidly it sends packets.

The **domain name system (DNS)** maps domain names to the IP address. It uses a tree data structure (rather than a gigantic list), with top level domains at the top of the tree.

The **Open System Interconnection** model includes seven layers:
1. _Physical layer_: electrical signals on wires, radio signals on the air.
2. _Data link layer_: MAC address, collision detection, exponential backoff.
3. _Network layer_: switching and running technologies.
4. _Transport layer_: UDP, TCP.
5. _Session layer_: opening and closing the connection.
6. (The _presentation_ and _application_ layers are the final two.)

The **World Wide Web** runs on top of the Internet (as with e.g. Skype or Instagram.) At its most basic, the World Wide Web is a series of pages linking to other pages. The index for each of these pages is specified by a **uniform resource locator (URL.)** 
1. Your computer first asks a DNS server to map that URL to an IP address, then 
2. uses that IP address to open a TCP connection on port 80 with [the web server at that address]. 
3. Your computer then asks the web server for the page specified by that URL. It formats that request using the hypertext transfer protocol (HTTP.)

---

**Bayesian Knowledge Tracing** maintains four probabilities:
1. Probability that student has learned the skill;
2. Probability that student has NOT learned skill, but guessed the correct answer;
3. Probability that student has learned skill, but slipped up;
4. Probability that student HAD not learned skill, but learned it while working through the problem (transit);
BKT then uses those four probabilities to calculate a running assessment for each skill the student is supposed to know. (This is often used for **mastery learning**, via **adaptive sequencing**.)

**Justine Cassell**: pedagogical virtual agents